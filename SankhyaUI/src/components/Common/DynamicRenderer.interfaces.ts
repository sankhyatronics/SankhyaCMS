export type ComponentList = 'Dropdown' | 'Header' | 'MenuItem' | 'MenuGrid' | 'MenuGridItem' | 'Hero' | 'IconButton' | 'HamburgerMenu' | 'ItemsAccordion' | 'Footer' | 'Stats' | 'FeatureSplit' | 'ContentBlock' | 'FeaturesSection' | 'BentoGrid' | 'FeatureItem' | 'CTASection' | 'Testimonials' | 'Select';

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

// Type guard for IComponent
export function isIComponent(obj: unknown): obj is IComponent {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        'type' in obj &&
        typeof (obj as any).type === 'string' &&
        'data' in obj &&
        typeof (obj as any).data === 'object' &&
        (obj as any).data !== null &&
        'id' in (obj as any).data
    );
}