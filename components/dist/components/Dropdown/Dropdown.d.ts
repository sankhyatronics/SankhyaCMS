export interface DropdownProps {
    children?: React.ReactNode[] | React.ReactNode;
    className?: string;
    itemGroupClassName?: string;
    itemClassName?: string;
    title?: string;
    icon?: string;
    iconPosition?: 'left' | 'right';
    iconSize?: string;
    iconColor?: string;
    href?: string;
    id?: string;
    target?: string;
}
export declare const Dropdown: React.FC<DropdownProps>;
