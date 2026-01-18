import React from 'react';
import './CTASection.css';

import { SectionProps, ActionableProps } from '../Common/BaseComponent.interfaces';

export interface CTASectionProps extends SectionProps, ActionableProps {
    imageSrc?: string;
    inverted?: boolean;
}



export const CTASection: React.FC<CTASectionProps> = ({
    title,
    subtitle,
    actionLabel,
    onAction,
    className = '',
    imageSrc,
    inverted = false,
}) => {
    const style = imageSrc
        ? { backgroundImage: `url(${imageSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }
        : {};

    return (
        <section className={`cta-section ${inverted ? 'theme-inverted' : ''} ${className}`} style={style}>
            <div className="cta-container">
                <h2 className="section-title cta-title">{title}</h2>
                {subtitle && <p className="section-subtitle cta-description">{subtitle}</p>}

                {actionLabel && (
                    <div className="cta-actions">
                        {actionLabel && (
                            <button
                                onClick={onAction}
                            >
                                {actionLabel}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};
