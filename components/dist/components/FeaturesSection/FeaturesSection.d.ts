import { default as React } from 'react';
import { FeatureItemProps } from './FeatureItem';
export interface FeaturesSectionProps {
    title: string;
    subtitle?: string;
    features?: FeatureItemProps[];
    children?: React.ReactNode;
    className?: string;
    columns?: number;
    featureLinkText?: string;
}
export declare const FeaturesSection: React.FC<FeaturesSectionProps>;
