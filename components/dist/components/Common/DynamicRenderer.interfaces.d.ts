export type ComponentList = 'Dropdown' | 'Header' | 'MenuItem' | 'MenuGrid' | 'MenuGridItem' | 'Hero' | 'IconButton' | 'HamburgerMenu' | 'ItemsAccordion' | 'Footer' | 'Stats' | 'FeatureSplit' | 'ContentBlock' | 'FeaturesSection' | 'BentoGrid' | 'FeatureItem';
export interface IDynamicRendererProps {
    config: IComponent | IComponent[] | any;
    className?: string;
    handlers?: Record<string, (...args: any[]) => void>;
    onError?: (error: Error, component: IComponent) => void;
}
export interface IComponent {
    type: ComponentList;
    data: {
        id: string;
        children?: Array<IComponent>;
        [key: string]: unknown;
    };
}
export declare function isIComponent(obj: unknown): obj is IComponent;
