import { LitElement, css, html, nothing, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { controlBaseStyles, fontFamilyStyles } from '../shared/styles';
import {
  BOOKING_CANCELLED_EVENT,
  BOOKING_CREATED_EVENT,
  BOOKING_ERROR_EVENT,
  BOOKING_RESCHEDULED_EVENT,
  type BookingCancelledEventDetail,
  type BookingCreatedEventDetail,
  type BookingErrorEventDetail,
  type BookingErrorKind,
  type BookingRescheduledEventDetail
} from './BookingEvents';
import {
  BOOKING_FIELD_NAMES,
  BOOKING_LIMITS,
  DEFAULT_BOOKING_ERROR_MESSAGES,
  MAX_MONTH_LOOKAHEAD,
  type BookingErrorMessages,
  type BookingErrors,
  type BookingFailureKind,
  type BookingFieldLabels,
  type BookingFieldName,
  type BookingInfo,
  type BookingOutcome,
  type BookingService,
  type BookingSlot,
  type BookingValues,
  addDays,
  addMonths,
  appointmentPath,
  buildBookingPayload,
  buildManageUrl,
  callBookings,
  codePointLengthOf,
  dayKey,
  fillTemplate,
  firstInvalidBookingField,
  groupSlotsByDay,
  monthCells,
  monthWindow,
  parseDayKey,
  readBooking,
  readNothing,
  readReferenceParam,
  readServices,
  readSlots,
  staffIdToSend,
  startOfMonth,
  validateBooking
} from './booking-client';
import { DEFAULT_BOOKING_LABELS, type BookingLabels } from './booking-labels';

const CHECK_ICON = svg`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12l5 5L20 7" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;

type View = 'loading' | 'services' | 'time' | 'details' | 'booking' | 'cancelled' | 'notfound' | 'fatal';
type Mode = 'new' | 'reschedule';
type Banner = '' | 'booked' | 'rescheduled';

/** How far ahead (in months) the visitor may page the calendar. */
const MAX_MONTHS_AHEAD = 12;

/**
 * A booking experience for a website, in place of Microsoft's own Bookings page: pick a service, optionally
 * a staff member ("Any available" is the default), pick a day on a calendar and a time, enter name, email,
 * an optional phone and notes, accept the consent box, and get a confirmation with a private link to manage
 * the appointment. It talks to Suite Core's public bookings API under `endpoint`
 * (`{endpoint}/public/v1/bookings/...`, no cookies, no credentials).
 *
 * Times are shown in the visitor's own time zone (through `Intl`, never a fixed zone); the API's instants
 * are UTC. The calendar is a keyboard grid: arrow keys move by day and week, Home/End to the week's start
 * and end, Page Up/Page Down by month. Each step moves focus to its heading, results are announced politely
 * and problems with `role="alert"`.
 *
 * Opening an existing booking: set `reference`, or open the page with `#ref=...` (preferred: a hash is never
 * sent to a server or in a Referer header) or `?ref=...`. The booking shows with Reschedule and Cancel.
 * Reschedule picks a new slot among the availability of the same service. The reference is a signed token and
 * the only key to the booking: it is never put in an event, never logged, and the manage link puts it in the
 * hash. After booking, the link is shown (with a copy button) and a note asks the visitor to keep it private.
 *
 * A hidden honeypot field (`website`) must stay empty. A 409 `slot_taken` reloads the times and says so; a 429
 * shows the wait from `Retry-After`; the text the server sends is shown only for the fields it rejected.
 *
 * Every visible string is in `labels` (English defaults, only the keys given are replaced).
 *
 * @fires st-booking-created - Bubbles and is composed. Detail `{ serviceId: string, start: string }`. No personal data and no reference.
 * @fires st-booking-rescheduled - Bubbles and is composed. Detail `{ serviceId: string, start: string }` (the new start).
 * @fires st-booking-cancelled - Bubbles and is composed. Detail `{ serviceId: string }`.
 * @fires st-booking-error - Bubbles and is composed. Detail `{ kind: 'validation' | 'slot_taken' | 'too_late' | 'not_found' | 'rate_limited' | 'unavailable' }`.
 * @csspart steps - The step indicator.
 * @csspart heading - The heading of the current step.
 * @csspart service - Each service choice.
 * @csspart calendar - The month grid.
 * @csspart day - Each day button.
 * @csspart slot - Each time button.
 * @csspart field - Each field's wrapper (label, control and error).
 * @csspart label - Each field's label.
 * @csspart input - Each text input and the notes textarea.
 * @csspart error - Each field's error message.
 * @csspart button - Every button except the primary one.
 * @csspart primary - The primary button of a step.
 * @csspart success - The success note.
 * @csspart alert - The alert (rate limit, taken slot, unavailable, or a server message that is not on one field).
 * @csspart summary - The service, date and time of a booking.
 */
