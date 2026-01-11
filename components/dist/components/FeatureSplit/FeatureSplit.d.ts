import { default as React } from 'react';
export interface FeatureSplitItem {
    icon?: string;
    title: string;
    description: string;
}
export interface FeatureSplitProps {
    title: string;
    description?: string;
    items?: FeatureSplitItem[];
    image: {
        src: string;
        alt: string;
    };
    imagePosition?: 'left' | 'right' | 'top';
    className?: string;
    primaryActionLabel?: string;
    primaryActionHref?: string;
}
export declare const FeatureSplit: React.FC<FeatureSplitProps>;
