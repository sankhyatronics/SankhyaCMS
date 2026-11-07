import { LitElement, css, html, nothing, svg } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import { controlBaseStyles, fontFamilyStyles } from '../shared/styles';
import {
  CONTACT_FORM_ERROR_EVENT,
  CONTACT_FORM_SENT_EVENT,
  CONTACT_FORM_SUBMIT_EVENT,
  type ContactFormErrorEventDetail,
  type ContactFormErrorKind,
  type ContactFormSentEventDetail,
  type ContactFormSubmitEventDetail
} from './ContactFormEvents';
import {
  CONTACT_FIELD_NAMES,
  CONTACT_LIMITS,
  COUNTER_SHOW_RATIO,
  DEFAULT_ERROR_MESSAGES,
  ERROR_SUMMARY_MIN,
  counterBand,
  safeMailto,
  splitMailto,
  type ContactErrorMessages,
  type ContactErrors,
  type ContactFieldLabels,
  type ContactFieldName,
  type ContactQuery,
  type ContactSubmitResult,
  type ContactTopic,
  type ContactValues,
  type TopicGroup,
  buildContactPayload,
  codePointLength,
  fillTemplate,
  firstInvalidField,
  groupTopics,
  normalizeTopics,
  parseTopicsAttribute,
  readContactQuery,
  resolvePreselectedTopic,
  submitContact,
  validateContact
} from './contact-form-client';

