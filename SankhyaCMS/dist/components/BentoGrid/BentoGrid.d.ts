import { default as React } from 'react';
export interface BentoGridItem {
    title: string;
    description?: string;
    icon?: string;
    image?: {
        src: string;
        alt: string;
    };
    colSpan?: 1 | 2 | 3 | 4;
    rowSpan?: 1 | 2;
    href?: string;
    className?: string;
}
export interface BentoGridProps {
    title?: string;
    subtitle?: string;
    items: BentoGridItem[];
    className?: string;
}
export declare const BentoGrid: React.FC<BentoGridProps>;
