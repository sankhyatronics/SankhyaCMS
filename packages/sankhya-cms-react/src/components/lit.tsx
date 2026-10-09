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
import { useInRouterContext, useNavigate } from 'react-router';

import { BentoGrid as BentoGridElement } from '@sankhyatronics/sankhya-cms/bento-grid';
import { Card as CardElement } from '@sankhyatronics/sankhya-cms/card';
import { Carousel as CarouselElement } from '@sankhyatronics/sankhya-cms/carousel';
import { ContentBlock as ContentBlockElement } from '@sankhyatronics/sankhya-cms/content-block';
import { CookieConsent as CookieConsentElement } from '@sankhyatronics/sankhya-cms/cookie-consent';
import type { CookieConsentEventDetail } from '@sankhyatronics/sankhya-cms/cookie-consent';
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
import { MenuGrid as MenuGridElement } from '@sankhyatronics/sankhya-cms/menu-grid';
import { MenuGridItem as MenuGridItemElement } from '@sankhyatronics/sankhya-cms/menu-grid-item';
import type { MenuGridItemSelectEventDetail } from '@sankhyatronics/sankhya-cms/menu-grid-item';
import { MenuItem as MenuItemElement } from '@sankhyatronics/sankhya-cms/menu-item';
import type { MenuItemSelectEventDetail } from '@sankhyatronics/sankhya-cms/menu-item';
import { PromoBanner as PromoBannerElement } from '@sankhyatronics/sankhya-cms/promo-banner';
import { Select as SelectElement } from '@sankhyatronics/sankhya-cms/select';
import type { SelectChangedEventDetail } from '@sankhyatronics/sankhya-cms/select';
import { Stats as StatsElement } from '@sankhyatronics/sankhya-cms/stats';
import { Testimonials as TestimonialsElement } from '@sankhyatronics/sankhya-cms/testimonials';

type Detail<T> = EventName<CustomEvent<T>>;

/* ---- plain wrappers: element properties/attributes map 1:1 ---- */

export const BentoGrid = createComponent({ react: React, tagName: 'st-bento-grid', elementClass: BentoGridElement });
export const ContentBlock = createComponent({ react: React, tagName: 'st-content-block', elementClass: ContentBlockElement });
export const FeatureItem = createComponent({ react: React, tagName: 'st-feature-item', elementClass: FeatureItemElement });
export const FeaturesSection = createComponent({ react: React, tagName: 'st-features-section', elementClass: FeaturesSectionElement });
export const ItemsAccordion = createComponent({ react: React, tagName: 'st-items-accordion', elementClass: ItemsAccordionElement });
export const MenuGrid = createComponent({ react: React, tagName: 'st-menu-grid', elementClass: MenuGridElement });
export const Stats = createComponent({ react: React, tagName: 'st-stats', elementClass: StatsElement });
export const Testimonials = createComponent({ react: React, tagName: 'st-testimonials', elementClass: TestimonialsElement });
export const Carousel = createComponent({ react: React, tagName: 'st-carousel', elementClass: CarouselElement });

/* ---- SPA navigation ---- */

type NavEvent = CustomEvent<{ href: string }>;

/** A link the router should handle: no scheme, not protocol-relative, not an in-page anchor. */
export function isInternalHref(href: string | undefined): href is string {
  return !!href && !/^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(href);
}

interface NavProps {
  user?: (event: NavEvent) => void;
  children: (handler: (event: NavEvent) => void) => React.ReactNode;
}

function RoutedNav({ user, children }: NavProps) {
  const navigate = useNavigate();
  return children((event: NavEvent) => {
    user?.(event);
    const href = event.detail.href;
    if (!event.defaultPrevented && isInternalHref(href)) {
      event.preventDefault();
      navigate(href);
    }
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
    onRefuse: 'cookie-consent-refuse' as Detail<CookieConsentEventDetail>
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
}
export const Header: React.FC<HeaderProps> = ({ imageSrc, menuBar, utilityButtons, children, ...rest }) => (
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
    {children}
  </StHeader>
);

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
