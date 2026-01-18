import React from 'react';
import './CTASection.css';
import '../Common/Common.css';
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
        <section className={`cta-section ${inverted ? 'theme-inverted' : ''}`} style={style}>
            <div className={`cta-container ${className}`}>
                <h2 className="section-title cta-title">{title}</h2>
                {subtitle && <p className="section-subtitle cta-description">{subtitle}</p>}

                {actionLabel && (
                    <div className="cta-actions btn btn-outline">
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
