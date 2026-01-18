import React from 'react';
import './Card.css';

export interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'bordered';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hoverable?: boolean;
    elevation?: 'none' | 'sm' | 'md' | 'lg';
    onClick?: () => void;
    inverted?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    variant = 'default',
    padding = 'md',
    hoverable = false,
    elevation = 'sm',
    onClick,
    inverted = false,
}) => {
    const classes = [
        'card',
        `card-${variant}`,
        `card-padding-${padding}`,
        propsToClass('elevation', elevation),
        hoverable ? 'card-hoverable' : '',
        inverted ? 'theme-inverted' : '',
        className,
    ].filter(Boolean).join(' ');


    return (
        <div className={classes} onClick={onClick}>
            {children}
        </div>
    );
};

const propsToClass = (prefix: string, value?: string) => {
    return value && value !== 'none' ? `card-${prefix}-${value}` : '';
};
