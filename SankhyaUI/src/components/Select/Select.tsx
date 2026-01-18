import React, { useState } from 'react';
import { Dropdown } from '../Dropdown/Dropdown';
import { Icon } from '@iconify/react';
import './Select.css';

export interface SelectOption {
    value: string;
    label?: string;
    icon?: string;
    onClick?: () => void;
}

export interface SelectProps {
    options: SelectOption[];
    value?: string;
    defaultValue: string;
    onChange?: (value: string) => void;
    className?: string;
    icon?: string;
    id?: string;
    hideSelectedLabel?: boolean;
}

export const Select: React.FC<SelectProps> = ({
    options = [],
    value,
    defaultValue,
    onChange,
    className,
    icon,
    id,
    hideSelectedLabel = false,
}) => {
    const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const handleSelect = (option: SelectOption) => {
        if (!isControlled) {
            setInternalValue(option.value);
        }
        onChange?.(option.value);
        option.onClick?.();
    };

    const selectedOption = options.find((opt) => opt.value === currentValue);
    const triggerIcon = selectedOption?.icon || icon;

    let triggerLabel = selectedOption?.label || selectedOption?.value || currentValue || '';
    if (hideSelectedLabel && triggerIcon) {
        triggerLabel = '';
    }

    return (
        <Dropdown
            id={id}
            title={triggerLabel}
            icon={triggerIcon}
            className={`${className || ''}`}
            itemGroupClassName="select-options-group"
        >
            {options.map((option) => (
                <div
                    key={option.value}
                    className={`select-option ${option.value === currentValue ? 'selected' : ''} ${className}`}
                    onClick={() => handleSelect(option)}
                    role="option"
                    aria-selected={option.value === currentValue}
                >
                    {option.icon && <span className="option-icon"><Icon icon={option.icon} /></span>}
                    {option.label && <span className={`option-label ${className}`}>{option.label}</span>}
                </div>
            ))}
        </Dropdown>
    );
};
