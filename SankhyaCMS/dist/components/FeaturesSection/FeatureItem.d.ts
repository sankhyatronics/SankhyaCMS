import { default as React } from 'react';
export interface FeatureItemProps {
    icon: string;
    title: string;
    description: string;
    url?: string;
    featureLinkText?: string;
    className?: string;
}
export declare const FeatureItem: React.FC<FeatureItemProps>;
