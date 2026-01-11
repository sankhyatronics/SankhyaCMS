import React from 'react';
import { Link } from 'react-router';
import { Card } from '../Card/Card';
import { Icon } from '@iconify/react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

export interface FeatureItemProps {
    icon: string;
    title: string;
    description: string;
    url?: string;
    featureLinkText?: string;
    className?: string;
}

export const FeatureItem: React.FC<FeatureItemProps> = ({
    icon,
    title,
    description,
    url,
    featureLinkText = 'Learn more',
    className = '',
}) => {
    return (
        <Card hoverable elevation="sm" className={`feature-card ${className}`}>
            <div className="feature-card-content">
                <div className="feature-icon-wrapper">
                    <Icon icon={icon} width="24" height="24" />
                </div>
                <h3 className="feature-title">{title}</h3>
                <div className="feature-description">
                    <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                        {description}
                    </ReactMarkdown>
                </div>
                {url && (
                    url.startsWith('http') ? (
                        <a href={url} className="feature-link" target="_blank" rel="noopener noreferrer">
                            {featureLinkText} <span>&rarr;</span>
                        </a>
                    ) : (
                        <Link to={url} className="feature-link">
                            {featureLinkText} <span>&rarr;</span>
                        </Link>
                    )
                )}
            </div>
        </Card>
    );
};
