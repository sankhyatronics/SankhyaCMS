/**
 * React wrappers over the Lit `st-*` elements from `@sankhyatronics/sankhya-cms`.
 *
 * Every base component is implemented once, in Lit. This file only (a) turns each element into a
 * React component with `@lit/react`'s `createComponent` — properties set as properties, events as
 * `onXxx` props — and (b) adapts the handful of React-flavoured props the JSON content uses
 * (`icon` strings, `isActive`, `ariaLabel`, `menuBar`/`utilityButtons`, ...) to the elements'
 * slots/properties. No UI logic lives here.
 *
 * Elements that link somewhere emit a cancelable select event; when rendered inside a react-router
 * `<Router>`, internal hrefs are routed with `navigate()` instead of reloading the page.
 */
import * as React from 'react';
import { createComponent } from '@lit/react';
import type { EventName } from '@lit/react';
import { useInRouterContext, useLocation, useNavigate } from 'react-router';

import { AttentionPanel as AttentionPanelElement } from '@sankhyatronics/sankhya-cms/attention-panel';
import { BarChart as BarChartElement } from '@sankhyatronics/sankhya-cms/bar-chart';
import { BentoGrid as BentoGridElement } from '@sankhyatronics/sankhya-cms/bento-grid';
import { Card as CardElement } from '@sankhyatronics/sankhya-cms/card';
import { Carousel as CarouselElement } from '@sankhyatronics/sankhya-cms/carousel';
import { Chip as ChipElement } from '@sankhyatronics/sankhya-cms/chip';
import { ContentBlock as ContentBlockElement } from '@sankhyatronics/sankhya-cms/content-block';
import { CookieConsent as CookieConsentElement } from '@sankhyatronics/sankhya-cms/cookie-consent';
import type { CookieConsentEventDetail } from '@sankhyatronics/sankhya-cms/cookie-consent';
import { DateTile as DateTileElement } from '@sankhyatronics/sankhya-cms/date-tile';
import { Dropdown as DropdownElement } from '@sankhyatronics/sankhya-cms/dropdown';
import { FeatureSplit as FeatureSplitElement } from '@sankhyatronics/sankhya-cms/feature-split';
import type { FeatureSplitActionEventDetail } from '@sankhyatronics/sankhya-cms/feature-split';
import { FeatureItem as FeatureItemElement, FeaturesSection as FeaturesSectionElement } from '@sankhyatronics/sankhya-cms/features-section';
import { Footer as FooterElement } from '@sankhyatronics/sankhya-cms/footer';
import type { FooterLinkEventDetail } from '@sankhyatronics/sankhya-cms/footer';
import { Header as HeaderElement } from '@sankhyatronics/sankhya-cms/header';
import type { LanguageChangedEventDetail } from '@sankhyatronics/sankhya-cms/header';
import { Hero as HeroElement } from '@sankhyatronics/sankhya-cms/hero';
import type { HeroActionEventDetail } from '@sankhyatronics/sankhya-cms/hero';
import { IconButton as IconButtonElement } from '@sankhyatronics/sankhya-cms/icon-button';
import { ItemsAccordion as ItemsAccordionElement } from '@sankhyatronics/sankhya-cms/items-accordion';
import { KpiCard as KpiCardElement } from '@sankhyatronics/sankhya-cms/kpi-card';
import {
  MegaMenu as MegaMenuElement,
  MegaMenuColumn as MegaMenuColumnElement,
  MegaMenuFeature as MegaMenuFeatureElement
} from '@sankhyatronics/sankhya-cms/mega-menu';
import type { MegaMenuSelectEventDetail } from '@sankhyatronics/sankhya-cms/mega-menu';
import { MenuGrid as MenuGridElement } from '@sankhyatronics/sankhya-cms/menu-grid';
import { MenuGridItem as MenuGridItemElement } from '@sankhyatronics/sankhya-cms/menu-grid-item';
import type { MenuGridItemSelectEventDetail } from '@sankhyatronics/sankhya-cms/menu-grid-item';
import { MenuItem as MenuItemElement } from '@sankhyatronics/sankhya-cms/menu-item';
import type { MenuItemSelectEventDetail } from '@sankhyatronics/sankhya-cms/menu-item';
import { PromoBanner as PromoBannerElement } from '@sankhyatronics/sankhya-cms/promo-banner';
import { SegmentedControl as SegmentedControlElement } from '@sankhyatronics/sankhya-cms/segmented-control';
import type { SegmentChangeEventDetail } from '@sankhyatronics/sankhya-cms/segmented-control';
import { ScreenshotTour as ScreenshotTourElement } from '@sankhyatronics/sankhya-cms/screenshot-tour';
import { Section as SectionElement } from '@sankhyatronics/sankhya-cms/section';
import { Select as SelectElement } from '@sankhyatronics/sankhya-cms/select';
import type { SelectChangedEventDetail } from '@sankhyatronics/sankhya-cms/select';
import { Stats as StatsElement } from '@sankhyatronics/sankhya-cms/stats';
import { Steps as StepsElement } from '@sankhyatronics/sankhya-cms/steps';
import { TagStrip as TagStripElement } from '@sankhyatronics/sankhya-cms/tag-strip';
import { ProductNav as ProductNavElement } from '@sankhyatronics/sankhya-cms/product-nav';
import { PlanCards as PlanCardsElement } from '@sankhyatronics/sankhya-cms/plan-cards';
import { QuoteDialog as QuoteDialogElement } from '@sankhyatronics/sankhya-cms/quote-dialog';
import type { QuoteSubmitEventDetail } from '@sankhyatronics/sankhya-cms/quote-dialog';
import { ContactForm as ContactFormElement } from '@sankhyatronics/sankhya-cms/contact-form';
import type { ContactFormErrorEventDetail, ContactFormSentEventDetail, ContactFormSubmitEventDetail } from '@sankhyatronics/sankhya-cms/contact-form';
import { Booking as BookingElement } from '@sankhyatronics/sankhya-cms/booking';
import type {
  BookingCancelledEventDetail,
  BookingCreatedEventDetail,
  BookingErrorEventDetail,
  BookingRescheduledEventDetail
} from '@sankhyatronics/sankhya-cms/booking';
import { Flow as FlowElement } from '@sankhyatronics/sankhya-cms/flow';
import { Testimonials as TestimonialsElement } from '@sankhyatronics/sankhya-cms/testimonials';
import type { TestimonialsLinkEventDetail } from '@sankhyatronics/sankhya-cms/testimonials';

