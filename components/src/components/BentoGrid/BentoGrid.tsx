import React from 'react';
import './BentoGrid.css';
import { Icon } from '@iconify/react';

export interface BentoGridItem {
    title: string;
    description?: string;
    icon?: string;
    image?: {
        src: string;
        alt: string;
    };
    colSpan?: 1 | 2 | 3 | 4;
    rowSpan?: 1 | 2;
    href?: string;
    className?: string;
}

export interface BentoGridProps {
    title?: string;
    subtitle?: string;
    items: BentoGridItem[];
    className?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({
    title,
    subtitle,
    items,
    className = '',
}) => {
    return (
        <section className={`bento-grid-section ${className}`}>
            <div className="bento-grid-container">
                {(title || subtitle) && (
                    <div className="bento-grid-header">
                        {title && <h2 className="bento-grid-title">{title}</h2>}
                        {subtitle && <p className="bento-grid-subtitle">{subtitle}</p>}
                    </div>
                )}

                <div className="bento-grid">
                    {items.map((item, index) => {
                        const colSpanClass = item.colSpan ? `col-span-${item.colSpan}` : 'col-span-1';
                        const rowSpanClass = item.rowSpan ? `row-span-${item.rowSpan}` : 'row-span-1';

                        const ContentWrapper = item.href ? 'a' : 'div';
                        const wrapperProps = item.href ? { href: item.href, className: `bento-card ${colSpanClass} ${rowSpanClass} ${item.className || ''} clickable` } : { className: `bento-card ${colSpanClass} ${rowSpanClass} ${item.className || ''}` };

                        return (
                            <ContentWrapper key={index} {...wrapperProps}>
                                {item.image && (
                                    <div className="bento-card-image-wrapper">
                                        <img src={item.image.src} alt={item.image.alt} className="bento-card-image" />
                                    </div>
                                )}
                                <div className="bento-card-content">
                                    {item.icon && (
                                        <div className="bento-card-icon">
                                            <Icon icon={item.icon} width="24" height="24" />
                                        </div>
                                    )}
                                    <div className="bento-card-text">
                                        <h3 className="bento-card-title">{item.title}</h3>
                                        {item.description && <p className="bento-card-description">{item.description}</p>}
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


