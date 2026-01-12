export interface MenuGridItemProps {
    title: string;
    description?: string;
    href: string;
    icon?: string;
    badge?: string;
    compact?: boolean;
    showDescription?: boolean;
    className?: string;
}
export declare const MenuGridItem: React.FC<MenuGridItemProps>;