type Detail<T> = EventName<CustomEvent<T>>;

/* ---- plain wrappers: element properties/attributes map 1:1 ---- */

const StBentoGrid = createComponent({ react: React, tagName: 'st-bento-grid', elementClass: BentoGridElement });
export const ContentBlock = createComponent({ react: React, tagName: 'st-content-block', elementClass: ContentBlockElement });
const StFeatureItem = createComponent({ react: React, tagName: 'st-feature-item', elementClass: FeatureItemElement });
const StFeaturesSection = createComponent({ react: React, tagName: 'st-features-section', elementClass: FeaturesSectionElement });
export const ItemsAccordion = createComponent({ react: React, tagName: 'st-items-accordion', elementClass: ItemsAccordionElement });
export const MenuGrid = createComponent({ react: React, tagName: 'st-menu-grid', elementClass: MenuGridElement });
export const Stats = createComponent({ react: React, tagName: 'st-stats', elementClass: StatsElement });
export const Steps = createComponent({ react: React, tagName: 'st-steps', elementClass: StepsElement });
export const TagStrip = createComponent({ react: React, tagName: 'st-tag-strip', elementClass: TagStripElement });
export const Flow = createComponent({ react: React, tagName: 'st-flow', elementClass: FlowElement });
export const PlanCards = createComponent({ react: React, tagName: 'st-plan-cards', elementClass: PlanCardsElement });
export const QuoteDialog = createComponent({
  react: React,
  tagName: 'st-quote-dialog',
  elementClass: QuoteDialogElement,
  events: { onQuoteSubmit: 'quote-submit' as Detail<QuoteSubmitEventDetail> }
});
export const ContactForm = createComponent({
  react: React,
  tagName: 'st-contact-form',
  elementClass: ContactFormElement,
  events: {
    onSubmitted: 'st-contact-form-submit' as Detail<ContactFormSubmitEventDetail>,
    onSent: 'st-contact-form-sent' as Detail<ContactFormSentEventDetail>,
    onError: 'st-contact-form-error' as Detail<ContactFormErrorEventDetail>
  }
});
export const Booking = createComponent({
  react: React,
  tagName: 'st-booking',
  elementClass: BookingElement,
  events: {
    onCreated: 'st-booking-created' as Detail<BookingCreatedEventDetail>,
    onRescheduled: 'st-booking-rescheduled' as Detail<BookingRescheduledEventDetail>,
    onCancelled: 'st-booking-cancelled' as Detail<BookingCancelledEventDetail>,
    onError: 'st-booking-error' as Detail<BookingErrorEventDetail>
  }
});
const StProductNav =createComponent({ react: React, tagName: 'st-product-nav', elementClass: ProductNavElement });
export const Chip = createComponent({ react: React, tagName: 'st-chip', elementClass: ChipElement });
export const KpiCard = createComponent({ react: React, tagName: 'st-kpi-card', elementClass: KpiCardElement });
export const DateTile = createComponent({ react: React, tagName: 'st-date-tile', elementClass: DateTileElement });
export const AttentionPanel = createComponent({ react: React, tagName: 'st-attention-panel', elementClass: AttentionPanelElement });
export const BarChart = createComponent({ react: React, tagName: 'st-bar-chart', elementClass: BarChartElement });

