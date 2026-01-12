import { default as React } from 'react';
export interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'bordered';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hoverable?: boolean;
    elevation?: 'none' | 'sm' | 'md' | 'lg';
    onClick?: () => void;
}
export declare const Card: React.FC<CardProps>;
