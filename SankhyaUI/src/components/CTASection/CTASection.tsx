import React from 'react';
import './CTASection.css';

export interface CTASectionProps {
    title: string;
    description?: string;
    ActionLabel?: string;
    onActionClick?: () => void;
    className?: string;
    backgroundImage?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
    title,
    description,
    ActionLabel,
    onActionClick,
    className = '',
    backgroundImage,
}) => {
    const style = backgroundImage
        ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
        : {};

    return (
        <section className={`cta-section ${className}`} style={style}>
            <div className="cta-container">
                <h2 className="cta-title">{title}</h2>
                {description && <p className="cta-description">{description}</p>}

                {ActionLabel && (
                    <div className="cta-actions">
                        {ActionLabel && (
                            <button
                                onClick={onActionClick}
                            >
                                {ActionLabel}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};