const StSegmentedControl = createComponent({
  react: React,
  tagName: 'st-segmented-control',
  elementClass: SegmentedControlElement,
  events: { onSegmentChange: 'segment-change' as Detail<SegmentChangeEventDetail> }
});
export const SegmentedControl = StSegmentedControl;
export const Section = createComponent({ react: React, tagName: 'st-section', elementClass: SectionElement });
export const Carousel = createComponent({ react: React, tagName: 'st-carousel', elementClass: CarouselElement });
export const ScreenshotTour = createComponent({ react: React, tagName: 'st-screenshot-tour', elementClass: ScreenshotTourElement });

/* ---- SPA navigation ---- */

type NavEvent = CustomEvent<{ href: string }>;

/** A link the router should handle: no scheme, not protocol-relative, not an in-page anchor. */
export function isInternalHref(href: string | undefined): href is string {
  return !!href && !/^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(href);
}

/**
 * Routes a cancelable select event: an internal `href` goes through `navigate` (no full reload),
 * unless a listener already cancelled the event. The `preventDefault()` call stops the element's
 * own click from following the link, so the element never reloads the page for an internal link.
 * External URLs and `#anchors` are left alone and the browser follows them.
 */
export function routeSelect(
  event: { readonly defaultPrevented: boolean; readonly detail: { href: string }; preventDefault(): void },
  navigate: (to: string) => void
): void {
  const href = event.detail.href;
  if (!event.defaultPrevented && isInternalHref(href)) {
    event.preventDefault();
    navigate(href);
  }
}

interface NavProps {
  user?: (event: NavEvent) => void;
  children: (handler: (event: NavEvent) => void) => React.ReactNode;
}

function RoutedNav({ user, children }: NavProps) {
  const navigate = useNavigate();
  return children((event: NavEvent) => {
    user?.(event);
    routeSelect(event, navigate);
  });
}

function PlainNav({ user, children }: NavProps) {
  return children((event: NavEvent) => user?.(event));
}

function Nav(props: NavProps) {
  return useInRouterContext() ? <RoutedNav {...props} /> : <PlainNav {...props} />;
}

/** Wraps `Wrapped` so its select event (`eventProp`) routes internal hrefs via react-router. */
function navigable<P>(Wrapped: React.ElementType, eventProp: string): React.FC<P> {
  return function Navigable(props: P) {
    const user = (props as Record<string, unknown>)[eventProp] as NavProps['user'];
    return <Nav user={user}>{handler => <Wrapped {...props} {...{ [eventProp]: handler }} />}</Nav>;
  };
}

/**
 * Routes clicks on the plain `<a href>` links inside an element through react-router. Those links
 * (card and feature-tile links) emit no event of their own, so the click is caught on the element
 * itself; the composed path still reaches the link inside the element's shadow root.
 */
