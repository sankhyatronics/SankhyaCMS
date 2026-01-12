import { default as React } from 'react';
export interface FooterLink {
    label: string;
    href: string;
}
export interface FooterColumn {
    title: string;
    links: FooterLink[];
}
export interface FooterProps {
    logoUrl?: string;
    companyName?: string;
    description?: string;
    columns: FooterColumn[];
    socialLinks?: {
        icon: string;
        href: string;
    }[];
    copyright?: string;
    inverted?: boolean;
    className?: string;
}
export declare const Footer: React.FC<FooterProps>;
