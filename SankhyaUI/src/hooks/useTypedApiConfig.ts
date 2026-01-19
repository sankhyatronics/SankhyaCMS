import { useApiConfig, ApiService } from './useApiConfig';
import { IComponent } from '../components/Common/DynamicRenderer.interfaces';

interface UseTypedApiConfigOptions {
  component: ComponentType;
  story: string;
  apiService: ApiService;
  variant?: string;
}

// Define component types for better TypeScript support
type ComponentType =
  | 'MenuGridItem'
  | 'MenuGrid'
  | 'Dropdown'
  | 'Header'
  | 'Hero'
  | 'Card'
  | 'ItemsAccordion'
  | 'Footer'
  | 'Stats'
  | 'FeatureSplit'
  | 'ContentBlock'
  | 'FeaturesSection'
  | 'BentoGrid'
  | 'CTASection'
  | 'Testimonials'
  | 'Select';

const componentEndpoints: Record<ComponentType, string> = {
  MenuGridItem: '/menu-grid-item',
  MenuGrid: '/menu-grid',
  Dropdown: '/dropdown',
  Header: '/header',
  Hero: '/hero',
  Card: '/card',
  ItemsAccordion: '/items-accordion',
  Footer: '/footer',
  Stats: '/stats',
  FeatureSplit: '/feature-split',
  ContentBlock: '/content-block',
  FeaturesSection: '/features-section',
  BentoGrid: '/bento-grid',
  CTASection: '/cta-section',
  Testimonials: '/testimonials',
  Select: '/select',
};

export function useTypedApiConfig(options: UseTypedApiConfigOptions) {
  const { component, story = 'Default', variant, apiService } = options;
  const endpoint = componentEndpoints[component];

  const params: Record<string, string> = {};
  if (variant) {
    params.variant = variant;
  }

  return useApiConfig<IComponent>({
    endpoint,
    storyName: story,
    params,
    apiService
  });
}