@customElement('st-booking')
export class Booking extends LitElement {
  static styles = css`
    ${controlBaseStyles}

    :host {
      display: block;
      box-sizing: border-box;
      ${fontFamilyStyles}
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    .root {
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-width: 0;
      color: var(--st-color-text);
    }

    /* Text uses the theme's own colour tokens (they swap in dark themes), as st-contact-form does. */
    h2 {
      margin: 0;
      font-size: 22px;
      line-height: 1.3;
      color: var(--st-color-text-strong);
    }

    h2:focus-visible {
      outline: 2px solid var(--st-cms-brand-azure);
      outline-offset: 4px;
    }

    h3 {
      margin: 0;
      font-size: 16px;
      color: var(--st-color-text-strong);
    }

    p {
      margin: 0;
    }

    .steps {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 0;
      padding: 0;
      list-style: none;
      font-size: 13px;
    }

    .steps li {
      padding: 4px 12px;
      border-radius: 9999px;
      background: var(--st-color-subtle, var(--st-cms-surface-soft));
      color: var(--st-color-text);
    }

    .steps li[aria-current='step'] {
      background: var(--st-cms-brand-navy);
      color: var(--st-cms-on-dark);
      font-weight: var(--st-font-weight-semibold);
    }

    .options {
      display: grid;
      gap: 12px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .service {
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 100%;
      min-height: 44px;
      padding: 16px 18px;
      border: 1px solid var(--st-color-border, var(--st-cms-primary-200));
      border-radius: 16px;
      background: var(--st-color-surface);
      color: var(--st-color-text);
      font: inherit;
      text-align: left;
      cursor: pointer;
    }

    .service:hover {
      border-color: var(--st-cms-brand-navy);
    }

    .service-name {
      font-size: 17px;
      font-weight: var(--st-font-weight-semibold);
      color: var(--st-color-text-strong);
    }

    .meta {
      font-size: 14px;
      color: var(--st-color-text-muted);
    }

    fieldset {
      min-width: 0;
      margin: 0;
      padding: 0;
      border: 0;
    }

    legend {
      padding: 0;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: var(--st-font-weight-semibold);
      color: var(--st-color-text-strong);
    }

    .choice {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-height: 44px;
      margin-right: 16px;
      font-size: 15px;
      cursor: pointer;
    }

    .choice input {
      width: 20px;
      height: 20px;
      margin: 0;
      accent-color: var(--st-cms-brand-navy);
    }

    .time-layout {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 20px;
    }

    @media (min-width: 720px) {
      .time-layout {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      }
    }

    .month-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 8px;
    }

    .month-name {
      font-size: 16px;
      font-weight: var(--st-font-weight-semibold);
      color: var(--st-color-text-strong);
    }

    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 4px;
      table-layout: fixed;
    }

    th {
      padding: 4px 0;
      font-size: 12px;
      font-weight: var(--st-font-weight-semibold);
      color: var(--st-color-text-muted);
    }

    td {
      padding: 0;
      text-align: center;
    }

    .day {
      width: 100%;
      min-height: 44px;
      padding: 0;
      border: 1px solid transparent;
      border-radius: 12px;
      background: transparent;
      color: var(--st-color-text-muted);
      font: inherit;
      font-size: 15px;
      cursor: default;
    }

    .day.has-slots {
      border-color: var(--st-color-border, var(--st-cms-primary-200));
      background: var(--st-color-surface);
      color: var(--st-color-text-strong);
      font-weight: var(--st-font-weight-semibold);
      cursor: pointer;
    }

    .day.has-slots:hover {
      border-color: var(--st-cms-brand-navy);
    }

    .day[aria-pressed='true'] {
      background: var(--st-cms-brand-navy);
      border-color: var(--st-cms-brand-navy);
      color: var(--st-cms-on-dark);
    }

    .slots {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(104px, 1fr));
      gap: 8px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .slot {
      width: 100%;
      min-height: 44px;
      padding: 0 8px;
      border: 1px solid var(--st-color-border, var(--st-cms-primary-200));
      border-radius: 12px;
      background: var(--st-color-surface);
      color: var(--st-color-text-strong);
      font: inherit;
      font-size: 15px;
      cursor: pointer;
    }

    .slot:hover {
      border-color: var(--st-cms-brand-navy);
    }

    .slot[aria-pressed='true'] {
      background: var(--st-cms-brand-navy);
      border-color: var(--st-cms-brand-navy);
      color: var(--st-cms-on-dark);
    }

    .day:focus-visible,
    .slot:focus-visible,
    .service:focus-visible,
    .btn:focus-visible,
    .input:focus-visible,
    .choice input:focus-visible,
    .consent input:focus-visible {
      outline: 2px solid var(--st-cms-brand-azure);
      outline-offset: 2px;
    }

    .note {
      font-size: 14px;
      color: var(--st-color-text-muted);
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
    }

    .label {
      font-size: 14px;
      font-weight: var(--st-font-weight-semibold);
      color: var(--st-color-text-strong);
    }

    .input {
      width: 100%;
      min-height: 44px;
      padding: 10px 14px;
      border: 1px solid var(--st-color-border, var(--st-cms-primary-200));
      border-radius: 12px;
      background: var(--st-color-surface);
      color: var(--st-color-text-strong);
      /* 16px stops iOS zooming into the field. */
      font: inherit;
      font-size: 16px;
    }

    .input::placeholder {
      color: var(--st-color-text-muted);
      opacity: 1;
    }

    textarea.input {
      min-height: 104px;
      resize: vertical;
    }

    .input[aria-invalid='true'] {
      border-color: var(--st-color-danger);
      box-shadow: inset 0 0 0 1px var(--st-color-danger);
    }

    .error {
      font-size: 13px;
      line-height: 1.4;
      color: var(--st-color-danger-text);
    }

    .counter {
      align-self: flex-end;
      font-size: 12px;
      color: var(--st-color-text-muted);
    }

    .counter.over {
      color: var(--st-color-danger-text);
      font-weight: var(--st-font-weight-semibold);
    }

    .consent {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      min-height: 44px;
      font-size: 14px;
      line-height: 1.5;
      cursor: pointer;
    }

    .consent input {
      flex: none;
      width: 20px;
      height: 20px;
      margin: 2px 0 0;
      accent-color: var(--st-cms-brand-navy);
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0 0 0 0);
      white-space: nowrap;
      border: 0;
    }

    /* Off-screen, not display:none: the browser still fills it in, a person and a screen reader do not see it. */
    .hp {
      position: absolute;
      left: -10000px;
      top: auto;
      width: 1px;
      height: 1px;
      overflow: hidden;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 48px;
      padding: 0 24px;
      border: 1px solid var(--st-cms-brand-navy);
      border-radius: 9999px;
      background: transparent;
      color: var(--st-color-text-strong);
      font: inherit;
      font-size: 16px;
      font-weight: var(--st-font-weight-semibold);
      cursor: pointer;
      transition: opacity 150ms ease;
    }

    .btn.primary {
      background: var(--st-cms-brand-navy);
      color: var(--st-cms-on-dark);
    }

    .btn.danger {
      border-color: var(--st-color-danger);
      color: var(--st-color-danger-text);
    }

    .btn:hover:not(:disabled) {
      opacity: 0.92;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: progress;
    }

    .icon-btn {
      min-width: 44px;
      padding: 0;
    }

    @media (prefers-reduced-motion: reduce) {
      .btn {
        transition: none;
      }
    }

    .alert {
      margin: 0;
    }

    .alert.has-text {
      padding: 12px 14px;
      border-radius: 12px;
      background: var(--st-color-danger-subtle);
      color: var(--st-color-danger-text);
      font-size: 14px;
      line-height: 1.5;
    }

    .success {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 16px 18px;
      border-radius: 16px;
      background: var(--st-color-subtle, var(--st-cms-surface-soft));
      color: var(--st-color-text-strong);
      font-size: 15px;
      line-height: 1.6;
    }

    .success-icon {
      flex: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 9999px;
      background: var(--st-cms-highlight);
      color: var(--st-cms-navy);
    }

    .success-icon svg {
      width: 18px;
      height: 18px;
    }

    dl.summary {
      display: grid;
      grid-template-columns: max-content minmax(0, 1fr);
      gap: 8px 16px;
      margin: 0;
      padding: 16px 18px;
      border: 1px solid var(--st-color-border, var(--st-cms-primary-200));
      border-radius: 16px;
      background: var(--st-color-surface);
    }

    dl.summary dt {
      font-weight: var(--st-font-weight-semibold);
      color: var(--st-color-text-strong);
    }

    dl.summary dd {
      margin: 0;
      overflow-wrap: anywhere;
    }

    .link-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .link-row .input {
      flex: 1 1 220px;
      width: auto;
    }

    .loading {
      padding: 24px 0;
      color: var(--st-color-text-muted);
    }
  `;

