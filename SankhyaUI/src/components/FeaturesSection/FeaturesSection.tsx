import React from 'react';
import './FeaturesSection.css';
import '../Common/Common.css';

import { FeatureItem, FeatureItemProps } from './FeatureItem';

export interface FeaturesSectionProps {
    title: string;
    subtitle?: string;
    features?: FeatureItemProps[];
    children?: React.ReactNode;
    className?: string;
    columns?: number;
    featureLinkText?: string;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
    title,
    subtitle,
    features,
    children,
    className = '',
    columns,
    featureLinkText = 'Learn more',
}) => {
    const gridStyle = columns ? { '--features-columns': columns } as React.CSSProperties : {};

    return (
        <section className={`features-section ${className}`}>
            <div className="features-container">
                <div className="features-header">
                    <div className="features-title">{title}</div>
                    {subtitle && <div className="features-subtitle">{subtitle}</div>}
                </div>

                <div className="features-grid" style={gridStyle}>
                    {children}
                    {features && features.map((feature, index) => (
                        <FeatureItem key={index} {...feature} featureLinkText={featureLinkText} />
                    ))}
                </div>
            </div>
        </section>
    );
};

