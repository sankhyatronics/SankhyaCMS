export interface SelectChangedEventDetail {
  value: string;
}

export interface SelectOption {
  value: string;
  label: string;
  /** Optional web URL this option points to (e.g. a SharePoint library) — set when a consumer wants to link out to it, such as a breadcrumb's first crumb. */
  url?: string;
}
