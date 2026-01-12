import React from 'react';
import './FeaturesSection.css';
import '../Common/Common.css';

import { FeatureItem, FeatureItemProps } from './FeatureItem';

import { SectionProps, ActionableProps } from '../Common/BaseComponent.interfaces';

export interface FeaturesSectionProps extends SectionProps, ActionableProps {
    items?: FeatureItemProps[];
    children?: React.ReactNode;
    columns?: number;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
    title,
    subtitle,
    items,
    children,
    className = '',
    columns,
    actionLabel = 'Learn more',
    inverted = false,
}) => {
    const gridStyle = columns ? { '--features-columns': columns } as React.CSSProperties : {};

    return (
        <section className={`features-section ${inverted ? 'theme-inverted' : ''} ${className}`}>
            <div className="features-container">
                <div className="features-header">
                    <div className="section-title features-title">{title}</div>
                    {subtitle && <div className="section-subtitle features-subtitle">{subtitle}</div>}
                </div>

                <div className="features-grid" style={gridStyle}>
                    {children}
                    {items && items.map((item, index) => (
                        <FeatureItem key={index} {...item} actionLabel={actionLabel} inverted={inverted} />
                    ))}
                </div>
            </div>
        </section>
    );
};
