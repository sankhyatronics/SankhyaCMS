import React from 'react';
import './Testimonials.css';
import { BaseProps, SectionProps } from '../Common/BaseComponent.interfaces';
import { Card } from '../Card/Card';
import { Icon } from '@iconify/react';

export interface TestimonialItem extends BaseProps {
    name: string;
    role: string;
    company?: string;
    imageSrc?: string;
    quote: string;
    rating?: number;
}

export interface TestimonialsProps extends SectionProps {
    items: TestimonialItem[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({
    title,
    subtitle,
    items,
    className = '',
}) => {
    return (
        <section className={`testimonials-section ${className}`}>
            <div className="testimonials-container">
                <div className="testimonials-header">
                    <h2 className="section-title testimonials-title">{title}</h2>
                    {subtitle && <p className="section-subtitle testimonials-subtitle">{subtitle}</p>}
                </div>

                <div className="testimonials-grid">
                    {items.map((item) => (
                        <Card key={item.id} elevation="sm" className="testimonial-card">
                            <div className="testimonial-card-content">
                                <div className="testimonial-stars">
                                    {[...Array(item.rating || 5)].map((_, i) => (
                                        <Icon key={i} icon="mdi:star" width="20" height="20" />
                                    ))}
                                </div>

                                <blockquote className="testimonial-quote">
                                    "{item.quote}"
                                </blockquote>

                                <div className="testimonial-author">
                                    {item.imageSrc ? (
                                        <img
                                            src={item.imageSrc}
                                            alt={item.name}
                                            className="testimonial-avatar"
                                        />
                                    ) : (
                                        <div className="testimonial-avatar-placeholder">
                                            {item.name.charAt(0)}
                                        </div>
                                    )}
                                    <div className="testimonial-author-info">
                                        <span className="testimonial-name">{item.name}</span>
                                        <span className="testimonial-role">
                                            {item.role} {item.company && `at ${item.company}`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};


