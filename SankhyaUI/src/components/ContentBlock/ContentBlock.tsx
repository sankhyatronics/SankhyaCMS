import React from 'react';
import './ContentBlock.css';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import { SectionProps } from '../Common/BaseComponent.interfaces';
import { useMarkdown } from '../../hooks/useMarkdown';

export interface ContentBlockProps extends SectionProps {
    contentUrl?: string; // URL to Markdown file
    image?: {
        imageSrc: string;
        alt: string;
        caption?: string;
    };
    className?: string;
    inverted?: boolean;
}

export const ContentBlock: React.FC<ContentBlockProps> = ({
    title,
    subtitle,
    contentUrl,
    className = '',
    image,
    inverted = false,
}) => {
    const { content, loading, error } = useMarkdown(contentUrl);

    return (
        <section className={`content-block-section ${inverted ? 'theme-inverted' : ''} ${className}`}>
            <div className="content-block-container">
                <div className="content-block-header">
                    {title && <div className="section-title content-block-title">{title}</div>}
                    {subtitle && <div className="section-subtitle content-block-subtitle">{subtitle}</div>}
                </div>

                {image && (
                    <div className="content-block-featured-image">
                        <img src={image.imageSrc} alt={image.alt} />
                        {image.caption && <figcaption>{image.caption}</figcaption>}
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
