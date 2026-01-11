import { default as React } from 'react';
export interface TestimonialItem {
    id: string;
    name: string;
    role: string;
    company?: string;
    avatar?: string;
    quote: string;
    rating?: number;
}
export interface TestimonialsProps {
    title: string;
    subtitle?: string;
    testimonials: TestimonialItem[];
    className?: string;
}
export declare const Testimonials: React.FC<TestimonialsProps>;
