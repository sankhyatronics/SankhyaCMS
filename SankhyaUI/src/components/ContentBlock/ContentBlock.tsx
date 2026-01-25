import React from 'react';
import './ContentBlock.css';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import { SectionProps } from '../Common/BaseComponent.interfaces';

export interface ContentBlockProps extends SectionProps {
    content?: string; // Markdown string
    format?: 'html' | 'markdown';
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
    content,
    format = 'markdown',
    className = '',
    image,
    inverted = false,
}) => {
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
                    {format === 'html' ? (
                        <div dangerouslySetInnerHTML={{ __html: content || '' }} />
                    ) : (
                        <ReactMarkdown remarkPlugins={[remarkBreaks, remarkGfm]}>{content || ''}</ReactMarkdown>
                    )}
                </div>
            </div>
        </section>
    );
};
