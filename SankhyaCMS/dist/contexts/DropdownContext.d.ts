import { default as React } from 'react';
interface DropdownContextType {
    activeDropdown: string | null;
    setActiveDropdown: (id: string | null) => void;
}
export declare const useDropdownContext: () => DropdownContextType;
interface DropdownProviderProps {
    children: React.ReactNode;
}
export declare const DropdownProvider: React.FC<DropdownProviderProps>;
export {};