const SUCCESS_ICON = svg`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12l5 5L20 7" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;

/** Field order for focus after a failed check (the same order the form shows them in). */
const FIELD_ORDER: readonly ContactFieldName[] = CONTACT_FIELD_NAMES;

type TextFieldName = 'name' | 'email' | 'company' | 'phone';

/**
 * A contact form for a website: name, work e-mail, company, an optional phone, a topic, a message and a
 * required consent box. It posts the answers as JSON to `endpoint` and shows what came back: a success
 * note (with the reference, when the API gives one), field messages from the server, or a short note when
 * the message could not be sent. The text the server sends is never shown. Only the component's own
 * labels and messages, plus the server's per-field messages, appear on the page.
 *
 * Every rule is checked in the browser first, the same rules the server applies, so a visitor sees the
 * problem before anything is sent. The server still decides, and a field it rejects is shown with its
 * message while the visitor's input is kept. A hidden honeypot field (`website`) must stay empty.
 *
 * `topics` lists the choices, grouped by each item's `group`. The topic is preselected from the page URL:
 * `?product=` wins, then `?topic=`, each when it names one of the topics. `default-topic` is the fallback.
 * An "About:" pill shows when the URL chose the topic.
 *
 * The form does not clear the message on an error, and the button is disabled while a request is in
 * flight. Removing the element aborts a request that has not finished.
 *
 * When three or more fields fail, a summary (`role="alert"`) at the top of the form lists each error as a link
 * to its field, and focus moves to the summary. With one or two failing fields, focus goes to the first one.
 *
 * The notes for a network failure or a rate limit may contain `{mailto}`; it becomes a `mailto:` link to the
 * `mailto` address. A message the server sends is shown as plain text and is never given a link.
 *
 * The message counter appears from 80% of the limit. Screen readers are told when it passes 80%, 90% and the limit.
 *
 * None of the events carries personal data (no name, e-mail, company, phone or message text).
 *
 * @fires st-contact-form-submit - Bubbles and is composed. Detail `{ topic: string }` (the chosen topic's value). The checks passed and the request is about to be sent.
 * @fires st-contact-form-sent - Bubbles and is composed. Detail `{ reference?: string }`. The form has been cleared.
 * @fires st-contact-form-error - Bubbles and is composed. Detail `{ kind: 'validation' | 'rate_limited' | 'unavailable' }`. The input is kept.
 * @csspart form - The form.
 * @csspart field - Each field's wrapper (label, control and error).
 * @csspart label - Each field's label.
 * @csspart input - Each text input, the topic select and the message textarea.
 * @csspart error - Each field's error message.
 * @csspart summary - The error summary shown when three or more fields fail.
 * @csspart required-note - The "* Required" note.
 * @csspart submit - The submit button.
 * @csspart success - The success note.
 * @csspart alert - The form-level alert (rate limit, unavailable, or a server message that is not on one field).
 * @csspart about - The "About:" pill.
 * @csspart consent - The consent label.
 */
@customElement('st-contact-form')
export class ContactForm extends LitElement {
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

    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin: 0;
      min-width: 0;
    }

    .grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 16px;
    }

    .full {
      grid-column: 1 / -1;
    }

    @media (min-width: 560px) {
      .grid {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      }
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
    }

    /* Text uses the theme's own colour tokens (they swap in dark themes). The --st-cms-text* tokens are fixed
       light-surface colours and would be unreadable on a dark surface. */
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

    /* Browsers dim the placeholder; the muted text token is already 4.5:1 on the surface in both themes. */
    .input::placeholder {
      color: var(--st-color-text-muted);
      opacity: 1;
    }

    .select {
      appearance: auto;
    }

    .required-note {
      margin: 0;
      font-size: 14px;
      color: var(--st-color-text);
    }

    .summary {
      margin: 0;
      padding: 14px 16px;
      border: 1px solid var(--st-color-danger);
      border-radius: 12px;
      background: var(--st-color-danger-subtle);
      color: var(--st-color-danger-text);
      font-size: 14px;
      line-height: 1.5;
    }

    .summary:focus-visible {
      outline: 2px solid var(--st-cms-brand-azure);
      outline-offset: 2px;
    }

    .summary-title {
      margin: 0 0 6px;
      font-weight: var(--st-font-weight-semibold);
    }

    .summary ul {
      margin: 0;
      padding-left: 20px;
    }

    .summary a,
    .alert a {
      color: inherit;
      font-weight: var(--st-font-weight-semibold);
      text-decoration: underline;
    }

    textarea.input {
      min-height: 144px;
      resize: vertical;
    }

    .input:focus-visible {
      outline: 2px solid var(--st-cms-brand-azure);
      outline-offset: 2px;
    }

    .input[aria-invalid='true'] {
      border-color: var(--st-color-danger);
      box-shadow: inset 0 0 0 1px var(--st-color-danger);
    }

    .counter {
      margin: 0;
      align-self: flex-end;
      font-size: 12px;
      color: var(--st-color-text-muted);
    }

    .counter.over {
      color: var(--st-color-danger-text);
      font-weight: var(--st-font-weight-semibold);
    }

    .error {
      margin: 0;
      font-size: 13px;
      line-height: 1.4;
      color: var(--st-color-danger-text);
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

    .about {
      margin: 0;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      min-height: 32px;
      padding: 4px 12px;
      border-radius: 9999px;
      background: var(--st-color-subtle, var(--st-cms-surface-soft));
      color: var(--st-color-text-strong);
      font-size: 13px;
      font-weight: var(--st-font-weight-semibold);
    }

    .consent {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      min-height: 44px;
      font-size: 14px;
      line-height: 1.5;
      color: var(--st-color-text);
      cursor: pointer;
    }

    .consent input {
      flex: none;
      width: 20px;
      height: 20px;
      margin: 2px 0 0;
      accent-color: var(--st-cms-brand-navy);
    }

    .privacy {
      margin: 0;
      font-size: 13px;
      line-height: 1.5;
      color: var(--st-color-text);
    }

    .privacy a {
      color: var(--st-color-text-strong);
      font-weight: var(--st-font-weight-semibold);
      text-decoration: underline;
    }

    .submit {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 48px;
      padding: 0 24px;
      border: 0;
      border-radius: 9999px;
      background: var(--st-cms-brand-navy);
      color: var(--st-cms-on-dark);
      font: inherit;
      font-size: 16px;
      font-weight: var(--st-font-weight-semibold);
      cursor: pointer;
      transition: opacity 150ms ease;
    }

    .submit:hover:not(:disabled) {
      opacity: 0.92;
    }

    .submit:disabled {
      opacity: 0.6;
      cursor: progress;
    }

    .submit:focus-visible {
      outline: 2px solid var(--st-cms-brand-azure);
      outline-offset: 2px;
    }

    @media (prefers-reduced-motion: reduce) {
      .submit {
        transition: none;
      }
    }

    .success {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 16px;
      padding: 16px 18px;
      border-radius: 16px;
      background: var(--st-color-subtle, var(--st-cms-surface-soft));
      color: var(--st-color-text-strong);
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

    .success-text {
      margin: 0;
      font-size: 15px;
      line-height: 1.6;
    }

    .reference {
      font-weight: var(--st-font-weight-bold);
    }

    .alert {
      margin: 0;
    }

    .alert.has-text {
      margin-bottom: 16px;
      padding: 12px 14px;
      border-radius: 12px;
      background: var(--st-color-danger-subtle);
      color: var(--st-color-danger-text);
      font-size: 14px;
      line-height: 1.5;
    }
  `;

  /** Absolute `http(s)` URL of the contact API. Empty: the form still renders, and submitting shows the error note without sending. */
  @property({ type: String })
  endpoint = '';

  /** The choices for the topic select. Also set as the JSON attribute `topics`. Items with a `group` are put under that `<optgroup>`. */
  @property({ attribute: 'topics', converter: { fromAttribute: parseTopicsAttribute } })
  topics: ContactTopic[] = [];

  /** The topic to preselect when the page URL does not choose one. Ignored unless it is one of `topics`. */
  @property({ type: String, attribute: 'default-topic' })
  defaultTopic = '';

  /** Shows the optional phone field. Set `show-phone="false"` to hide it. */
  @property({ attribute: 'show-phone', converter: { fromAttribute: (value: string | null) => value !== 'false' } })
  showPhone = true;

  /** Language sent with the message. Empty uses the page's `lang`, or `en`. */
  @property({ type: String })
  locale = '';

  /** Page sent with the message. Empty uses the page's path. */
  @property({ type: String })
  page = '';

  @property({ type: String, attribute: 'name-label' })
  nameLabel = 'Full name';

  @property({ type: String, attribute: 'email-label' })
  emailLabel = 'Work email';

  @property({ type: String, attribute: 'company-label' })
  companyLabel = 'Company';

  @property({ type: String, attribute: 'phone-label' })
  phoneLabel = 'Phone (optional)';

  @property({ type: String, attribute: 'topic-label' })
  topicLabel = 'Topic';

  @property({ type: String, attribute: 'topic-placeholder' })
  topicPlaceholder = 'Select a topic';

  @property({ type: String, attribute: 'message-label' })
  messageLabel = 'Message';

  @property({ type: String, attribute: 'name-placeholder' })
  namePlaceholder = 'Your name';

  @property({ type: String, attribute: 'email-placeholder' })
  emailPlaceholder = 'you@company.com';

  @property({ type: String, attribute: 'company-placeholder' })
  companyPlaceholder = 'Your company';

  @property({ type: String, attribute: 'message-placeholder' })
  messagePlaceholder = 'Tell us what you need';

  /** The message counter. `{count}` and `{max}` are filled in. */
  @property({ type: String, attribute: 'message-counter' })
  messageCounter = '{count} / {max}';

  @property({ type: String, attribute: 'submit-label' })
  submitLabel = 'Send message';

  @property({ type: String, attribute: 'sending-label' })
  sendingLabel = 'Sending…';

  /** Shown in brackets after each required label, for screen readers. */
  @property({ type: String, attribute: 'required-label' })
  requiredLabel = 'required';

  /** The text before the topic in the "About:" pill. */
  @property({ type: String, attribute: 'about-label' })
  aboutLabel = 'About:';

  @property({ type: String, attribute: 'consent-label' })
  consentLabel = 'I agree that Sankhyatronics may use these details to reply to my enquiry.';

  /** A line of privacy text above the submit button. Empty hides it. */
  @property({ type: String, attribute: 'privacy-note' })
  privacyNote = '';

  @property({ type: String, attribute: 'privacy-link-label' })
  privacyLinkLabel = 'Privacy Policy';

  @property({ type: String, attribute: 'privacy-href' })
  privacyHref = '/privacy-policy';

  @property({ type: String, attribute: 'sent-note' })
  sentNote = 'Thanks, your message has been sent. We will reply soon.';

  @property({ type: String, attribute: 'reference-label' })
  referenceLabel = 'Your reference:';

  @property({ type: String, attribute: 'error-note' })
  errorNote = 'Sorry, your message could not be sent. Please try again later.';

  /** Rate-limit note. `{seconds}` is filled in when the server says how long to wait. */
  @property({ type: String, attribute: 'rate-limited-note' })
  rateLimitedNote = 'You have sent several messages in a short time. Please wait {seconds} seconds and try again.';

  @property({ type: String, attribute: 'rate-limited-generic-note' })
  rateLimitedGenericNote = 'You have sent several messages in a short time. Please wait a little and try again.';

  /** The field-error summary for screen readers, when several fields fail. `{count}` is filled in. */
  @property({ type: String, attribute: 'error-summary' })
  errorSummary = 'Please fix {count} fields.';

  /** The summary when one field fails. */
  @property({ type: String, attribute: 'error-summary-one' })
  errorSummaryOne = 'Please fix {count} field.';

  /** The note above the fields. The form's `aria-describedby` points at it. Empty hides it. */
  @property({ type: String, attribute: 'required-note' })
  requiredNote = '* Required';

  /** Address for `{mailto}` in the error and rate-limit notes. Empty, or not an address, leaves the placeholder out. */
  @property({ type: String })
  mailto = '';

  /** Replaces the English validation messages (`required`, `tooLong`, ...). Only the keys given are replaced. */
  @property({ attribute: false })
  errorMessages: Partial<ContactErrorMessages> = {};

  @state() private errors: ContactErrors = {};
  @state() private alertText = '';
  /** True when `alertText` is one of the component's own notes, so `{mailto}` in it becomes a link. */
  @state() private alertOwn = false;
  @state() private outcome: { reference?: string } | null = null;
  @state() private sending = false;
  @state() private messageLength = 0;
  /** What screen readers last heard about the counter; changes only when the band changes. */
  @state() private counterAnnouncement = '';
  private counterBandValue = 0;

  @query('.submit') private submitEl?: HTMLButtonElement;

  /** `product` and `topic` from the page URL, read once on connect. */
  private queryParams: ContactQuery = { product: null, topic: null };
  private inflight: AbortController | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.queryParams = readContactQuery(window.location.search);
  }

  disconnectedCallback(): void {
    this.inflight?.abort();
    this.inflight = null;
    this.sending = false;
    super.disconnectedCallback();
  }

  private get topicList(): ContactTopic[] {
    return normalizeTopics(this.topics);
  }

  private get preselect(): { value: string; fromQuery: boolean } {
    return resolvePreselectedTopic(this.topicList, {
      defaultTopic: this.defaultTopic,
      product: this.queryParams.product,
      topic: this.queryParams.topic
    });
  }

  private labels(): ContactFieldLabels {
    return {
      name: this.nameLabel,
      email: this.emailLabel,
      company: this.companyLabel,
      phone: this.phoneLabel,
      topic: this.topicLabel,
      message: this.messageLabel
    };
  }

  /** The defaults, with each key replaced by the override when it is a string. */
  private messages(): ContactErrorMessages {
    const merged = { ...DEFAULT_ERROR_MESSAGES };
    for (const key of Object.keys(merged) as (keyof ContactErrorMessages)[]) {
      const override = this.errorMessages[key];
      if (typeof override === 'string') merged[key] = override;
    }
    return merged;
  }

  private readText(form: HTMLFormElement, name: string): string {
    const field = form.elements.namedItem(name);
    return field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement ? field.value : '';
  }

  private readValues(form: HTMLFormElement): ContactValues {
    const consent = form.elements.namedItem('consent');
    return {
      name: this.readText(form, 'name'),
      email: this.readText(form, 'email'),
      company: this.readText(form, 'company'),
      phone: this.readText(form, 'phone'),
      topic: this.readText(form, 'topic'),
      message: this.readText(form, 'message'),
      consent: consent instanceof HTMLInputElement && consent.checked,
      website: this.readText(form, 'website')
    };
  }

  private async onSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    if (this.sending) return;
    const form = event.currentTarget as HTMLFormElement;
    const values = this.readValues(form);
    // A new attempt replaces the previous answer, so an old success note does not stay up beside new errors.
    this.outcome = null;
    const errors = validateContact(values, { labels: this.labels(), topics: this.topicList, messages: this.messages() });
    this.errors = errors;
    this.alertText = '';
    this.alertOwn = false;
    if (firstInvalidField(errors)) {
      this.focusProblem(errors);
      return;
    }

    this.dispatchEvent(
      new CustomEvent<ContactFormSubmitEventDetail>(CONTACT_FORM_SUBMIT_EVENT, {
        detail: { topic: values.topic.trim() },
        bubbles: true,
        composed: true
      })
    );

    const payload = buildContactPayload(values, {
      page: this.page || window.location.pathname,
      locale: this.locale || document.documentElement.lang || 'en',
      now: new Date()
    });
    const controller = new AbortController();
    this.inflight = controller;
    this.sending = true;
    // Disabling the button drops focus, so it is given back after the answer when the visitor was on it.
    const hadFocus = this.shadowRoot?.activeElement === this.submitEl;

    const result = await submitContact({ endpoint: this.endpoint.trim(), payload, signal: controller.signal });
    // Removed from the page, or superseded: nothing to show.
    if (this.inflight !== controller) return;
    this.inflight = null;
    this.sending = false;
    this.applyResult(result, form);
    if (hadFocus && result.kind !== 'validation') {
      void this.updateComplete.then(() => this.submitEl?.focus());
    }
  }

  private applyResult(result: ContactSubmitResult, form: HTMLFormElement): void {
    switch (result.kind) {
      case 'sent':
        form.reset();
        this.errors = {};
        this.alertText = '';
        this.alertOwn = false;
        this.messageLength = 0;
        this.counterBandValue = 0;
        this.counterAnnouncement = '';
        this.outcome = result.reference === undefined ? {} : { reference: result.reference };
        this.dispatchEvent(
          new CustomEvent<ContactFormSentEventDetail>(CONTACT_FORM_SENT_EVENT, {
            detail: result.reference === undefined ? {} : { reference: result.reference },
            bubbles: true,
            composed: true
          })
        );
        return;
      case 'validation': {
        // A field that is not on the form (the phone field when it is hidden) is shown in the alert instead.
        const shown: ContactErrors = {};
        const hidden: string[] = [];
        for (const name of FIELD_ORDER) {
          const message = result.errors[name];
          if (message === undefined) continue;
          if (name === 'phone' && !this.showPhone) hidden.push(message);
          else shown[name] = message;
        }
        this.errors = shown;
        this.alertText = [result.formMessage, ...hidden].filter(Boolean).join(' ');
        this.alertOwn = false;
        this.focusProblem(shown);
        this.dispatchError('validation');
        return;
      }
      case 'rate_limited':
        this.alertOwn = true;
        this.alertText =
          result.retryAfterSeconds === undefined
            ? this.rateLimitedGenericNote
            : fillTemplate(this.rateLimitedNote, { seconds: result.retryAfterSeconds });
        this.dispatchError('rate_limited');
        return;
      case 'unavailable':
        this.alertOwn = true;
        this.alertText = this.errorNote;
        this.dispatchError('unavailable');
        return;
    }
  }

  private focusField(name: ContactFieldName | undefined): void {
    if (!name) return;
    void this.updateComplete.then(() => this.renderRoot.querySelector<HTMLElement>(`#cf-${name}`)?.focus());
  }

  /** Many failing fields: focus the summary, which links to each. One or two: the first field. */
  private focusProblem(errors: ContactErrors): void {
    if (this.failingFields(errors).length >= ERROR_SUMMARY_MIN) {
      void this.updateComplete.then(() => this.renderRoot.querySelector<HTMLElement>('#cf-summary')?.focus());
      return;
    }
    this.focusField(firstInvalidField(errors));
  }

  private failingFields(errors: ContactErrors = this.errors): ContactFieldName[] {
    return FIELD_ORDER.filter(name => errors[name] !== undefined && errors[name] !== '');
  }

  private onSummaryLink(event: Event, name: ContactFieldName): void {
    event.preventDefault();
    this.focusField(name);
  }

  private dispatchError(kind: ContactFormErrorKind): void {
    this.dispatchEvent(
      new CustomEvent<ContactFormErrorEventDetail>(CONTACT_FORM_ERROR_EVENT, {
        detail: { kind },
        bubbles: true,
        composed: true
      })
    );
  }

  private onMessageInput(event: Event): void {
    const field = event.target as HTMLTextAreaElement;
    this.messageLength = codePointLength(field.value.trim());
    // The polite announcement is made only when the band changes (80%, 90%, over), not on every key.
    const band = counterBand(this.messageLength, CONTACT_LIMITS.messageMax);
    if (band !== this.counterBandValue) {
      this.counterBandValue = band;
      this.counterAnnouncement =
        band === 0 ? '' : fillTemplate(this.messageCounter, { count: this.messageLength, max: CONTACT_LIMITS.messageMax });
    }
  }

  private errorSummaryText(): string {
    const count = this.failingFields().length;
    if (count === 0) return '';
    return fillTemplate(count === 1 ? this.errorSummaryOne : this.errorSummary, { count });
  }

  /** The alert's text. Only the component's own notes get a link for `{mailto}`; server text stays plain. */
  private renderAlertText() {
    if (!this.alertOwn) return this.alertText;
    const address = safeMailto(this.mailto);
    return splitMailto(this.alertText).map(piece =>
      piece !== null ? piece : address ? html`<a href="mailto:${address}">${address}</a>` : nothing
    );
  }

  private renderSummary() {
    const failing = this.failingFields();
    if (failing.length < ERROR_SUMMARY_MIN) return nothing;
    return html`<div class="summary" part="summary" id="cf-summary" role="alert" tabindex="-1">
      <p class="summary-title">${this.errorSummaryText()}</p>
      <ul>
        ${failing.map(
          name => html`<li><a href="#cf-${name}" @click=${(event: Event) => this.onSummaryLink(event, name)}>${this.errors[name]}</a></li>`
        )}
      </ul>
    </div>`;
  }

  private requiredMark() {
    return html`<span aria-hidden="true"> *</span><span class="sr-only"> (${this.requiredLabel})</span>`;
  }

  private renderInput(
    name: TextFieldName,
    label: string,
    options: { type: string; autocomplete: string; placeholder?: string; inputmode?: string; required: boolean }
  ) {
    const error = this.errors[name];
    return html`<div class="field" part="field">
      <label class="label" part="label" for="cf-${name}">${label}${options.required ? this.requiredMark() : nothing}</label>
      <input
        class="input"
        part="input"
        id="cf-${name}"
        name=${name}
        type=${options.type}
        autocomplete=${options.autocomplete}
        inputmode=${options.inputmode ?? nothing}
        placeholder=${options.placeholder || nothing}
        ?required=${options.required}
        aria-invalid=${error ? 'true' : 'false'}
        aria-describedby=${error ? `cf-${name}-error` : nothing}
      />
      ${error ? html`<p class="error" part="error" id="cf-${name}-error">${error}</p>` : nothing}
    </div>`;
  }

  /** Not `renderOptions`: LitElement already has that instance property. */
  private renderChoices(topics: readonly ContactTopic[], selected: string) {
    return topics.map(
      topic => html`<option value=${topic.value} ?selected=${topic.value === selected}>${topic.label}</option>`
    );
  }

  private renderTopic(groups: readonly TopicGroup[], selected: string) {
    const error = this.errors.topic;
    return html`<div class="field full" part="field">
      <label class="label" part="label" for="cf-topic">${this.topicLabel}${this.requiredMark()}</label>
      <select
        class="input select"
        part="input"
        id="cf-topic"
        name="topic"
        required
        aria-invalid=${error ? 'true' : 'false'}
        aria-describedby=${error ? 'cf-topic-error' : nothing}
      >
        <option value="" disabled ?selected=${selected === ''}>${this.topicPlaceholder}</option>
        ${groups.map(group =>
          group.group === undefined
            ? this.renderChoices(group.topics, selected)
            : html`<optgroup label=${group.group}>${this.renderChoices(group.topics, selected)}</optgroup>`
        )}
      </select>
      ${error ? html`<p class="error" part="error" id="cf-topic-error">${error}</p>` : nothing}
    </div>`;
  }

  private renderMessage() {
    const error = this.errors.message;
    const max = CONTACT_LIMITS.messageMax;
    const over = this.messageLength > max;
    const showCounter = this.messageLength >= max * COUNTER_SHOW_RATIO;
    const describedBy = [showCounter ? 'cf-message-count' : '', error ? 'cf-message-error' : ''].filter(Boolean).join(' ');
    return html`<div class="field full" part="field">
      <label class="label" part="label" for="cf-message">${this.messageLabel}${this.requiredMark()}</label>
      <textarea
        class="input"
        part="input"
        id="cf-message"
        name="message"
        rows="6"
        placeholder=${this.messagePlaceholder || nothing}
        required
        aria-invalid=${error ? 'true' : 'false'}
        aria-describedby=${describedBy || nothing}
        @input=${this.onMessageInput}
      ></textarea>
      <p class="sr-only" id="cf-message-live" aria-live="polite">${this.counterAnnouncement}</p>
      ${showCounter
        ? html`<p class="counter ${over ? 'over' : ''}" id="cf-message-count" aria-hidden="true">
            ${fillTemplate(this.messageCounter, { count: this.messageLength, max })}
          </p>`
        : nothing}
      ${error ? html`<p class="error" part="error" id="cf-message-error">${error}</p>` : nothing}
    </div>`;
  }

  private renderConsent() {
    const error = this.errors.consent;
    return html`<div class="field full" part="field">
      <label class="consent" part="consent">
        <input
          type="checkbox"
          id="cf-consent"
          name="consent"
          required
          aria-invalid=${error ? 'true' : 'false'}
          aria-describedby=${error ? 'cf-consent-error' : nothing}
        />
        <span>${this.consentLabel}${this.requiredMark()}</span>
      </label>
      ${error ? html`<p class="error" part="error" id="cf-consent-error">${error}</p>` : nothing}
    </div>`;
  }

  render() {
    const preselect = this.preselect;
    const topics = this.topicList;
    const aboutTopic = preselect.fromQuery ? topics.find(item => item.value === preselect.value) : undefined;
    const sending = this.sending;
    const outcome = this.outcome;
    return html`
      <div class="live" role="status">
        ${outcome
          ? html`<div class="success" part="success">
              <span class="success-icon" aria-hidden="true">${SUCCESS_ICON}</span>
              <p class="success-text">
                ${this.sentNote}${outcome.reference
                  ? html` ${this.referenceLabel} <strong class="reference">${outcome.reference}</strong>`
                  : nothing}
              </p>
            </div>`
          : nothing}
      </div>
      <div class="alert ${this.alertText ? 'has-text' : ''}" part="alert" role="alert">${this.renderAlertText()}</div>
      <form
        part="form"
        novalidate
        aria-busy=${sending ? 'true' : 'false'}
        aria-describedby=${this.requiredNote ? 'cf-required-note' : nothing}
        @submit=${this.onSubmit}
      >
        ${this.requiredNote
          ? html`<p class="required-note" part="required-note" id="cf-required-note">${this.requiredNote}</p>`
          : nothing}
        ${this.renderSummary()}
        <p class="sr-only" aria-live="polite">${this.failingFields().length < ERROR_SUMMARY_MIN ? this.errorSummaryText() : ''}</p>
        ${aboutTopic
          ? html`<p class="about"><span class="pill" part="about">${this.aboutLabel} ${aboutTopic.label}</span></p>`
          : nothing}
        <div class="grid">
          ${this.renderInput('name', this.nameLabel, {
            type: 'text',
            autocomplete: 'name',
            placeholder: this.namePlaceholder,
            required: true
          })}
          ${this.renderInput('email', this.emailLabel, {
            type: 'email',
            autocomplete: 'email',
            placeholder: this.emailPlaceholder,
            required: true
          })}
          ${this.renderInput('company', this.companyLabel, {
            type: 'text',
            autocomplete: 'organization',
            placeholder: this.companyPlaceholder,
            required: true
          })}
          ${this.showPhone
            ? this.renderInput('phone', this.phoneLabel, { type: 'tel', autocomplete: 'tel', inputmode: 'tel', required: false })
            : nothing}
          ${this.renderTopic(groupTopics(topics), preselect.value)}
        </div>
        ${this.renderMessage()}
        ${this.renderConsent()}
        ${this.privacyNote
          ? html`<p class="privacy">${this.privacyNote} <a href=${this.privacyHref}>${this.privacyLinkLabel}</a></p>`
          : nothing}
        <div class="hp" aria-hidden="true" inert>
          <input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" />
        </div>
        <button class="submit" part="submit" type="submit" ?disabled=${sending}>
          ${sending ? this.sendingLabel : this.submitLabel}
        </button>
      </form>
    `;
  }
}
