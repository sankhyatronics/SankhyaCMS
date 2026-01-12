import './Hero.css';
import '../Common/Common.css';
import { motion } from "motion/react";

export interface HeroProps {
    Title: string;
    ImageUrl?: string;
    SubTitle?: string;
    className?: string;
    ButtonText?: string;
    Link: string;
    textAlignment?: 'left' | 'center' | 'right' | 'justify';
    padding?: 'none' | 'small' | 'medium' | 'large';
}

export const Hero: React.FC<HeroProps> = (props) => {
    const {
        ButtonText,
        Title,
        SubTitle,
        Link,
        className = '',
        ImageUrl,
        textAlignment = 'center',
        padding = 'medium'
    } = props;

    const backgroundStyle = ImageUrl ? { backgroundImage: `url(${ImageUrl})` } : {};

    // Responsive text alignment
    const alignmentClasses = {
        left: 'text-left items-start',
        center: 'text-center items-center',
        right: 'text-right items-end',
        justify: 'text-justify'
    }[textAlignment];

    // Responsive padding
    const paddingClasses = {
        none: 'p-2',
        small: 'p-4 md:p-6',
        medium: 'p-6 md:p-8 lg:p-12',
        large: 'p-8 md:p-12 lg:p-16'
    }[padding];

    return (
        <motion.div
            className={`hero-image relative ${className}`}
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
                    {Title}
                </motion.div>

                {SubTitle && (
                    <motion.div
                        className="hero-text-primary hero-subtitle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    >
                        {SubTitle}
                    </motion.div>
                )}

                {ButtonText && (
                    <div className="hero-actions">
                        <motion.a
                            className='btn hero-btn-primary hover-lift active-scale'
                            href={Link}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                        >
                            {ButtonText}
                        </motion.a>
                    </div>
                )}
            </div>
        </motion.div>
    );
};
