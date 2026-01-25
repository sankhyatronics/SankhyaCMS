import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './Carousel.css';

export interface CarouselProps {
    children: React.ReactNode[];
    autoPlay?: boolean;
    interval?: number;
    className?: string;
    showArrows?: boolean;
    showIndicators?: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({
    children,
    autoPlay = true,
    interval = 5000,
    className = '',
    showArrows = true,
    showIndicators = true,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % children.length);
    }, [children.length]);

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + children.length) % children.length);
    };

    const goToSlide = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    useEffect(() => {
        if (!autoPlay) return;
        const timer = setInterval(nextSlide, interval);
        return () => clearInterval(timer);
    }, [autoPlay, interval, nextSlide]);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    if (!children || children.length === 0) return null;

    return (
        <div className={`carousel-container ${className}`}>
            <AnimatePresence initial={false} custom={direction} mode='wait'>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    style={{ width: '100%', height: '100%' }} // Ensure it accepts Hero size
                >
                    {children[currentIndex]}
                </motion.div>
            </AnimatePresence>

            {showArrows && children.length > 1 && (
                <>
                    <button className="carousel-nav-btn carousel-prev" onClick={prevSlide} aria-label="Previous Slide">
                        &#10094;
                    </button>
                    <button className="carousel-nav-btn carousel-next" onClick={nextSlide} aria-label="Next Slide">
                        &#10095;
                    </button>
                </>
            )}

            {showIndicators && children.length > 1 && (
                <div className="carousel-indicators">
                    {children.map((_, index) => (
                        <button
                            key={index}
                            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
