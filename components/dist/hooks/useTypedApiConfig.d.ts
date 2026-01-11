import { ApiService } from './useApiConfig';
import { IComponent } from '../../src/components/Common/DynamicRenderer.interfaces';
interface UseTypedApiConfigOptions {
    component: ComponentType;
    story: string;
    apiService: ApiService;
    variant?: string;
}
type ComponentType = 'MenuGridItem' | 'MenuGrid' | 'Dropdown' | 'Header' | 'Hero' | 'HamburgerMenu' | 'Card' | 'ItemsAccordion' | 'Footer' | 'Stats' | 'FeatureSplit' | 'ContentBlock' | 'FeaturesSection' | 'BentoGrid';
export declare function useTypedApiConfig(options: UseTypedApiConfigOptions): {
    data: IComponent | null;
    loading: boolean;
    error: string | null;
    refetch: (customStory?: string, customParams?: Record<string, string>) => Promise<void>;
    setData: import('react').Dispatch<import('react').SetStateAction<IComponent | null>>;
};
export {};
