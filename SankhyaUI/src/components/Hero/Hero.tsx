import './Hero.css';
import '../Common/Common.css';
import { motion } from "motion/react";

import { SectionProps, ActionableProps } from '../Common/BaseComponent.interfaces';

export interface HeroProps extends SectionProps, ActionableProps {
    imageSrc?: string;
    textAlignment?: 'left' | 'center' | 'right' | 'justify';
    padding?: 'none' | 'small' | 'medium' | 'large';
    inverted?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
    title,
    subtitle,
    imageSrc,
    actionLabel,
    href,
    textAlignment = 'left',
    padding = 'none',
    className = '',
    inverted = false,
}) => {
    const backgroundStyle = imageSrc ? { backgroundImage: `url(${imageSrc})` } : {};

    // Responsive text alignment
    const alignmentClasses = {
        left: 'text-left items-start',
        center: 'text-center items-center',
        right: 'text-right items-end',
        justify: 'text-justify'
    }[textAlignment];

    // Responsive padding
    const paddingClasses = {
        none: 'p-none',
        small: 'p-small',
        medium: 'p-medium',
        large: 'p-large'
    }[padding];

    return (
        <motion.div
            className={`hero-image relative ${className} ${inverted ? 'theme-inverted' : ''}`}
            style={backgroundStyle}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            data-theme="light"
        >
            {/* Optional gradient overlay for better text readability */}
            <div className="hero-overlay" />

            <div className={`hero-text ${alignmentClasses} ${paddingClasses}`}>
                <motion.div
                    className="hero-text-primary hero-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                >
                    {title}
                </motion.div>

                {subtitle && (
                    <motion.div
                        className="hero-text-primary hero-subtitle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    >
                        {subtitle}
                    </motion.div>
                )}

                {actionLabel && (
                    <div className="hero-actions">
                        <motion.a
                            className='btn hero-btn-primary hover-lift active-scale'
                            href={href}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                        >
                            {actionLabel}
                        </motion.a>
                    </div>
                )}
            </div>
        </motion.div>
    );
};