function useRoutedClicks(ref: React.RefObject<HTMLElement | null>): void {
  const navigate = useNavigate();
  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.composedPath().find((node): node is HTMLAnchorElement => node instanceof HTMLAnchorElement);
      if (!anchor || (anchor.target && anchor.target !== '_self')) return;
      const href = anchor.getAttribute('href') ?? undefined;
      if (!isInternalHref(href)) return;
      event.preventDefault();
      navigate(href);
    };
    element.addEventListener('click', onClick);
    return () => element.removeEventListener('click', onClick);
  }, [navigate, ref]);
}

/** Wraps a Lit element whose plain links should route internal hrefs, inside a router. Outside one it renders as is. */
function routedClicks<P extends object>(Wrapped: React.ElementType): React.FC<P> {
  function Routed(props: P) {
    const ref = React.useRef<HTMLElement>(null);
    useRoutedClicks(ref);
    return <Wrapped {...props} ref={ref} />;
  }
  function Plain(props: P) {
    return <Wrapped {...props} />;
  }
  return function RoutedClicks(props: P) {
    return useInRouterContext() ? <Routed {...props} /> : <Plain {...props} />;
  };
}

export const BentoGrid = routedClicks<React.ComponentProps<typeof StBentoGrid>>(StBentoGrid);
export const FeatureItem = routedClicks<React.ComponentProps<typeof StFeatureItem>>(StFeatureItem);
export const FeaturesSection = routedClicks<React.ComponentProps<typeof StFeaturesSection>>(StFeaturesSection);
export const ProductNav = routedClicks<React.ComponentProps<typeof StProductNav>>(StProductNav);

/* ---- adapters ---- */

/** An iconify icon rendered into an element's `slot="icon"`. */
function iconSlot(icon?: string): React.ReactNode {
  return icon ? React.createElement('iconify-icon', { key: 'icon', slot: 'icon', icon }) : null;
}

const StHero = createComponent({
  react: React,
  tagName: 'st-hero',
  elementClass: HeroElement,
  events: { onAction: 'action' as Detail<HeroActionEventDetail> }
});
export const Hero = navigable<React.ComponentProps<typeof StHero>>(StHero, 'onAction');

const StPromoBanner = createComponent({
  react: React,
  tagName: 'st-promo-banner',
  elementClass: PromoBannerElement,
  events: { onAction: 'action' as Detail<HeroActionEventDetail> }
});
export const PromoBanner = navigable<React.ComponentProps<typeof StPromoBanner>>(StPromoBanner, 'onAction');

const StFeatureSplit = createComponent({
  react: React,
  tagName: 'st-feature-split',
  elementClass: FeatureSplitElement,
  events: { onAction: 'feature-split-action' as Detail<FeatureSplitActionEventDetail> }
});
export const FeatureSplit = navigable<React.ComponentProps<typeof StFeatureSplit>>(StFeatureSplit, 'onAction');

const StFooter = createComponent({
  react: React,
  tagName: 'st-footer',
  elementClass: FooterElement,
  events: { onLinkSelect: 'footer-link' as Detail<FooterLinkEventDetail> }
});
export const Footer = navigable<React.ComponentProps<typeof StFooter>>(StFooter, 'onLinkSelect');

const StTestimonials = createComponent({
  react: React,
  tagName: 'st-testimonials',
  elementClass: TestimonialsElement,
  events: { onLinkSelect: 'testimonials-link' as Detail<TestimonialsLinkEventDetail> }
});
export const Testimonials = navigable<React.ComponentProps<typeof StTestimonials>>(StTestimonials, 'onLinkSelect');

const StMenuItem = createComponent({
  react: React,
  tagName: 'st-menu-item',
  elementClass: MenuItemElement,
  events: { onSelect: 'menu-item-select' as Detail<MenuItemSelectEventDetail> }
});
const RoutedMenuItem = navigable<React.ComponentProps<typeof StMenuItem>>(StMenuItem, 'onSelect');

export interface MenuItemProps extends Omit<React.ComponentProps<typeof StMenuItem>, 'badge'> {
  /** Iconify icon name, rendered into the element's icon slot. */
  icon?: string;
  /** Alias of `active`. */
  isActive?: boolean;
  badge?: string | number;
}
export const MenuItem: React.FC<MenuItemProps> = ({ icon, isActive, badge, active, children, ...rest }) => (
  <RoutedMenuItem {...rest} active={active ?? isActive} badge={badge === undefined ? undefined : String(badge)}>
    {iconSlot(icon)}
    {children}
  </RoutedMenuItem>
);

