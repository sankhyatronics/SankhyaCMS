export interface HeaderProps {
    sticky?: boolean;
    className?: string;
    mobileBreakpoint?: number;
    logoHref?: string;
    logoTarget?: string;
    logoClassName?: string;
    logoSrc?: string;
    altText?: string;
    menuBar?: React.ReactNode[];
    utilityButtons?: React.ReactNode[];
}
export declare const Header: React.FC<HeaderProps>;
