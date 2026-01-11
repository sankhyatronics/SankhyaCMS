export interface HamburgerMenuProps {
    children?: React.ReactNode[] | React.ReactNode;
    className?: string;
    position?: 'left' | 'right';
    label?: string;
}
export declare const HamburgerMenu: React.FC<HamburgerMenuProps>;