  /** Base URL of the Suite Core API, without a path (`https://api.apps.example.com`). The component calls `{endpoint}/public/v1/bookings/...`. Empty: the component shows the unavailable note without sending anything. */
  @property({ type: String })
  endpoint = '';

  /** A booking reference to open (the signed token from a manage link). Empty: the page's `#ref=` or `?ref=` is used, else a new booking starts. Treat it as a secret. */
  @property({ type: String })
  reference = '';

  /** Preselects a service by id and skips the service step, when the API lists it. */
  @property({ type: String, attribute: 'service-id' })
  serviceId = '';

  /** The first day of the calendar's week: `1` (Monday, the default) or `0` (Sunday). */
  @property({ type: Number, attribute: 'week-start' })
  weekStart: 0 | 1 = 1;

  /** Language for dates and times (a BCP 47 tag). Empty uses the page's `lang`, or the browser's. */
  @property({ type: String })
  locale = '';

  /** The address the manage link points at. Empty uses the current page. The reference goes in its hash. */
  @property({ type: String, attribute: 'manage-url' })
  manageUrl = '';

  /** Replaces the English texts. Only the keys given are replaced. See `BookingLabels`. */
  @property({ attribute: false })
  labels: Partial<BookingLabels> = {};

  /** Replaces the English validation messages (`required`, `tooLong`, ...). Only the keys given are replaced. */
  @property({ attribute: false })
  errorMessages: Partial<BookingErrorMessages> = {};

  @state() private view: View = 'loading';
  @state() private mode: Mode = 'new';
  @state() private services: BookingService[] = [];
  @state() private service?: BookingService;
  @state() private staffId = '';
  @state() private month: Date = startOfMonth(new Date());
  @state() private slots: BookingSlot[] = [];
  @state() private slotsLoading = false;
  @state() private selectedDay = '';
  @state() private focusDay = '';
  @state() private selectedSlot?: BookingSlot;
  @state() private booking?: BookingInfo;
  @state() private banner: Banner = '';
  @state() private confirmingCancel = false;
  @state() private busy = false;
  @state() private errors: BookingErrors = {};
  @state() private alertText = '';
  @state() private notice = '';
  @state() private notesLength = 0;

  /** The reference in use: the property, the page URL, or the one the API just gave. Never rendered or sent anywhere but the API. */
  private activeReference = '';
  private inflight: AbortController | null = null;
  private slotsRun = 0;
  /** What the details form held when the visitor went back to change the time, so nothing typed is lost. */
  private draft: Partial<Record<'name' | 'email' | 'phone' | 'notes', string>> & { consent?: boolean } = {};

  disconnectedCallback(): void {
    this.inflight?.abort();
    this.inflight = null;
    this.slotsRun += 1;
    super.disconnectedCallback();
  }

  protected updated(changed: Map<PropertyKey, unknown>): void {
    if (changed.has('endpoint') || changed.has('reference') || changed.has('serviceId')) void this.start();
  }

  /* ------------------------------------------------------------ text and formatting */

  private text(key: keyof BookingLabels, values: Record<string, string | number> = {}): string {
    const label = this.labels[key];
    return fillTemplate(typeof label === 'string' ? label : DEFAULT_BOOKING_LABELS[key], values);
  }

  private messages(): BookingErrorMessages {
    const merged = { ...DEFAULT_BOOKING_ERROR_MESSAGES };
    for (const key of Object.keys(merged) as (keyof BookingErrorMessages)[]) {
      const override = this.errorMessages[key];
      if (typeof override === 'string') merged[key] = override;
    }
    return merged;
  }

  private fieldLabels(): BookingFieldLabels {
    return { name: this.text('nameLabel'), email: this.text('emailLabel'), phone: this.text('phoneLabel'), notes: this.text('notesLabel') };
  }

