export interface IconButtonProps {
    icon: string;
    onClick?: () => void;
    ariaLabel: string;
    className?: string;
    badge?: string | number;
    active?: boolean;
    children?: React.ReactNode;
}
export declare const IconButton: React.FC<IconButtonProps>;
