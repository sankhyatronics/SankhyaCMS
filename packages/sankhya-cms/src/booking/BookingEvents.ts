/*
 * Events of `st-booking`. They bubble and are composed, and none of them carries personal data (no name,
 * e-mail address, phone number or notes) or the booking reference, which is the only key to the booking.
 */

/** Fired on `st-booking` once a new appointment is booked. Detail `{ serviceId, start }`. Bubbles and is composed. */
export const BOOKING_CREATED_EVENT = 'st-booking-created';

/** Fired on `st-booking` once an appointment is moved. Detail `{ serviceId, start }` (the new start). Bubbles and is composed. */
export const BOOKING_RESCHEDULED_EVENT = 'st-booking-rescheduled';

/** Fired on `st-booking` once an appointment is cancelled. Detail `{ serviceId }`. Bubbles and is composed. */
export const BOOKING_CANCELLED_EVENT = 'st-booking-cancelled';

/** Fired on `st-booking` when a call was not accepted. Detail `{ kind }`. Bubbles and is composed. */
export const BOOKING_ERROR_EVENT = 'st-booking-error';

/**
 * Why a call was not accepted: `validation` (the server rejected a field), `slot_taken` (someone else took
 * the time), `too_late` (the appointment has started or is too close to change), `not_found` (no such
 * booking or service), `rate_limited` (too many requests) or `unavailable` (the API could not be reached,
 * is switched off, or failed).
 */
export type BookingErrorKind = 'validation' | 'slot_taken' | 'too_late' | 'not_found' | 'rate_limited' | 'unavailable';

export interface BookingCreatedEventDetail {
  serviceId: string;
  /** RFC 3339 UTC instant. */
  start: string;
}

export interface BookingRescheduledEventDetail {
  serviceId: string;
  /** RFC 3339 UTC instant of the new time. */
  start: string;
}

export interface BookingCancelledEventDetail {
  serviceId: string;
}

export interface BookingErrorEventDetail {
  kind: BookingErrorKind;
}
