import { default as React } from 'react';
export interface CTASectionProps {
    title: string;
    description?: string;
    primaryActionLabel?: string;
    secondaryActionLabel?: string;
    onPrimaryClick?: () => void;
    onSecondaryClick?: () => void;
    className?: string;
    backgroundImage?: string;
}
export declare const CTASection: React.FC<CTASectionProps>;
