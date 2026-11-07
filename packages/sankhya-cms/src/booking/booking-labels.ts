/**
 * Every visible string of `st-booking`, in English. A page replaces the ones it wants through the element's
 * `labels` property (only the keys given are replaced). `{name}` placeholders are filled in by the component.
 * The text the server sends for a field is shown as it is sent; everything else comes from here.
 */
export interface BookingLabels {
  /* steps */
  stepService: string;
  stepTime: string;
  stepDetails: string;
  stepDone: string;
  stepsLabel: string;
  /* service */
  serviceHeading: string;
  staffLegend: string;
  anyStaff: string;
  /** `{minutes}` */
  duration: string;
  online: string;
  noServices: string;
  /* date and time */
  timeHeading: string;
  rescheduleHeading: string;
  previousMonth: string;
  nextMonth: string;
  /** `{date}` */
  timesHeading: string;
  /** `{zone}` */
  timeZoneNote: string;
  chooseDay: string;
  /** `{count}` and `{date}` */
  slotsAvailable: string;
  /** `{month}` */
  noSlots: string;
  loading: string;
  back: string;
  continue: string;
  confirmReschedule: string;
  /* details */
  detailsHeading: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  notesLabel: string;
  notesPlaceholder: string;
  /** `{count}` and `{max}` */
  notesCounter: string;
  consentLabel: string;
  requiredLabel: string;
  requiredNote: string;
  submit: string;
  sending: string;
  /* the booking */
  bookedHeading: string;
  bookingHeading: string;
  bookedNote: string;
  rescheduledNote: string;
  serviceLabel: string;
  whenLabel: string;
  manageLinkLabel: string;
  manageLinkHint: string;
  copyLink: string;
  linkCopied: string;
  reschedule: string;
  cancel: string;
  cancelConfirm: string;
  cancelYes: string;
  cancelNo: string;
  cancelledHeading: string;
  cancelledNote: string;
  bookAnother: string;
  /* problems */
  errorNote: string;
  retry: string;
  slotTakenNote: string;
  tooLateNote: string;
  notFoundNote: string;
  /** `{seconds}` */
  rateLimitedNote: string;
  rateLimitedGenericNote: string;
  validationNote: string;
}

export const DEFAULT_BOOKING_LABELS: BookingLabels = {
  stepService: 'Service',
  stepTime: 'Date and time',
  stepDetails: 'Your details',
  stepDone: 'Confirmation',
  stepsLabel: 'Booking steps',
  serviceHeading: 'Choose a service',
  staffLegend: 'Who would you like to see?',
  anyStaff: 'Any available',
  duration: '{minutes} min',
  online: 'Online meeting',
  noServices: 'No services can be booked online right now. Please try again later.',
  timeHeading: 'Pick a date and time',
  rescheduleHeading: 'Pick a new date and time',
  previousMonth: 'Previous month',
  nextMonth: 'Next month',
  timesHeading: 'Times on {date}',
  timeZoneNote: 'Times are shown in your time zone: {zone}.',
  chooseDay: 'Choose a date to see the available times.',
  slotsAvailable: '{count} times available on {date}.',
  noSlots: 'No times are available in {month}.',
  loading: 'Loading…',
  back: 'Back',
  continue: 'Continue',
  confirmReschedule: 'Confirm new time',
  detailsHeading: 'Your details',
  nameLabel: 'Full name',
  namePlaceholder: 'Your name',
  emailLabel: 'Email',
  emailPlaceholder: 'you@example.com',
  phoneLabel: 'Phone (optional)',
  notesLabel: 'Notes (optional)',
  notesPlaceholder: 'Anything we should know beforehand',
  notesCounter: '{count} / {max}',
  consentLabel: 'I agree that these details may be used to arrange and confirm my appointment.',
  requiredLabel: 'required',
  requiredNote: '* Required',
  submit: 'Book appointment',
  sending: 'Booking…',
  bookedHeading: 'Your appointment is booked',
  bookingHeading: 'Your appointment',
  bookedNote: 'Your appointment is booked.',
  rescheduledNote: 'Your appointment has been moved to the new time.',
  serviceLabel: 'Service',
  whenLabel: 'When',
  manageLinkLabel: 'Link to manage this appointment',
  manageLinkHint: 'Keep this link private. Anyone who has it can change or cancel your appointment.',
  copyLink: 'Copy link',
  linkCopied: 'Link copied.',
  reschedule: 'Reschedule',
  cancel: 'Cancel appointment',
  cancelConfirm: 'Cancel this appointment?',
  cancelYes: 'Yes, cancel it',
  cancelNo: 'Keep it',
  cancelledHeading: 'Your appointment is cancelled',
  cancelledNote: 'The appointment has been cancelled.',
  bookAnother: 'Book another appointment',
  errorNote: 'Sorry, the booking service could not be reached. Please try again later.',
  retry: 'Try again',
  slotTakenNote: 'That time has just been taken. Please choose another.',
  tooLateNote: 'This appointment can no longer be changed online. Please contact us.',
  notFoundNote: 'We could not find this appointment. It may have been cancelled, or the link is incomplete.',
  rateLimitedNote: 'Too many requests in a short time. Please wait {seconds} seconds and try again.',
  rateLimitedGenericNote: 'Too many requests in a short time. Please wait a little and try again.',
  validationNote: 'Please check the highlighted fields.'
};
