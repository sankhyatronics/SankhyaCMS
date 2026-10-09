import React from 'react';
import { Link } from 'react-router';
import { Card } from '../Card/Card';
import { Icon } from '@iconify/react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import { BaseProps, ActionableProps } from '../Common/BaseComponent.interfaces';

export interface FeatureItemProps extends BaseProps, ActionableProps {
    icon?: string;
    title: string;
    description: string;
    inverted?: boolean;
}

export const FeatureItem: React.FC<FeatureItemProps> = ({
    icon,
    title,
    description,
    href,
    actionLabel = 'Learn more',
    className = '',
    inverted = false,
}) => {
    return (
        <Card hoverable elevation="sm" className={`feature-card ${className}`} inverted={inverted}>

            <div className="feature-card-content">
                {icon && (
                    <div className="feature-icon-wrapper">
                        <Icon icon={icon} width="24" height="24" />
                    </div>
                )}
                <h3 className="card-title feature-title">{title}</h3>
                <div className="card-description feature-description">
                    <ReactMarkdown remarkPlugins={[remarkBreaks, remarkGfm]}>
                        {description}
                    </ReactMarkdown>
                </div>
                {href && (
                    href.startsWith('http') ? (
                        <a href={href} className="feature-link" target="_blank" rel="noopener noreferrer">
                            {actionLabel} <span>&rarr;</span>
                        </a>
                    ) : (
                        <Link to={href} className="feature-link">
                            {actionLabel} <span>&rarr;</span>
                        </Link>
                    )
                )}
            </div>
        </Card>
    );
};
