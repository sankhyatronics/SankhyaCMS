import React from 'react';
import './BentoGrid.css';
import { Icon } from '@iconify/react';
import { BaseProps, SectionProps } from '../Common/BaseComponent.interfaces';

export interface BentoGridItem extends BaseProps {
    title: string;
    description?: string;
    icon?: string;
    image?: {
        imageSrc: string;
        alt: string;
    };
    colSpan?: 1 | 2 | 3 | 4;
    rowSpan?: 1 | 2;
    href?: string;
}

export interface BentoGridProps extends SectionProps {
    items: BentoGridItem[];
}

export const BentoGrid: React.FC<BentoGridProps> = ({
    title,
    subtitle,
    items,
    className = '',
    inverted = false,
}) => {
    return (
        <section className={`bento-grid-section ${inverted ? 'theme-inverted' : ''} ${className}`}>
            <div className="bento-grid-container">
                {(title || subtitle) && (
                    <div className="bento-grid-header">
                        {title && <h2 className="section-title bento-grid-title">{title}</h2>}
                        {subtitle && <p className="section-subtitle bento-grid-subtitle">{subtitle}</p>}
                    </div>
                )}

                <div className="bento-grid">
                    {items.map((item, index) => {
                        const colSpanClass = item.colSpan ? `col-span-${item.colSpan}` : 'col-span-1';
                        const rowSpanClass = item.rowSpan ? `row-span-${item.rowSpan}` : 'row-span-1';

                        const ContentWrapper = item.href ? 'a' : 'div';
                        const wrapperProps = item.href ? { href: item.href, className: `bento-card ${colSpanClass} ${rowSpanClass} ${item.className || ''} ${inverted ? 'theme-inverted' : ''} clickable` } : { className: `bento-card ${colSpanClass} ${rowSpanClass} ${item.className || ''} ${inverted ? 'theme-inverted' : ''}` };

                        return (
                            <ContentWrapper key={index} {...wrapperProps}>
                                {item.image && (
                                    <div className="bento-card-image-wrapper">
                                        <img src={item.image.imageSrc} alt={item.image.alt} className="bento-card-image" />
                                    </div>
                                )}
                                <div className="bento-card-content">
                                    {item.icon && (
                                        <div className="bento-card-icon">
                                            <Icon icon={item.icon} width="24" height="24" />
                                        </div>
                                    )}
                                    <div className="bento-card-text">
                                        <h3 className="card-title bento-card-title">{item.title}</h3>
                                        {item.description && <p className="card-description bento-card-description">{item.description}</p>}
                                    </div>
                                </div>
                            </ContentWrapper>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};


