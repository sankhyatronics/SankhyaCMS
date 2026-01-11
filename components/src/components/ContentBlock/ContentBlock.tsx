import React from 'react';
import './ContentBlock.css';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

export interface ContentBlockProps {
    title?: string;
    subtitle?: string;
    content: string; // Markdown string
    image?: {
        src: string;
        alt: string;
        caption?: string;
    };
    className?: string;
}

export const ContentBlock: React.FC<ContentBlockProps> = ({
    title,
    subtitle,
    content,
    image,
    className = '',
}) => {
    return (
        <section className={`content-block-section ${className}`}>
            <div className="content-block-container">
                <div className="content-block-header">
                    {title && <div className="content-block-title">{title}</div>}
                    {subtitle && <div className="content-block-subtitle">{subtitle}</div>}
                </div>

                {image && (
                    <div className="content-block-featured-image">
                        <img src={image.src} alt={image.alt} />
                        {image.caption && <figcaption>{image.caption}</figcaption>}
                    </div>
                )}

                <div className="content-block-body markdown-body">
                    <ReactMarkdown remarkPlugins={[remarkBreaks]}>{content}</ReactMarkdown>
                </div>
            </div>
        </section>
    );
};
