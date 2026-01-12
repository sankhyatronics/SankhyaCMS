import React from 'react';
import './FeatureSplit.css';
import { Icon } from '@iconify/react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import { SectionProps, ActionableProps } from '../Common/BaseComponent.interfaces';

export interface FeatureSplitItem {
    icon?: string;
    title: string;
    description: string;
}

export interface FeatureSplitProps extends SectionProps, ActionableProps {
    items?: FeatureSplitItem[];
    image: {
        imageSrc: string;
        alt: string;
    };
    imagePosition?: 'left' | 'right' | 'top';
}

export const FeatureSplit: React.FC<FeatureSplitProps> = ({
    title,
    subtitle,
    items = [],
    image,
    imagePosition = 'right',
    className = '',
    actionLabel,
    href,
}) => {
    return (
        <section className={`feature-split-section ${className} image-${imagePosition}`}>
            <div className="feature-split-container">
                <div className="feature-split-content">
                    <div className="section-title feature-split-title">{title}</div>

                    {subtitle && (
                        <div className="feature-split-description">
                            <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                                {subtitle}
                            </ReactMarkdown>
                        </div>
                    )}

                    {items && items.length > 0 && (
                        <div className="feature-split-list">
                            {items.map((item, index) => (
                                <div key={index} className="feature-split-item">
                                    {item.icon && (
                                        <div className="feature-split-icon-wrapper">
                                            <Icon icon={item.icon} width="24" height="24" />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="card-title feature-split-item-title">{item.title}</h3>
                                        <div className="feature-split-item-description">
                                            <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                                                {item.description}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {actionLabel && href && (
                        <div className="feature-split-actions">
                            <button
                                onClick={() => window.location.href = href}
                            >
                                {actionLabel}
                            </button>
                        </div>
                    )}
                </div>

                <div className="feature-split-image-wrapper">
                    <img src={image.imageSrc} alt={image.alt} className="feature-split-image" />
                </div>
            </div>
        </section>
    );
};