const StMenuGridItem = createComponent({
  react: React,
  tagName: 'st-menu-grid-item',
  elementClass: MenuGridItemElement,
  events: { onSelect: 'menu-grid-item-select' as Detail<MenuGridItemSelectEventDetail> }
});
const RoutedMenuGridItem = navigable<React.ComponentProps<typeof StMenuGridItem>>(StMenuGridItem, 'onSelect');

export interface MenuGridItemProps extends React.ComponentProps<typeof StMenuGridItem> {
  /** Iconify icon name, rendered into the element's icon slot. */
  icon?: string;
}
export const MenuGridItem: React.FC<MenuGridItemProps> = ({ icon, children, ...rest }) => (
  <RoutedMenuGridItem {...rest}>
    {iconSlot(icon)}
    {children}
  </RoutedMenuGridItem>
);

const StMegaMenu = createComponent({ react: React, tagName: 'st-mega-menu', elementClass: MegaMenuElement });

const contentsStyle: React.CSSProperties = { display: 'contents' };

export interface MegaMenuProps extends React.ComponentProps<typeof StMegaMenu> {
  /** Nodes for the intro slot (`slot: "intro"` children) — quick links under the intro text. */
  intro?: React.ReactNode;
  /** Nodes for the featured slot (`slot: "featured"` children) — `MegaMenuFeature` cards. */
  featured?: React.ReactNode;
}
export const MegaMenu: React.FC<MegaMenuProps> = ({ intro, featured, children, ...rest }) => (
  <StMegaMenu {...rest}>
    {children}
    {intro ? (
      <div slot="intro" style={contentsStyle}>
        {intro}
      </div>
    ) : null}
    {featured ? (
      <div slot="featured" style={contentsStyle}>
        {featured}
      </div>
    ) : null}
  </StMegaMenu>
);

const StMegaMenuColumn = createComponent({
  react: React,
  tagName: 'st-mega-menu-column',
  elementClass: MegaMenuColumnElement,
  events: { onSelect: 'mega-menu-select' as Detail<MegaMenuSelectEventDetail> }
});
export const MegaMenuColumn = navigable<React.ComponentProps<typeof StMegaMenuColumn>>(StMegaMenuColumn, 'onSelect');

const StMegaMenuFeature = createComponent({
  react: React,
  tagName: 'st-mega-menu-feature',
  elementClass: MegaMenuFeatureElement,
  events: { onSelect: 'mega-menu-select' as Detail<MegaMenuSelectEventDetail> }
});
export const MegaMenuFeature = navigable<React.ComponentProps<typeof StMegaMenuFeature>>(StMegaMenuFeature, 'onSelect');

const StDropdown = createComponent({ react: React, tagName: 'st-dropdown', elementClass: DropdownElement });

export interface DropdownProps extends Omit<React.ComponentProps<typeof StDropdown>, 'title'> {
  /** Trigger text (the element's `label`). */
  title?: string;
  /** Iconify icon name, rendered into the trigger's icon slot. */
  icon?: string;
}
/** `className` styles the trigger, as it always has; the panel takes `itemGroupClassName`. */
export const Dropdown: React.FC<DropdownProps> = ({ title, icon, className, children, ...rest }) => (
  <StDropdown {...rest} label={title} triggerClassName={className}>
    {iconSlot(icon)}
    {children}
  </StDropdown>
);

const StIconButton = createComponent({ react: React, tagName: 'st-icon-button', elementClass: IconButtonElement });

export interface IconButtonProps extends React.ComponentProps<typeof StIconButton> {
  /** Iconify icon name. */
  icon?: string;
  /** Accessible name (the element's `label`). */
  ariaLabel?: string;
}
export const IconButton: React.FC<IconButtonProps> = ({ icon, ariaLabel, label, children, ...rest }) => (
  <StIconButton {...rest} label={label ?? ariaLabel}>
    {icon ? React.createElement('iconify-icon', { icon }) : null}
    {children}
  </StIconButton>
);

