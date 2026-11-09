import { LitElement, css, html, nothing, svg } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import { setModalOpen } from '../shared/modal-state';
import { controlBaseStyles, fontFamilyStyles } from '../shared/styles';
import { QUOTE_OPEN_EVENT, type QuoteOpenEventDetail, type QuoteSubmitEventDetail } from './QuoteDialogEvents';
import { buildQuoteMailto, fillTemplate } from './quote-mailto';

export interface QuoteOption {
  id: string;
  label: string;
  hint?: string;
  /** Short name for the e-mail subject's `{option}` (e.g. "Cloud" for "Cloud (SaaS)"). Defaults to `label`. */
  subjectLabel?: string;
}

type FieldName = 'name' | 'email' | 'company' | 'consent';

const CLOSE_ICON = svg`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>`;

const SUCCESS_ICON = svg`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12l5 5L20 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;

/**
 * A quote-request dialog: radio cards for the kind of request, then name, e-mail, company, a user
 * count, an optional message and a required consent box. It opens when a window `st-quote-open`
 * event names its `id` (`st-plan-cards` does this on a button click), with that option preselected.
 *
 * It is a native `<dialog>` opened with `showModal()`, so focus is trapped, Esc closes it and the page
 * behind is inert. Closing (Esc, the close button or a click on the backdrop) returns focus to the
 * element that opened it. While open, `<html>` carries `data-st-modal-open` (removed on every close and
 * on disconnect), so other fixed page UI such as `st-cookie-consent` steps aside.
 * Submitting checks the fields, opens a `mailto:` message to `mailto` with
 * every answer in the body, dispatches `quote-submit` and shows `success-title` / `success-text`
 * (`{option}` in the text becomes the chosen option's label). Without `mailto` nothing is opened and
 * the success state still shows. `subject` may use `{option}` (the option's `subjectLabel`, else its
 * label), `{company}` and `{name}`. `mailto-note` is shown under the success text (`{email}` becomes
 * the `mailto` address, as a link) with a button that copies the address, for visitors whose mail
 * app did not open. An empty `consent-label` leaves out the consent box.
 *
 * The element's `id` is the dialog name: set it on the JSON node (`"id": "quote"`), and point
 * `quoteDialog` on a `st-plan-cards` at the same value.
 *
 * @fires quote-submit - Bubbles and is composed. Detail `{ option, name, email, company, count, message, consent }`.
 * @cssprop --st-quote-dialog-backdrop - Colour of the backdrop behind the dialog (default a navy at 55%).
 * @csspart dialog - The native dialog.
 * @csspart form - The request form.
 * @csspart submit - The submit button.
 * @csspart close - The close button.
 */
@customElement('st-quote-dialog')
export class QuoteDialog extends LitElement {
  static styles = css`
    ${controlBaseStyles}
    /* fontFamilyStyles is a bare declaration: it must sit inside a rule, or it swallows the next one. */
    :host {
      ${fontFamilyStyles}
    }

    :host {
      display: block;
    }

    dialog {
      box-sizing: border-box;
      width: calc(100% - 32px);
      max-width: 560px;
      max-height: calc(100vh - 32px);
      margin: auto;
      padding: 0;
      border: 0;
      border-radius: 24px;
      background: var(--st-color-surface);
      color: var(--st-color-text-strong);
      box-shadow: 0 20px 40px -12px #0000001a;
      overflow: auto;
    }

    dialog::backdrop {
      background: var(--st-quote-dialog-backdrop, rgba(1, 29, 65, 0.55));
    }

    .panel {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 32px;
    }

    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
    }

    .heading {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .title {
      margin: 0;
      font-size: 24px;
      font-weight: var(--st-font-weight-bold);
      line-height: 1.25;
      color: var(--st-cms-text-strong, var(--st-cms-navy));
    }

    .subtitle {
      margin: 0;
      font-size: 15px;
      line-height: 1.5;
      color: var(--st-cms-text, var(--st-cms-navy-2));
    }

    .close {
      flex: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      margin: 0;
      padding: 0;
      border: 0;
      border-radius: var(--st-radius-full);
      background: var(--st-cms-surface-soft);
      color: var(--st-cms-text-strong, var(--st-cms-navy));
      cursor: pointer;
    }

    .close:hover {
      background: var(--st-cms-primary-100);
    }

    .close svg {
      width: 20px;
      height: 20px;
    }

    .close:focus-visible,
    .submit:focus-visible,
    .done:focus-visible,
    .option input:focus-visible,
    .input:focus-visible,
    .consent input:focus-visible {
      outline: var(--st-focus-ring);
      outline-offset: 2px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: var(--st-space-16);
    }

    .options {
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-width: 0;
      margin: 0;
      padding: 0;
      border: 0;
    }

    .legend {
      padding: 0;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: var(--st-font-weight-semibold);
      color: var(--st-cms-text-strong, var(--st-cms-navy));
    }

    .option-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .option {
      flex: 1 1 150px;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      box-sizing: border-box;
      min-height: 44px;
      padding: 12px 14px;
      border: 1px solid var(--st-cms-primary-200);
      border-radius: 10px;
      background: var(--st-color-surface);
      cursor: pointer;
    }

    .option.selected {
      border: 2px solid var(--st-cms-brand-navy);
      /* Keep the text where it is when the border thickens. */
      padding: 11px 13px;
    }

    .option input {
      flex: none;
      width: 16px;
      height: 16px;
      margin: 3px 0 0;
      accent-color: var(--st-cms-brand-navy);
    }

    .option-body {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .option-label {
      font-size: 14px;
      font-weight: var(--st-font-weight-semibold);
      color: var(--st-cms-text-strong, var(--st-cms-navy));
    }

    .option-hint {
      font-size: 12px;
      color: var(--st-cms-text, var(--st-cms-navy-2));
    }

    .fields {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .label {
      font-size: 14px;
      font-weight: var(--st-font-weight-semibold);
      color: var(--st-cms-text-strong, var(--st-cms-navy));
    }

    .optional {
      font-weight: var(--st-font-weight-medium);
      color: var(--st-cms-text, var(--st-cms-navy-2));
    }

    .input {
      box-sizing: border-box;
      width: 100%;
      min-height: 44px;
      padding: var(--st-space-8) var(--st-space-12);
      border: 1px solid var(--st-color-border-strong);
      border-radius: 8px;
      background: var(--st-color-surface);
      color: var(--st-cms-text-strong, var(--st-cms-navy));
      /* 16px stops iOS zooming into the field. */
      font: inherit;
      font-size: 16px;
    }

    textarea.input {
      min-height: 96px;
      resize: vertical;
    }

    .input[aria-invalid='true'] {
      border: 2px solid var(--st-color-danger);
    }

    .error {
      margin: 0;
      font-size: 13px;
      color: var(--st-color-danger-text);
    }

    /* The always-present polite live region: announces the error summary, never shown. */
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

    .consent {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 13px;
      line-height: 1.5;
      color: var(--st-cms-text, var(--st-cms-navy-2));
    }

    .consent input {
      flex: none;
      width: 16px;
      height: 16px;
      margin: 2px 0 0;
      accent-color: var(--st-cms-brand-navy);
    }

    .submit {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 48px;
      margin-top: var(--st-space-8);
      padding: 0 var(--st-space-24);
      border: 0;
      border-radius: var(--st-radius-full);
      background: var(--st-cms-brand-navy);
      color: var(--st-cms-on-dark);
      font: inherit;
      font-size: 16px;
      font-weight: var(--st-font-weight-semibold);
      cursor: pointer;
    }

    .success {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 16px 0 8px;
      text-align: center;
    }

    .success-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      border-radius: var(--st-radius-full);
      background: var(--st-cms-highlight);
      color: var(--st-cms-navy);
    }

    .success-icon svg {
      width: 28px;
      height: 28px;
    }

    .success-title {
      margin: 0;
      font-size: 20px;
      font-weight: var(--st-font-weight-semibold);
      color: var(--st-cms-text-strong, var(--st-cms-navy));
    }

    .success-text {
      max-width: 400px;
      margin: 0;
      font-size: 15px;
      line-height: 1.6;
      color: var(--st-cms-text, var(--st-cms-navy-2));
    }

    .mailto-note {
      max-width: 400px;
      margin: 0;
      font-size: 14px;
      line-height: 1.6;
      color: var(--st-cms-text, var(--st-cms-navy-2));
    }

    .mailto-note a {
      color: var(--st-cms-accent-text, var(--st-cms-brand-navy));
      font-weight: var(--st-font-weight-semibold);
    }

    .success-actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
    }

    .done:focus-visible,
    .copy:focus-visible {
      outline: 2px solid var(--st-cms-brand-azure);
      outline-offset: 2px;
    }

    .done,
    .copy {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 44px;
      padding: 0 24px;
      border: 1px solid var(--st-cms-primary-200);
      border-radius: var(--st-radius-full);
      background: var(--st-color-surface);
      color: var(--st-cms-accent-text, var(--st-cms-brand-navy));
      font: inherit;
      font-weight: var(--st-font-weight-semibold);
      cursor: pointer;
    }

    @media (max-width: 600px) {
      .panel {
        padding: 24px;
      }
    }
  `;

  /** Heading of the dialog (an `<h2>`, named by the dialog). */
  @property({ type: String })
  title = '';

  @property({ type: String })
  subtitle = '';

  /** The radio cards for the kind of request. */
  @property({ attribute: false })
  options: QuoteOption[] = [];

  @property({ type: String, attribute: 'options-label' })
  optionsLabel = 'Choose an option';

  @property({ type: String, attribute: 'name-label' })
  nameLabel = 'Name';

  @property({ type: String, attribute: 'name-placeholder' })
  namePlaceholder = '';

  @property({ type: String, attribute: 'email-label' })
  emailLabel = 'Email';

  @property({ type: String, attribute: 'email-placeholder' })
  emailPlaceholder = '';

  @property({ type: String, attribute: 'company-label' })
  companyLabel = 'Company';

  @property({ type: String, attribute: 'company-placeholder' })
  companyPlaceholder = '';

  @property({ type: String, attribute: 'count-label' })
  countLabel = 'Number of users';

  @property({ type: String, attribute: 'count-placeholder' })
  countPlaceholder = '';

  /** Label of the optional message box. "(optional)" is appended. */
  @property({ type: String, attribute: 'message-label' })
  messageLabel = 'Message';

  @property({ type: String, attribute: 'message-placeholder' })
  messagePlaceholder = '';

  @property({ type: String, attribute: 'consent-label' })
  consentLabel = 'I agree to be contacted about this request.';

  @property({ type: String, attribute: 'submit-label' })
  submitLabel = 'Send request';

  @property({ type: String, attribute: 'success-title' })
  successTitle = 'Thank you';

  /** Shown after submitting. `{option}` is replaced with the chosen option's label. */
  @property({ type: String, attribute: 'success-text' })
  successText = '';

  @property({ type: String, attribute: 'close-label' })
  closeLabel = 'Close';

  /** Recipient of the request e-mail. Without it, submitting opens no e-mail. */
  @property({ type: String })
  mailto = '';

  /** Subject of the request e-mail. `{option}`, `{company}` and `{name}` are filled in. */
  @property({ type: String })
  subject = 'Quote request';

  /** Shown under the success text when `mailto` is set. `{email}` becomes the address as a link. Empty hides it. */
  @property({ type: String, attribute: 'mailto-note' })
  mailtoNote = '';

  @property({ type: String, attribute: 'copy-label' })
  copyLabel = 'Copy address';

  @property({ type: String, attribute: 'copied-label' })
  copiedLabel = 'Address copied';

  @state() private selected = '';
  @state() private copied = false;
  @state() private submitted = false;
  @state() private errors: Partial<Record<FieldName, string>> = {};
  @state() private submittedOption = '';

  @query('dialog') private dialogEl?: HTMLDialogElement;
  @query('form') private formEl?: HTMLFormElement;

  private trigger: HTMLElement | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener(QUOTE_OPEN_EVENT, this.onOpenRequest);
  }

  disconnectedCallback(): void {
    window.removeEventListener(QUOTE_OPEN_EVENT, this.onOpenRequest);
    setModalOpen(this, false);
    super.disconnectedCallback();
  }

  /** Opens for `st-quote-open` events aimed at this dialog's `id`. */
  private onOpenRequest = (event: Event): void => {
    const detail = (event as CustomEvent<QuoteOpenEventDetail>).detail;
    if (!detail || !this.id || detail.dialog !== this.id) return;
    this.trigger = detail.trigger ?? null;
    const known = this.options.some(option => option.id === detail.option);
    this.selected = known ? (detail.option as string) : (this.options[0]?.id ?? '');
    this.submitted = false;
    this.copied = false;
    this.errors = {};
    void this.open();
  };

  /** Renders the reset form first, so every open starts empty, then shows the modal. */
  private async open(): Promise<void> {
    await this.updateComplete;
    this.formEl?.reset();
    if (this.dialogEl && !this.dialogEl.open) {
      this.dialogEl.showModal();
      setModalOpen(this, true);
    }
    this.renderRoot.querySelector<HTMLElement>('input')?.focus();
  }

  private close(): void {
    this.dialogEl?.close();
  }

  /** Runs on every close (Esc, the close button, the backdrop): focus goes back to the opener. */
  private onDialogClose(): void {
    // The close event is queued, so a quick reopen may already have shown the dialog again.
    if (!this.dialogEl?.open) setModalOpen(this, false);
    const trigger = this.trigger;
    this.trigger = null;
    trigger?.focus();
  }

  private onBackdropClick(event: MouseEvent): void {
    if (event.target === this.dialogEl) this.close();
  }

  private fieldValue(form: HTMLFormElement, name: string): string {
    const field = form.elements.namedItem(name);
    return field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement ? field.value.trim() : '';
  }

  private validate(form: HTMLFormElement): Partial<Record<FieldName, string>> {
    const errors: Partial<Record<FieldName, string>> = {};
    const check = (name: FieldName, label: string, emailCheck = false) => {
      const field = form.elements.namedItem(name);
      if (!(field instanceof HTMLInputElement)) return;
      const blank = name !== 'consent' && field.value.trim() === '';
      if (field.validity.valueMissing || blank) errors[name] = name === 'consent' ? 'Please accept to continue.' : `${label} is required.`;
      else if (emailCheck && field.validity.typeMismatch) errors[name] = 'Enter a valid email address.';
    };
    check('name', this.nameLabel);
    check('email', this.emailLabel, true);
    check('company', this.companyLabel);
    if (this.consentLabel) check('consent', this.consentLabel);
    return errors;
  }

  private onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const errors = this.validate(form);
    this.errors = errors;
    const firstInvalid = (['name', 'email', 'company', 'consent'] as FieldName[]).find(name => errors[name]);
    if (firstInvalid) {
      this.renderRoot.querySelector<HTMLElement>(`#quote-${firstInvalid}`)?.focus();
      return;
    }

    const values = {
      name: this.fieldValue(form, 'name'),
      email: this.fieldValue(form, 'email'),
      company: this.fieldValue(form, 'company'),
      count: this.fieldValue(form, 'count'),
      message: this.fieldValue(form, 'message'),
      consent: (form.elements.namedItem('consent') as HTMLInputElement | null)?.checked ?? false
    };
    const option = this.options.find(item => item.id === this.selected);
    const optionLabel = option?.label ?? this.selected;

    if (this.mailto) {
      window.location.href = buildQuoteMailto({
        to: this.mailto,
        subject: fillTemplate(this.subject, {
          option: option?.subjectLabel || optionLabel,
          company: values.company,
          name: values.name
        }),
        optionLabel,
        fields: [
          { label: this.nameLabel, value: values.name },
          { label: this.emailLabel, value: values.email },
          { label: this.companyLabel, value: values.company },
          { label: this.countLabel, value: values.count },
          { label: this.messageLabel, value: values.message }
        ]
      });
    }

    this.submittedOption = optionLabel;
    this.submitted = true;
    this.dispatchEvent(
      new CustomEvent<QuoteSubmitEventDetail>('quote-submit', {
        detail: { option: this.selected, ...values },
        bubbles: true,
        composed: true
      })
    );
    // The form (and the focused submit button) is replaced by the success state: keep focus in the dialog.
    void this.updateComplete.then(() => this.renderRoot.querySelector<HTMLElement>('.done')?.focus());
  }

  private renderField(
    name: FieldName | 'count',
    label: string,
    extra: { required?: boolean; autocomplete?: string; placeholder?: string; inputmode?: string; type?: string } = {}
  ) {
    const error = name === 'count' ? undefined : this.errors[name];
    return html`<div class="field">
      <label class="label" for="quote-${name}">${label}${extra.required ? html`<span aria-hidden="true"> *</span>` : nothing}</label>
      <input
        class="input"
        id="quote-${name}"
        name=${name}
        type=${extra.type ?? 'text'}
        part="input"
        autocomplete=${extra.autocomplete ?? 'off'}
        inputmode=${extra.inputmode ?? nothing}
        placeholder=${extra.placeholder || nothing}
        ?required=${extra.required}
        aria-invalid=${error ? 'true' : 'false'}
        aria-describedby=${error ? `quote-${name}-error` : nothing}
      />
      ${error ? html`<p class="error" id="quote-${name}-error">${error}</p>` : nothing}
    </div>`;
  }

  /** One sentence listing every failing field, for the live region ("" when valid). */
  private errorSummary(): string {
    const messages = (['name', 'email', 'company', 'consent'] as FieldName[])
      .map(name => this.errors[name])
      .filter((message): message is string => Boolean(message));
    if (messages.length === 0) return '';
    const count = messages.length;
    return `Please fix ${count} ${count === 1 ? 'field' : 'fields'}: ${messages.join(' ')}`;
  }

  private renderForm() {
    const consentError = this.errors.consent;
    return html`<form part="form" novalidate @submit=${this.onSubmit}>
      <div class="sr-only" aria-live="polite">${this.errorSummary()}</div>
      <fieldset class="options">
        <legend class="legend">${this.optionsLabel}</legend>
        <div class="option-list">
          ${this.options.map(
            option => html`<label class="option ${this.selected === option.id ? 'selected' : ''}">
              <input
                type="radio"
                name="option"
                value=${option.id}
                ?checked=${this.selected === option.id}
                @change=${() => (this.selected = option.id)}
              />
              <span class="option-body">
                <span class="option-label">${option.label}</span>
                ${option.hint ? html`<span class="option-hint">${option.hint}</span>` : nothing}
              </span>
            </label>`
          )}
        </div>
      </fieldset>
      <div class="fields">
        ${this.renderField('name', this.nameLabel, { required: true, autocomplete: 'name', placeholder: this.namePlaceholder })}
        ${this.renderField('email', this.emailLabel, { required: true, autocomplete: 'email', type: 'email', placeholder: this.emailPlaceholder })}
        ${this.renderField('company', this.companyLabel, { required: true, autocomplete: 'organization', placeholder: this.companyPlaceholder })}
        ${this.renderField('count', this.countLabel, { inputmode: 'numeric', placeholder: this.countPlaceholder })}
      </div>
      <div class="field">
        <label class="label" for="quote-message">${this.messageLabel} <span class="optional">(optional)</span></label>
        <textarea class="input" id="quote-message" name="message" rows="3" placeholder=${this.messagePlaceholder || nothing}></textarea>
      </div>
      ${this.consentLabel ? this.renderConsent(consentError) : nothing}
      <button class="submit" part="submit" type="submit">${this.submitLabel}</button>
    </form>`;
  }

  private renderConsent(consentError: string | undefined) {
    return html`<div class="field">
        <label class="consent">
          <input
            type="checkbox"
            id="quote-consent"
            name="consent"
            required
            aria-invalid=${consentError ? 'true' : 'false'}
            aria-describedby=${consentError ? 'quote-consent-error' : nothing}
          />
          <span>${this.consentLabel}<span aria-hidden="true"> *</span></span>
        </label>
        ${consentError ? html`<p class="error" id="quote-consent-error">${consentError}</p>` : nothing}
      </div>`;
  }

  private async copyAddress(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.mailto);
      this.copied = true;
    } catch {
      // Clipboard blocked: the address is still shown as a link to select by hand.
    }
  }

  /** The mailto note with `{email}` as a link to the address. */
  private renderMailtoNote() {
    if (!this.mailto || !this.mailtoNote) return nothing;
    const [before, ...rest] = this.mailtoNote.split('{email}');
    const link = html`<a href="mailto:${this.mailto}">${this.mailto}</a>`;
    return html`<p class="mailto-note" part="mailto-note">
      ${before}${rest.length ? html`${link}${rest.join(this.mailto)}` : nothing}
    </p>`;
  }

  private renderSuccess() {
    const showCopy = Boolean(this.mailto && this.mailtoNote);
    return html`<div class="success" role="status">
      <span class="success-icon" aria-hidden="true">${SUCCESS_ICON}</span>
      <h3 class="success-title">${this.successTitle}</h3>
      <p class="success-text">${this.successText.replaceAll('{option}', this.submittedOption)}</p>
      ${this.renderMailtoNote()}
      <div class="success-actions">
        ${showCopy
          ? html`<button class="copy" part="copy" type="button" @click=${this.copyAddress}>
              ${this.copied ? this.copiedLabel : this.copyLabel}
            </button>`
          : nothing}
        <button class="done" part="close" type="button" @click=${this.close}>${this.closeLabel}</button>
      </div>
    </div>`;
  }

  render() {
    return html`
      <dialog
        part="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-title"
        @close=${this.onDialogClose}
        @click=${this.onBackdropClick}
      >
        <div class="panel">
          <div class="header">
            <div class="heading">
              <h2 class="title" id="quote-title">${this.title}</h2>
              ${this.subtitle ? html`<p class="subtitle">${this.subtitle}</p>` : nothing}
            </div>
            <button class="close" part="close" type="button" aria-label=${this.closeLabel} @click=${this.close}>
              ${CLOSE_ICON}
            </button>
          </div>
          ${this.submitted ? this.renderSuccess() : this.renderForm()}
        </div>
      </dialog>
    `;
  }
}
