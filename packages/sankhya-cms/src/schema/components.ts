/**
 * The JSON `type` of every base component, and the Lit element that renders it.
 * This is the contract page JSON is written against — renderers (React, or any other binding)
 * map each `type` to their own component for that element.
 */
export const componentTags = {
    BentoGrid: 'st-bento-grid',
    Card: 'st-card',
    AttentionPanel: 'st-attention-panel',
    BarChart: 'st-bar-chart',
    Carousel: 'st-carousel',
    Chip: 'st-chip',
    ContentBlock: 'st-content-block',
    CookieConsent: 'st-cookie-consent',
    DateTile: 'st-date-tile',
    Dropdown: 'st-dropdown',
    FeatureItem: 'st-feature-item',
    FeatureSplit: 'st-feature-split',
    FeaturesSection: 'st-features-section',
    Footer: 'st-footer',
    Header: 'st-header',
    Hero: 'st-hero',
    IconButton: 'st-icon-button',
    ItemsAccordion: 'st-items-accordion',
    KpiCard: 'st-kpi-card',
    MegaMenu: 'st-mega-menu',
    MegaMenuColumn: 'st-mega-menu-column',
    MegaMenuFeature: 'st-mega-menu-feature',
    MenuGrid: 'st-menu-grid',
    MenuGridItem: 'st-menu-grid-item',
    MenuItem: 'st-menu-item',
    PromoBanner: 'st-promo-banner',
    SegmentedControl: 'st-segmented-control',
    Section: 'st-section',
    Select: 'st-select',
    Stats: 'st-stats',
    Testimonials: 'st-testimonials'
} as const;

/** Every `type` the base set knows. */
export type ComponentType = keyof typeof componentTags;

export function isBaseComponentType(type: string): type is ComponentType {
    return Object.hasOwn(componentTags, type);
}
