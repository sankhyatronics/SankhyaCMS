import React from 'react';
import './CTASection.css';
import { Button } from '../Button/Button';

export interface CTASectionProps {
    title: string;
    description?: string;
    primaryActionLabel?: string;
    secondaryActionLabel?: string;
    onPrimaryClick?: () => void;
    onSecondaryClick?: () => void;
    className?: string;
    backgroundImage?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
    title,
    description,
    primaryActionLabel,
    secondaryActionLabel,
    onPrimaryClick,
    onSecondaryClick,
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

                {(primaryActionLabel || secondaryActionLabel) && (
                    <div className="cta-actions">
                        {primaryActionLabel && (
                            <Button
                                variant="secondary"
                                size="lg"
                                onClick={onPrimaryClick}
                            >
                                {primaryActionLabel}
                            </Button>
                        )}
                        {secondaryActionLabel && (
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={onSecondaryClick}
                                style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
                            >
                                {secondaryActionLabel}
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};
