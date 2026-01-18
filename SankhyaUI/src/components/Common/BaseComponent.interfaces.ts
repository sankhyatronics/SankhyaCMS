/**
 * Base properties shared by ALL components.
 */
export interface BaseProps {
    id?: string;
    className?: string;
    inverted?: boolean;
}

/**
 * Properties shared by main sections/blocks (Hero, FeaturesSection, etc).
 */
export interface SectionProps extends BaseProps {
    title?: string;
    subtitle?: string;
}

/**
 * Properties for components that have a primary action/call-to-action.
 */
export interface ActionableProps {
    actionLabel?: string;
    href?: string;
    onAction?: () => void;
}
