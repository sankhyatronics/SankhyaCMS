export interface MenuItemProps {
    title: string;
    href: string;
    description?: string;
    icon?: string;
    badge?: string | number;
    isActive?: boolean;
    className?: string;
    showDescription?: boolean;
    onClick?: () => void;
    target?: string;
    compact?: boolean;
}
export declare const MenuItem: React.FC<MenuItemProps>;