  private format(options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat {
    const tag = this.locale || document.documentElement.lang || undefined;
    try {
      return new Intl.DateTimeFormat(tag, options);
    } catch {
      return new Intl.DateTimeFormat(undefined, options);
    }
  }

  private fullDate(date: Date): string {
    return this.format({ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(date);
  }

  private timeOfDay(iso: string): string {
    return this.format({ hour: 'numeric', minute: '2-digit' }).format(new Date(iso));
  }

  private whenText(iso: string): string {
    return this.format({ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }).format(new Date(iso));
  }

  private monthName(month: Date): string {
    return this.format({ month: 'long', year: 'numeric' }).format(month);
  }

  private zoneName(): string {
    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  /* ------------------------------------------------------------ flow */

  private resetState(): void {
    this.service = undefined;
    this.staffId = '';
    this.slots = [];
    this.selectedDay = '';
    this.focusDay = '';
    this.selectedSlot = undefined;
    this.booking = undefined;
    this.banner = '';
    this.confirmingCancel = false;
    this.busy = false;
    this.errors = {};
    this.alertText = '';
    this.notice = '';
    this.notesLength = 0;
    this.draft = {};
    this.mode = 'new';
  }

  /** Opens an existing booking when there is a reference, else starts at the services. */
  private async start(): Promise<void> {
    this.inflight?.abort();
    this.slotsRun += 1;
    const controller = new AbortController();
    this.inflight = controller;
    this.resetState();
    this.view = 'loading';
    this.activeReference = this.reference.trim() || readReferenceParam(window.location.search, window.location.hash) || '';
    if (this.activeReference !== '') await this.loadBooking(controller);
    else await this.loadServices(controller);
  }

  private async loadServices(controller: AbortController): Promise<void> {
    const outcome = await callBookings({ base: this.endpoint, method: 'GET', path: '/services', readOk: readServices, signal: controller.signal });
    if (this.inflight !== controller) return;
    if (outcome.kind !== 'ok') {
      this.fail(outcome.kind, outcome, 'fatal');
      return;
    }
    this.services = outcome.data;
    const preset = outcome.data.find(item => item.id === this.serviceId.trim());
    if (preset) {
      await this.chooseService(preset);
      return;
    }
    this.go('services');
  }

  private async loadBooking(controller: AbortController): Promise<void> {
    const outcome = await callBookings({
      base: this.endpoint,
      method: 'GET',
      path: appointmentPath(this.activeReference),
      readOk: readBooking,
      signal: controller.signal
    });
    if (this.inflight !== controller) return;
    if (outcome.kind !== 'ok') {
      this.fail(outcome.kind, outcome, outcome.kind === 'not_found' ? 'notfound' : 'fatal');
      return;
    }
    this.booking = outcome.data;
    this.go('booking');
  }

  /** Switches the step, clears the last problem and moves focus to the new step's heading. */
  private go(view: View): void {
    this.view = view;
    this.alertText = '';
    void this.updateComplete.then(() => this.renderRoot.querySelector<HTMLElement>('#bk-heading')?.focus());
  }

  /** Shows the note for a failed call and reports it. `next` is the step to show (when it should change). */
  private fail(kind: BookingFailureKind, outcome: BookingOutcome<unknown>, next?: View): void {
    this.busy = false;
    if (next) {
      this.view = next;
      void this.updateComplete.then(() => this.renderRoot.querySelector<HTMLElement>('#bk-heading')?.focus());
    }
    switch (kind) {
      case 'slot_taken':
        this.alertText = this.text('slotTakenNote');
        break;
      case 'too_late':
        this.alertText = this.text('tooLateNote');
        break;
      case 'not_found':
        this.alertText = this.text('notFoundNote');
        break;
      case 'rate_limited': {
        const seconds = outcome.kind === 'rate_limited' ? outcome.retryAfterSeconds : undefined;
        this.alertText = seconds === undefined ? this.text('rateLimitedGenericNote') : this.text('rateLimitedNote', { seconds });
        break;
      }
      case 'validation':
        this.alertText = this.text('validationNote');
        break;
      case 'unavailable':
        this.alertText = this.text('errorNote');
        break;
    }
    this.dispatchEvent(
      new CustomEvent<BookingErrorEventDetail>(BOOKING_ERROR_EVENT, { detail: { kind: kind satisfies BookingErrorKind }, bubbles: true, composed: true })
    );
  }

  private async chooseService(service: BookingService): Promise<void> {
    this.service = service;
    this.staffId = '';
    this.mode = 'new';
    this.selectedSlot = undefined;
    this.selectedDay = '';
    this.month = startOfMonth(new Date());
    this.go('time');
    await this.loadSlots(true);
  }

  /** Loads the current month's times. With `advance`, an empty month moves on to the next, up to a few months. */
  private async loadSlots(advance: boolean): Promise<void> {
    const service = this.service;
    if (!service) return;
    const run = (this.slotsRun += 1);
    this.slotsLoading = true;
    this.slots = [];
    let lookahead = 0;
    for (;;) {
      const { from, to } = monthWindow(this.month, new Date());
      const query = new URLSearchParams({ serviceId: service.id, from: from.toISOString(), to: to.toISOString() });
      const staff = staffIdToSend(this.staffId);
      if (staff) query.set('staffId', staff);
      const outcome = await callBookings({
        base: this.endpoint,
        method: 'GET',
        path: `/availability?${query.toString()}`,
        readOk: readSlots,
        signal: this.inflight?.signal
      });
      if (run !== this.slotsRun || !this.isConnected) return;
      if (outcome.kind !== 'ok') {
        this.slotsLoading = false;
        this.fail(outcome.kind, outcome);
        return;
      }
      if (outcome.data.length === 0 && advance && lookahead < MAX_MONTH_LOOKAHEAD) {
        lookahead += 1;
        this.month = addMonths(this.month, 1);
        continue;
      }
      this.slots = outcome.data;
      break;
    }
    this.slotsLoading = false;
    const days = groupSlotsByDay(this.slots);
    const first = [...days.keys()][0];
    this.focusDay = first ?? dayKey(this.month);
    this.notice = this.slots.length === 0 ? this.text('noSlots', { month: this.monthName(this.month) }) : '';
  }

  private async shiftMonth(count: number): Promise<void> {
    const next = addMonths(this.month, count);
    const nowMonth = startOfMonth(new Date());
    if (next.getTime() < nowMonth.getTime() || next.getTime() > addMonths(nowMonth, MAX_MONTHS_AHEAD).getTime()) return;
    this.month = next;
    this.selectedDay = '';
    this.selectedSlot = undefined;
    await this.loadSlots(false);
  }

  private onStaffChange(event: Event): void {
    this.staffId = (event.target as HTMLInputElement).value;
    this.selectedDay = '';
    this.selectedSlot = undefined;
    this.alertText = '';
    void this.loadSlots(false);
  }

  private pickDay(key: string): void {
    const days = groupSlotsByDay(this.slots);
    this.focusDay = key;
    if (!days.has(key)) return;
    this.selectedDay = key;
    this.selectedSlot = undefined;
    this.alertText = '';
    const count = days.get(key)?.length ?? 0;
    this.notice = this.text('slotsAvailable', { count, date: this.fullDate(parseDayKey(key)) });
  }

  private pickSlot(slot: BookingSlot): void {
    this.selectedSlot = slot;
    this.alertText = '';
  }

  private onGridKeydown(event: KeyboardEvent): void {
    const key = (event.target as HTMLElement).dataset.day;
    if (!key) return;
    const current = parseDayKey(key);
    const moves: Record<string, Date> = {
      ArrowLeft: addDays(current, -1),
      ArrowRight: addDays(current, 1),
      ArrowUp: addDays(current, -7),
      ArrowDown: addDays(current, 7),
      Home: addDays(current, -((current.getDay() - this.weekStart + 7) % 7)),
      End: addDays(current, 6 - ((current.getDay() - this.weekStart + 7) % 7)),
      PageUp: new Date(current.getFullYear(), current.getMonth() - 1, current.getDate()),
      PageDown: new Date(current.getFullYear(), current.getMonth() + 1, current.getDate())
    };
    const target = moves[event.key];
    if (!target) return;
    event.preventDefault();
    const targetKey = dayKey(target);
    const sameMonth = target.getMonth() === this.month.getMonth() && target.getFullYear() === this.month.getFullYear();
    this.focusDay = targetKey;
    if (!sameMonth) void this.shiftMonth(this.monthDelta(target)).then(() => this.focusDayButton(targetKey));
    else this.focusDayButton(targetKey);
  }

  private monthDelta(target: Date): number {
    return (target.getFullYear() - this.month.getFullYear()) * 12 + target.getMonth() - this.month.getMonth();
  }

  private focusDayButton(key: string): void {
    this.focusDay = key;
    void this.updateComplete.then(() => this.renderRoot.querySelector<HTMLElement>(`[data-day="${key}"]`)?.focus());
  }

  private continueFromTime(): void {
    if (!this.selectedSlot) return;
    if (this.mode === 'reschedule') void this.reschedule(this.selectedSlot);
    else this.go('details');
  }

  private backFromTime(): void {
    if (this.mode === 'reschedule') this.go('booking');
    else if (this.services.length > 0) this.go('services');
  }

  /* ------------------------------------------------------------ calls */

  private async book(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    const slot = this.selectedSlot;
    const service = this.service;
    if (this.busy || !slot || !service) return;
    const form = event.currentTarget as HTMLFormElement;
    const values = this.readValues(form);
    this.draft = { name: values.name, email: values.email, phone: values.phone, notes: values.notes, consent: values.consent };
    this.alertText = '';
    const errors = validateBooking(values, this.fieldLabels(), this.messages());
    this.errors = errors;
    const invalid = firstInvalidBookingField(errors);
    if (invalid) {
      this.focusField(invalid);
      return;
    }
    const payload = buildBookingPayload(values, { serviceId: service.id, staffId: staffIdToSend(this.staffId), start: slot.start });
    this.busy = true;
    const controller = this.freshController();
    const outcome = await callBookings({ base: this.endpoint, method: 'POST', path: '/appointments', body: payload, readOk: readBooking, signal: controller.signal });
    if (this.inflight !== controller) return;
    this.busy = false;
    if (outcome.kind === 'ok') {
      this.booking = outcome.data;
      this.activeReference = outcome.data.reference;
      this.banner = 'booked';
      this.draft = {};
      this.errors = {};
      this.go('booking');
      this.dispatchEvent(
        new CustomEvent<BookingCreatedEventDetail>(BOOKING_CREATED_EVENT, { detail: { serviceId: outcome.data.serviceId || service.id, start: outcome.data.start }, bubbles: true, composed: true })
      );
      return;
    }
    if (outcome.kind === 'validation') {
      this.applyServerErrors(outcome.errors);
      this.fail('validation', outcome);
      return;
    }
    if (outcome.kind === 'slot_taken') {
      this.selectedSlot = undefined;
      this.fail('slot_taken', outcome, 'time');
      void this.loadSlots(false).then(() => {
        this.alertText = this.text('slotTakenNote');
      });
      return;
    }
    this.fail(outcome.kind, outcome);
  }

  /** Server messages go on the fields that exist; a rejected start or staff means the time must be picked again. */
  private applyServerErrors(errors: Record<string, string>): void {
    const shown: BookingErrors = {};
    const rest: string[] = [];
    const names: readonly string[] = BOOKING_FIELD_NAMES;
    for (const [key, message] of Object.entries(errors)) {
      if (names.includes(key)) shown[key as BookingFieldName] = message;
      else rest.push(message);
    }
    this.errors = shown;
    const invalid = firstInvalidBookingField(shown);
    if (invalid) this.focusField(invalid);
    if (rest.length > 0) {
      this.selectedSlot = undefined;
      void this.loadSlots(false);
      this.go('time');
      this.alertText = rest.join(' ');
    }
  }

  private async reschedule(slot: BookingSlot): Promise<void> {
    const booking = this.booking;
    if (this.busy || !booking) return;
    this.busy = true;
    const controller = this.freshController();
    const outcome = await callBookings({
      base: this.endpoint,
      method: 'POST',
      path: appointmentPath(this.activeReference, '/reschedule'),
      body: { start: slot.start },
      readOk: readBooking,
      signal: controller.signal
    });
    if (this.inflight !== controller) return;
    this.busy = false;
    if (outcome.kind === 'ok') {
      this.booking = outcome.data;
      this.activeReference = outcome.data.reference;
      this.banner = 'rescheduled';
      this.mode = 'new';
      this.go('booking');
      this.dispatchEvent(
        new CustomEvent<BookingRescheduledEventDetail>(BOOKING_RESCHEDULED_EVENT, { detail: { serviceId: outcome.data.serviceId || booking.serviceId, start: outcome.data.start }, bubbles: true, composed: true })
      );
      return;
    }
    if (outcome.kind === 'slot_taken') {
      this.selectedSlot = undefined;
      this.fail('slot_taken', outcome);
      void this.loadSlots(false).then(() => {
        this.alertText = this.text('slotTakenNote');
      });
      return;
    }
    if (outcome.kind === 'too_late') {
      this.mode = 'new';
      this.fail('too_late', outcome, 'booking');
      return;
    }
    this.fail(outcome.kind, outcome, outcome.kind === 'not_found' ? 'notfound' : undefined);
  }

  private startReschedule(): void {
    const booking = this.booking;
    if (!booking) return;
    this.service = { id: booking.serviceId, name: booking.serviceName, description: '', durationMinutes: 0, online: false, staff: [] };
    this.staffId = '';
    this.mode = 'reschedule';
    this.selectedSlot = undefined;
    this.selectedDay = '';
    this.banner = '';
    this.confirmingCancel = false;
    this.month = startOfMonth(new Date());
    this.go('time');
    void this.loadSlots(true);
  }

  private async cancelBooking(): Promise<void> {
    const booking = this.booking;
    if (this.busy || !booking) return;
    this.busy = true;
    const controller = this.freshController();
    const outcome = await callBookings({ base: this.endpoint, method: 'DELETE', path: appointmentPath(this.activeReference), readOk: readNothing, signal: controller.signal });
    if (this.inflight !== controller) return;
    this.busy = false;
    this.confirmingCancel = false;
    if (outcome.kind === 'ok') {
      this.activeReference = '';
      this.banner = '';
      this.go('cancelled');
      this.dispatchEvent(
        new CustomEvent<BookingCancelledEventDetail>(BOOKING_CANCELLED_EVENT, { detail: { serviceId: booking.serviceId }, bubbles: true, composed: true })
      );
      return;
    }
    this.fail(outcome.kind, outcome, outcome.kind === 'not_found' ? 'notfound' : undefined);
  }

  private freshController(): AbortController {
    this.inflight?.abort();
    const controller = new AbortController();
    this.inflight = controller;
    return controller;
  }

  private bookAnother(): void {
    this.reference = '';
    this.activeReference = '';
    this.inflight?.abort();
    const controller = new AbortController();
    this.inflight = controller;
    this.resetState();
    this.view = 'loading';
    void this.loadServices(controller);
  }

  private async copyLink(): Promise<void> {
    const link = this.manageLink();
    try {
      await navigator.clipboard.writeText(link);
      this.notice = this.text('linkCopied');
    } catch {
      const input = this.renderRoot.querySelector<HTMLInputElement>('#bk-link');
      input?.focus();
      input?.select();
    }
  }

  private manageLink(): string {
    return buildManageUrl(this.manageUrl.trim() || window.location.href, this.activeReference);
  }

  /* ------------------------------------------------------------ details form */

  private readText(form: HTMLFormElement, name: string): string {
    const field = form.elements.namedItem(name);
    return field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement ? field.value : '';
  }

  private readValues(form: HTMLFormElement): BookingValues {
    const consent = form.elements.namedItem('consent');
    return {
      name: this.readText(form, 'name'),
      email: this.readText(form, 'email'),
      phone: this.readText(form, 'phone'),
      notes: this.readText(form, 'notes'),
      consent: consent instanceof HTMLInputElement && consent.checked,
      website: this.readText(form, 'website')
    };
  }

  private focusField(name: BookingFieldName): void {
    void this.updateComplete.then(() => this.renderRoot.querySelector<HTMLElement>(`#bk-${name}`)?.focus());
  }

  /* ------------------------------------------------------------ rendering */

  private heading(text: string) {
    return html`<h2 id="bk-heading" part="heading" tabindex="-1">${text}</h2>`;
  }

  private renderSteps() {
    if (this.mode === 'reschedule' || !['services', 'time', 'details'].includes(this.view)) return nothing;
    const steps: { view: View; label: string }[] = [
      { view: 'services', label: this.text('stepService') },
      { view: 'time', label: this.text('stepTime') },
      { view: 'details', label: this.text('stepDetails') }
    ];
    return html`<ol class="steps" part="steps" aria-label=${this.text('stepsLabel')}>
      ${steps.map(step => html`<li aria-current=${step.view === this.view ? 'step' : nothing}>${step.label}</li>`)}
    </ol>`;
  }

  private renderServices() {
    return html`
      ${this.heading(this.text('serviceHeading'))}
      ${this.services.length === 0
        ? html`<p class="note">${this.text('noServices')}</p>`
        : html`<ul class="options">
            ${this.services.map(
              service => html`<li>
                <button class="service" part="service" type="button" @click=${() => void this.chooseService(service)}>
                  <span class="service-name">${service.name}</span>
                  ${service.description ? html`<span>${service.description}</span>` : nothing}
                  <span class="meta">
                    ${service.durationMinutes > 0 ? this.text('duration', { minutes: service.durationMinutes }) : nothing}${service.online
                      ? html`${service.durationMinutes > 0 ? ' · ' : ''}${this.text('online')}`
                      : nothing}
                  </span>
                </button>
              </li>`
            )}
          </ul>`}
    `;
  }

  private renderStaff() {
    const staff = this.service?.staff ?? [];
    if (this.mode === 'reschedule' || staff.length < 2) return nothing;
    return html`<fieldset>
      <legend>${this.text('staffLegend')}</legend>
      <label class="choice">
        <input type="radio" name="staff" value="" .checked=${this.staffId === ''} @change=${this.onStaffChange} />
        ${this.text('anyStaff')}
      </label>
      ${staff.map(
        member => html`<label class="choice">
          <input type="radio" name="staff" value=${member.id} .checked=${this.staffId === member.id} @change=${this.onStaffChange} />
          ${member.name}
        </label>`
      )}
    </fieldset>`;
  }

  private renderCalendar(days: Map<string, BookingSlot[]>) {
    const first = startOfMonth(new Date());
    const canGoBack = this.month.getTime() > first.getTime();
    const canGoForward = this.month.getTime() < addMonths(first, MAX_MONTHS_AHEAD).getTime();
    const cells = monthCells(this.month, this.weekStart === 0 ? 0 : 1);
    const weekdays = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(2021, 0, 3 + ((index + this.weekStart) % 7)); // 3 Jan 2021 was a Sunday
      return { long: this.format({ weekday: 'long' }).format(date), short: this.format({ weekday: 'short' }).format(date) };
    });
    const todayKey = dayKey(new Date());
    const monthKeys = cells.filter((cell): cell is Date => cell !== null).map(dayKey);
    const rovingKey = monthKeys.includes(this.focusDay) ? this.focusDay : (monthKeys.find(key => days.has(key)) ?? monthKeys[0]);
    const rows: (Date | null)[][] = [];
    for (let index = 0; index < cells.length; index += 7) rows.push(cells.slice(index, index + 7));
    return html`<div>
      <div class="month-bar">
        <button class="btn icon-btn" part="button" type="button" ?disabled=${!canGoBack || this.slotsLoading} aria-label=${this.text('previousMonth')} @click=${() => void this.shiftMonth(-1)}>‹</button>
        <span class="month-name" id="bk-month" aria-live="polite">${this.monthName(this.month)}</span>
        <button class="btn icon-btn" part="button" type="button" ?disabled=${!canGoForward || this.slotsLoading} aria-label=${this.text('nextMonth')} @click=${() => void this.shiftMonth(1)}>›</button>
      </div>
      <table part="calendar" role="grid" aria-labelledby="bk-month" aria-busy=${this.slotsLoading ? 'true' : 'false'} @keydown=${this.onGridKeydown}>
        <thead>
          <tr>${weekdays.map(day => html`<th scope="col" abbr=${day.long}>${day.short}</th>`)}</tr>
        </thead>
        <tbody>
          ${rows.map(
            row => html`<tr>
              ${row.map(cell => {
                if (!cell) return html`<td></td>`;
                const key = dayKey(cell);
                const available = days.has(key) && key >= todayKey;
                return html`<td role="gridcell">
                  <button
                    class="day ${available ? 'has-slots' : ''}"
                    part="day"
                    type="button"
                    data-day=${key}
                    tabindex=${key === rovingKey ? '0' : '-1'}
                    aria-disabled=${available ? 'false' : 'true'}
                    aria-pressed=${available ? (key === this.selectedDay ? 'true' : 'false') : nothing}
                    aria-label=${this.fullDate(cell)}
                    @click=${() => this.pickDay(key)}
                  >
                    ${cell.getDate()}
                  </button>
                </td>`;
              })}
            </tr>`
          )}
        </tbody>
      </table>
    </div>`;
  }

  private renderTime() {
    const days = groupSlotsByDay(this.slots);
    const daySlots = days.get(this.selectedDay) ?? [];
    const heading = this.mode === 'reschedule' ? this.text('rescheduleHeading') : this.text('timeHeading');
    const dayDate = this.selectedDay ? parseDayKey(this.selectedDay) : undefined;
    return html`
      ${this.heading(heading)}
      ${this.service ? html`<p class="meta">${this.service.name}</p>` : nothing}
      ${this.renderStaff()}
      <div class="time-layout">
        ${this.renderCalendar(days)}
        <div>
          ${this.slotsLoading
            ? html`<p class="loading" role="status">${this.text('loading')}</p>`
            : this.slots.length === 0
              ? html`<p class="note">${this.text('noSlots', { month: this.monthName(this.month) })}</p>`
              : dayDate
                ? html`<h3>${this.text('timesHeading', { date: this.fullDate(dayDate) })}</h3>
                    <ul class="slots" aria-label=${this.text('timesHeading', { date: this.fullDate(dayDate) })}>
                      ${daySlots.map(
                        slot => html`<li>
                          <button class="slot" part="slot" type="button" aria-pressed=${slot === this.selectedSlot ? 'true' : 'false'} @click=${() => this.pickSlot(slot)}>
                            ${this.timeOfDay(slot.start)}
                          </button>
                        </li>`
                      )}
                    </ul>`
                : html`<p class="note">${this.text('chooseDay')}</p>`}
          <p class="note">${this.text('timeZoneNote', { zone: this.zoneName() })}</p>
        </div>
      </div>
      <div class="actions">
        ${this.mode === 'reschedule' || this.services.length > 0
          ? html`<button class="btn" part="button" type="button" @click=${this.backFromTime}>${this.text('back')}</button>`
          : nothing}
        <button class="btn primary" part="primary" type="button" ?disabled=${!this.selectedSlot || this.busy} @click=${this.continueFromTime}>
          ${this.mode === 'reschedule' ? this.text('confirmReschedule') : this.text('continue')}
        </button>
      </div>
    `;
  }

  private requiredMark() {
    return html`<span aria-hidden="true"> *</span><span class="sr-only"> (${this.text('requiredLabel')})</span>`;
  }

  private renderInput(name: 'name' | 'email' | 'phone', label: string, options: { type: string; autocomplete: string; placeholder?: string; required: boolean }) {
    const error = this.errors[name];
    return html`<div class="field" part="field">
      <label class="label" part="label" for="bk-${name}">${label}${options.required ? this.requiredMark() : nothing}</label>
      <input
        class="input"
        part="input"
        id="bk-${name}"
        name=${name}
        type=${options.type}
        autocomplete=${options.autocomplete}
        inputmode=${name === 'phone' ? 'tel' : nothing}
        placeholder=${options.placeholder || nothing}
        .value=${this.draft[name] ?? ''}
        ?required=${options.required}
        aria-invalid=${error ? 'true' : 'false'}
        aria-describedby=${error ? `bk-${name}-error` : nothing}
      />
      ${error ? html`<p class="error" part="error" id="bk-${name}-error">${error}</p>` : nothing}
    </div>`;
  }

  private renderDetails() {
    const slot = this.selectedSlot;
    const notesError = this.errors.notes;
    const consentError = this.errors.consent;
    const over = this.notesLength > BOOKING_LIMITS.notesMax;
    return html`
      ${this.heading(this.text('detailsHeading'))}
      ${this.service && slot ? html`<p class="meta" part="summary">${this.service.name} · ${this.whenText(slot.start)}</p>` : nothing}
      <form novalidate aria-busy=${this.busy ? 'true' : 'false'} @submit=${this.book} class="root">
        <p class="note">${this.text('requiredNote')}</p>
        ${this.renderInput('name', this.text('nameLabel'), { type: 'text', autocomplete: 'name', placeholder: this.text('namePlaceholder'), required: true })}
        ${this.renderInput('email', this.text('emailLabel'), { type: 'email', autocomplete: 'email', placeholder: this.text('emailPlaceholder'), required: true })}
        ${this.renderInput('phone', this.text('phoneLabel'), { type: 'tel', autocomplete: 'tel', required: false })}
        <div class="field" part="field">
          <label class="label" part="label" for="bk-notes">${this.text('notesLabel')}</label>
          <textarea
            class="input"
            part="input"
            id="bk-notes"
            name="notes"
            rows="4"
            placeholder=${this.text('notesPlaceholder') || nothing}
            .value=${this.draft.notes ?? ''}
            aria-invalid=${notesError ? 'true' : 'false'}
            aria-describedby=${notesError ? 'bk-notes-error' : nothing}
            @input=${(event: Event) => (this.notesLength = codePointLengthOf((event.target as HTMLTextAreaElement).value.trim()))}
          ></textarea>
          ${this.notesLength >= BOOKING_LIMITS.notesMax * 0.8
            ? html`<p class="counter ${over ? 'over' : ''}">${this.text('notesCounter', { count: this.notesLength, max: BOOKING_LIMITS.notesMax })}</p>`
            : nothing}
          ${notesError ? html`<p class="error" part="error" id="bk-notes-error">${notesError}</p>` : nothing}
        </div>
        <div class="field" part="field">
          <label class="consent">
            <input
              type="checkbox"
              id="bk-consent"
              name="consent"
              required
              .checked=${this.draft.consent === true}
              aria-invalid=${consentError ? 'true' : 'false'}
              aria-describedby=${consentError ? 'bk-consent-error' : nothing}
            />
            <span>${this.text('consentLabel')}${this.requiredMark()}</span>
          </label>
          ${consentError ? html`<p class="error" part="error" id="bk-consent-error">${consentError}</p>` : nothing}
        </div>
        <div class="hp" aria-hidden="true" inert>
          <input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" />
        </div>
        <div class="actions">
          <button class="btn" part="button" type="button" ?disabled=${this.busy} @click=${() => this.go('time')}>${this.text('back')}</button>
          <button class="btn primary" part="primary" type="submit" ?disabled=${this.busy}>${this.busy ? this.text('sending') : this.text('submit')}</button>
        </div>
      </form>
    `;
  }

  private renderBooking() {
    const booking = this.booking;
    if (!booking) return nothing;
    const heading = this.banner === 'booked' ? this.text('bookedHeading') : this.text('bookingHeading');
    return html`
      ${this.heading(heading)}
      ${this.banner
        ? html`<div class="success" part="success">
            <span class="success-icon" aria-hidden="true">${CHECK_ICON}</span>
            <p>${this.banner === 'booked' ? this.text('bookedNote') : this.text('rescheduledNote')}</p>
          </div>`
        : nothing}
      <dl class="summary" part="summary">
        <dt>${this.text('serviceLabel')}</dt>
        <dd>${booking.serviceName}</dd>
        <dt>${this.text('whenLabel')}</dt>
        <dd>${this.whenText(booking.start)}</dd>
      </dl>
      ${this.banner === 'booked'
        ? html`<div class="field">
            <label class="label" for="bk-link">${this.text('manageLinkLabel')}</label>
            <div class="link-row">
              <input class="input" id="bk-link" type="text" readonly aria-describedby="bk-link-hint" .value=${this.manageLink()} @focus=${(event: Event) => (event.target as HTMLInputElement).select()} />
              <button class="btn" part="button" type="button" @click=${() => void this.copyLink()}>${this.text('copyLink')}</button>
            </div>
            <p class="note" id="bk-link-hint">${this.text('manageLinkHint')}</p>
          </div>`
        : nothing}
      ${this.confirmingCancel
        ? html`<div role="group" aria-labelledby="bk-cancel-q" class="field">
            <p id="bk-cancel-q" class="label">${this.text('cancelConfirm')}</p>
            <div class="actions">
              <button class="btn danger" part="button" type="button" ?disabled=${this.busy} @click=${() => void this.cancelBooking()}>${this.text('cancelYes')}</button>
              <button class="btn" part="button" type="button" ?disabled=${this.busy} @click=${() => (this.confirmingCancel = false)}>${this.text('cancelNo')}</button>
            </div>
          </div>`
        : html`<div class="actions">
            <button class="btn primary" part="primary" type="button" @click=${this.startReschedule}>${this.text('reschedule')}</button>
            <button class="btn danger" part="button" type="button" @click=${() => (this.confirmingCancel = true)}>${this.text('cancel')}</button>
          </div>`}
    `;
  }

  private renderCancelled() {
    return html`
      ${this.heading(this.text('cancelledHeading'))}
      <p>${this.text('cancelledNote')}</p>
      <div class="actions"><button class="btn primary" part="primary" type="button" @click=${this.bookAnother}>${this.text('bookAnother')}</button></div>
    `;
  }

  private renderRetry(label: string) {
    return html`<div class="actions"><button class="btn primary" part="primary" type="button" @click=${() => void this.start()}>${label}</button></div>`;
  }

  private renderView() {
    switch (this.view) {
      case 'loading':
        return html`<p class="loading" role="status">${this.text('loading')}</p>`;
      case 'services':
        return this.renderServices();
      case 'time':
        return this.renderTime();
      case 'details':
        return this.renderDetails();
      case 'booking':
        return this.renderBooking();
      case 'cancelled':
        return this.renderCancelled();
      case 'notfound':
        return html`${this.heading(this.text('bookingHeading'))}
        <div class="actions"><button class="btn primary" part="primary" type="button" @click=${this.bookAnother}>${this.text('bookAnother')}</button></div>`;
      case 'fatal':
        return html`${this.heading(this.text('bookingHeading'))}${this.renderRetry(this.text('retry'))}`;
    }
  }

  render() {
    return html`
      <div class="root" aria-busy=${this.view === 'loading' || this.slotsLoading ? 'true' : 'false'}>
        ${this.renderSteps()}
        <div class="alert ${this.alertText ? 'has-text' : ''}" part="alert" role="alert">${this.alertText}</div>
        <p class="sr-only" role="status" aria-live="polite">${this.notice}</p>
        ${this.renderView()}
      </div>
    `;
  }
}
