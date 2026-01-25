import { ApiService } from "./useApiConfig";
import { useTypedApiConfig } from "./useTypedApiConfig";

export function useMenuGridItemConfig(story: string, apiService: ApiService, variant?: string) {
  return useTypedApiConfig({ component: 'MenuGridItem', story, apiService, variant });
}

export function useMenuGridConfig(story: string, apiService: ApiService, variant?: string) {
  return useTypedApiConfig({ component: 'MenuGrid', story, apiService, variant });
}

export function useDropdownConfig(story: string, apiService: ApiService, variant?: string) {
  return useTypedApiConfig({ component: 'Dropdown', story, apiService, variant });
}

export function useHeroConfig(story: string, apiService: ApiService, variant?: string) {
  return useTypedApiConfig({ component: 'Hero', story, apiService, variant });
}

export function useHeaderConfig(story: string, apiService: ApiService, variant?: string) {
  return useTypedApiConfig({ component: 'Header', story, apiService, variant });
}

export function useItemsAccordionConfig(story: string, apiService: ApiService, variant?: string) {
  return useTypedApiConfig({ component: 'ItemsAccordion', story, apiService, variant });
}

export function useFooterConfig(story: string, apiService: ApiService, variant?: string) {
  return useTypedApiConfig({ component: 'Footer', story, apiService, variant });
}

export function useStatsConfig(story: string, apiService: ApiService, variant?: string) {
  return useTypedApiConfig({ component: 'Stats', story, apiService, variant });
}

export function useFeatureSplitConfig(story: string, apiService: ApiService, variant?: string) {
  return useTypedApiConfig({ component: 'FeatureSplit', story, apiService, variant });
}

export function useContentBlockConfig(story: string, apiService: ApiService, variant?: string) {
  return useTypedApiConfig({ component: 'ContentBlock', story, apiService, variant });
}

export function useFeaturesSectionConfig(story: string, apiService: ApiService, variant?: string) {
  return useTypedApiConfig({ component: 'FeaturesSection', story, apiService, variant });
}

export function useBentoGridConfig(story: string, apiService: ApiService, variant?: string) {
  return useTypedApiConfig({ component: 'BentoGrid', story, apiService, variant });
}

export function useCTASectionConfig(story: string, apiService: ApiService, variant?: string) {
  return useTypedApiConfig({ component: 'CTASection', story, apiService, variant });
}

export function useTestimonialsConfig(story: string, apiService: ApiService, variant?: string) {
  return useTypedApiConfig({ component: 'Testimonials', story, apiService, variant });
}

export function useSelectConfig(story: string, apiService: ApiService, variant?: string) {
  return useTypedApiConfig({ component: 'Select', story, apiService, variant });
}

export function useCarouselConfig(story: string, apiService: ApiService, variant?: string) {
  return useTypedApiConfig({ component: 'Carousel', story, apiService, variant });
}