const StCard = createComponent({ react: React, tagName: 'st-card', elementClass: CardElement });
const PADDING = { sm: 'small', md: 'medium', lg: 'large' } as const;

export interface CardProps extends Omit<React.ComponentProps<typeof StCard>, 'padding'> {
  padding?: 'none' | 'small' | 'medium' | 'large' | keyof typeof PADDING;
}
export const Card: React.FC<CardProps> = ({ padding, ...rest }) => (
  <StCard {...rest} padding={padding && padding in PADDING ? PADDING[padding as keyof typeof PADDING] : (padding as 'none' | 'small' | 'medium' | 'large' | undefined)} />
);

const StCookieConsent = createComponent({
  react: React,
  tagName: 'st-cookie-consent',
  elementClass: CookieConsentElement,
  events: {
    onAccept: 'cookie-consent-accept' as Detail<CookieConsentEventDetail>,
    onRefuse: 'cookie-consent-refuse' as Detail<CookieConsentEventDetail>,
    onSave: 'cookie-consent-save' as Detail<CookieConsentEventDetail>
  }
});
export const CookieConsent = StCookieConsent;

const StHeader = createComponent({
  react: React,
  tagName: 'st-header',
  elementClass: HeaderElement,
  events: { onLanguageChange: 'language-change' as Detail<LanguageChangedEventDetail> }
});

const rowStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '0.25rem' };

export interface HeaderProps extends Omit<React.ComponentProps<typeof StHeader>, 'brandImageUrl'> {
  /** Logo image (the element's `brandImageUrl`). */
  imageSrc?: string;
  /** Nodes for the menu slot — `DynamicRenderer` puts a Header's default-slot children here. */
  menuBar?: React.ReactNode;
  /** Nodes for the utility slot (`slot: "utility"` children). */
  utilityButtons?: React.ReactNode;
  /**
   * Nodes for the context slot (`slot: "context"` children): the product sub-nav shown in the bar
   * once the page scrolls past its trigger (the element's `context-trigger`). Empty = no context mode.
   */
  contextNav?: React.ReactNode;
  /**
   * Path of the page being shown (the element's `currentPath`, attribute `current-path`). Inside a
   * react-router `<Router>` it defaults to the current location, so the nav link for the page is
   * marked current on every navigation.
   */
  currentPath?: string;
}

function HeaderBase({ imageSrc, menuBar, utilityButtons, contextNav, children, ...rest }: HeaderProps) {
  return (
    <StHeader {...rest} brandImageUrl={imageSrc}>
      {menuBar ? (
        <div slot="menu" style={rowStyle}>
          {menuBar}
        </div>
      ) : null}
      {utilityButtons ? (
        <div slot="utility" style={rowStyle}>
          {utilityButtons}
        </div>
      ) : null}
      {contextNav ? (
        <div slot="context" style={{ display: 'contents' }}>
          {contextNav}
        </div>
      ) : null}
      {children}
    </StHeader>
  );
}

function RouterHeader(props: HeaderProps) {
  const { pathname } = useLocation();
  return <HeaderBase {...props} currentPath={props.currentPath || pathname} />;
}

export const Header: React.FC<HeaderProps> = props => (useInRouterContext() ? <RouterHeader {...props} /> : <HeaderBase {...props} />);

const StSelect = createComponent({
  react: React,
  tagName: 'st-select',
  elementClass: SelectElement,
  events: { onSelectChange: 'select-change' as Detail<SelectChangedEventDetail> }
});

export interface SelectOptionInput {
  value: string;
  label?: string;
  /** Called when this option is chosen. */
  onClick?: () => void;
}
export interface SelectProps extends Omit<React.ComponentProps<typeof StSelect>, 'options' | 'onChange'> {
  options?: SelectOptionInput[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}
export const Select: React.FC<SelectProps> = ({ options = [], value, defaultValue, onChange, onSelectChange, ...rest }) => (
  <StSelect
    {...rest}
    options={options.map(option => ({ value: option.value, label: option.label ?? option.value }))}
    value={value ?? defaultValue}
    onSelectChange={event => {
      options.find(option => option.value === event.detail.value)?.onClick?.();
      onChange?.(event.detail.value);
      onSelectChange?.(event);
    }}
  />
);
