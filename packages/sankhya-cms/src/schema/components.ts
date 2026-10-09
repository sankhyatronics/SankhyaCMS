/**
 * The JSON `type` of every base component, and the Lit element that renders it.
 * This is the contract page JSON is written against — renderers (React, or any other binding)
 * map each `type` to their own component for that element.
 */
export const componentTags = {
    BentoGrid: 'st-bento-grid',
    Card: 'st-card',
    Carousel: 'st-carousel',
    ContentBlock: 'st-content-block',
    CookieConsent: 'st-cookie-consent',
    Dropdown: 'st-dropdown',
    FeatureItem: 'st-feature-item',
    FeatureSplit: 'st-feature-split',
    FeaturesSection: 'st-features-section',
    Footer: 'st-footer',
    Header: 'st-header',
    Hero: 'st-hero',
    IconButton: 'st-icon-button',
    ItemsAccordion: 'st-items-accordion',
    MenuGrid: 'st-menu-grid',
    MenuGridItem: 'st-menu-grid-item',
    MenuItem: 'st-menu-item',
    PromoBanner: 'st-promo-banner',
    Select: 'st-select',
    Stats: 'st-stats',
    Testimonials: 'st-testimonials'
} as const;

/** Every `type` the base set knows. */
export type ComponentType = keyof typeof componentTags;

export function isBaseComponentType(type: string): type is ComponentType {
    return Object.hasOwn(componentTags, type);
}
