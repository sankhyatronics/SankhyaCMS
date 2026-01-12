import React from 'react';
import './Button.css';
import { Icon } from '@iconify/react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    leftIcon?: string;
    rightIcon?: string;
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    className = '',
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    leftIcon,
    rightIcon,
    isLoading = false,
    disabled,
    ...props
}) => {
    const classes = [
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        fullWidth ? 'btn-full' : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <button className={classes} disabled={disabled || isLoading} {...props}>
            {isLoading && <div className="btn-spinner" aria-hidden="true" />}
            {!isLoading && leftIcon && <Icon icon={leftIcon} width="20" height="20" />}
            <span>{children}</span>
            {!isLoading && rightIcon && <Icon icon={rightIcon} width="20" height="20" />}
        </button>
    );
};
