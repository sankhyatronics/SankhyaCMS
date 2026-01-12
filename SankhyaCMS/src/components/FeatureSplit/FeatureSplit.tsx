import React from 'react';
import './FeatureSplit.css';
import { Icon } from '@iconify/react';
import { Button } from '../Button/Button';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

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

export const FeatureSplit: React.FC<FeatureSplitProps> = ({
    title,
    description,
    items = [],
    image,
    imagePosition = 'right',
    className = '',
    primaryActionLabel,
    primaryActionHref,
}) => {
    return (
        <section className={`feature-split-section ${className} image-${imagePosition}`}>
            <div className="feature-split-container">
                <div className="feature-split-content">
                    <div className="feature-split-title">{title}</div>

                    {description && (
                        <div className="feature-split-description">
                            <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                                {description}
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
                                        <h3 className="feature-split-item-title">{item.title}</h3>
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

                    {primaryActionLabel && primaryActionHref && (
                        <div className="feature-split-actions">
                            <Button
                                variant="primary"
                                onClick={() => window.location.href = primaryActionHref}
                            >
                                {primaryActionLabel}
                            </Button>
                        </div>
                    )}
                </div>

                <div className="feature-split-image-wrapper">
                    <img src={image.src} alt={image.alt} className="feature-split-image" />
                </div>
            </div>
        </section>
    );
};


