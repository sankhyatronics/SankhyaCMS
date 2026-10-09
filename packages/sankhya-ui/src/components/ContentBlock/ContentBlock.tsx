import React from 'react';
import './ContentBlock.css';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import { SectionProps } from '../Common/BaseComponent.interfaces';
import { useMarkdown } from '../../hooks/useMarkdown';

export interface ContentBlockProps extends SectionProps {
    contentSrc?: string; // URL to Markdown file
    imageSrc?: string;
    imageAlt?: string;
    imageCaption?: string;
    className?: string;
    inverted?: boolean;
}

export const ContentBlock: React.FC<ContentBlockProps> = ({
    title,
    subtitle,
    contentSrc,
    className = '',
    imageSrc,
    imageAlt,
    imageCaption,
    inverted = false,
}) => {
    const { content, loading, error } = useMarkdown(contentSrc);

    return (
        <section className={`content-block-section ${inverted ? 'theme-inverted' : ''} ${className}`}>
            <div className="content-block-container">
                <div className="content-block-header">
                    {title && <div className="section-title content-block-title">{title}</div>}
                    {subtitle && <div className="section-subtitle content-block-subtitle">{subtitle}</div>}
                </div>

                {imageSrc && (
                    <div className="content-block-featured-image">
                        <img src={imageSrc} alt={imageAlt ?? title ?? ''} />
                        {imageCaption && <figcaption>{imageCaption}</figcaption>}
                    </div>
                )}

                <div className="content-block-body markdown-body">
                    {loading && <div>Loading content...</div>}
                    {error && <div>Error loading content.</div>}
                    {!loading && !error && (
                        <ReactMarkdown remarkPlugins={[remarkBreaks, remarkGfm]}>{content || ''}</ReactMarkdown>
                    )}
                </div>
            </div>
        </section>
    );
};
