import { default as React } from 'react';
export interface AccordionItem {
    id: string;
    title: string;
    content: React.ReactNode;
}
export interface ItemsAccordionProps {
    title?: string;
    subtitle?: string;
    items: AccordionItem[];
    className?: string;
    allowMultiple?: boolean;
}
export declare const ItemsAccordion: React.FC<ItemsAccordionProps>;
