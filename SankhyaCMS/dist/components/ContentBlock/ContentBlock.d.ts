import { default as React } from 'react';
export interface ContentBlockProps {
    title?: string;
    subtitle?: string;
    content: string;
    image?: {
        src: string;
        alt: string;
        caption?: string;
    };
    className?: string;
}
export declare const ContentBlock: React.FC<ContentBlockProps>;
