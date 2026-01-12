import { ApiService, ApiResponse } from '@sankhyatronics/sankhya-ui';
import menuGridItemStories from "./MenuGridItem.json";
import menuGridStories from "./MenuGrid.json";
import dropdownStories from './Dropdown.json';
import hamburgStories from './HamburgerMenu.json';
import headerStories from './Header.json';
import heroStories from './Hero.json';
import itemsAccordionStories from './ItemsAccordion.json';
import footerStories from './Footer.json';
import statsStories from './Stats.json';
import featureSplitStories from './FeatureSplit.json';
import contentBlockStories from './ContentBlock.json';
import featuresSectionStories from './FeaturesSection.json';
import bentoGridStories from './BentoGrid.json';
import ctaSectionStories from './CTASection.json';
import testimonialsStories from './Testimonials.json';


// Simple mock API service
export class MockApiService implements ApiService {
  private delayMs: number;

  constructor(delayMs: number = 300) {
    this.delayMs = delayMs;
  }

  // Simulate network delay
  private async simulateDelay(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, this.delayMs));
  }

  private normalizeData(item: any) {
    if (!item) return null;

    // Handle standard structure: { title: "...", data: { type: "...", data: { ... } } }
    // Support both uppercase and lowercase keys for robustness
    const topData = item.Data || item.data;
    if (topData && topData.type) {
      const innerData = topData.data || topData.Data;
      if (innerData) {
        return {
          ...innerData,
          type: topData.type
        };
      }
      return topData;
    }

    return item;
  }

  private parseEndpoint(endpoint: string): {
    path: string;
    queryParams: Record<string, string>;
  } {
    const [path, queryString] = endpoint.split('?');
    const queryParams: Record<string, string> = {};

    if (queryString) {
      queryString.split('&').forEach(param => {
        const [key, value] = param.split('=');
        if (key && value) {
          queryParams[key] = decodeURIComponent(value);
        }
      });
    }

    return { path, queryParams };
  }



  // GET request
  async get<T = any>(endpoint: string, options?: {
    headers?: Record<string, string>;
    delay?: number;
  }): Promise<ApiResponse<T>> {

    const { path, queryParams } = this.parseEndpoint(endpoint);

    // Use custom delay or default
    await this.simulateDelay();
    if (options?.delay) {
      await new Promise(resolve => setTimeout(resolve, options.delay));
    }

    // Handle different endpoints
    switch (path) {
      case '/menu-grid-item':
        const menuGridItemKey = queryParams.story || 'Default';
        const menuGridItems = menuGridItemStories.find(item => item.title === menuGridItemKey);
        return {
          data: this.normalizeData(menuGridItems) as T,
          status: 200,
          statusText: 'OK'
        }
      case '/menu-grid':
        const menuGridKey = queryParams.story || 'Default';
        const menuGrid = menuGridStories.find(item => item.title === menuGridKey);
        return {
          data: this.normalizeData(menuGrid) as T,
          status: 200,
          statusText: 'OK'
        }
      case '/dropdown':
        const dropdownKey = queryParams.story || 'Default';
        const dropdown = dropdownStories.find(item => item.title === dropdownKey);
        return {
          data: this.normalizeData(dropdown) as T,
          status: 200,
          statusText: 'OK'
        }
      case '/hamburger-menu':
        const hamburgerKey = queryParams.story || 'Default';
        const hamburger = hamburgStories.find(item => item.title === hamburgerKey);
        return {
          data: this.normalizeData(hamburger) as T,
          status: 200,
          statusText: 'OK'
        }
      case '/header':
        const headerKey = queryParams.story || 'Default';
        const header = headerStories.find(item => item.title === headerKey);
        return {
          data: this.normalizeData(header) as T,
          status: 200,
          statusText: 'OK'
        }
      case '/hero':
        const heroKey = queryParams.story || 'Default';
        const hero = heroStories.find(item => item.title === heroKey);
        return {
          data: this.normalizeData(hero) as T,
          status: 200,
          statusText: 'OK'
        }
      case '/items-accordion':
        const itemsAccordionKey = queryParams.story || 'Default';
        const itemsAccordion = itemsAccordionStories.find(item => item.title === itemsAccordionKey);
        return {
          data: this.normalizeData(itemsAccordion) as T,
          status: 200,
          statusText: 'OK'
        }
      case '/footer':
        const footerKey = queryParams.story || 'Default';
        const footer = footerStories.find(item => item.title === footerKey);
        return {
          data: this.normalizeData(footer) as T,
          status: 200,
          statusText: 'OK'
        }
      case '/stats':
        const statsKey = queryParams.story || 'Default';
        const stats = statsStories.find(item => item.title === statsKey);
        return {
          data: this.normalizeData(stats) as T,
          status: 200,
          statusText: 'OK'
        }
      case '/feature-split':
        const featureSplitKey = queryParams.story || 'Default';
        const featureSplit = featureSplitStories.find(item => item.title === featureSplitKey);
        return {
          data: this.normalizeData(featureSplit) as T,
          status: 200,
          statusText: 'OK'
        }
      case '/content-block':
        const contentBlockKey = queryParams.story || 'Default';
        const contentBlock = contentBlockStories.find(item => item.title === contentBlockKey);
        return {
          data: this.normalizeData(contentBlock) as T,
          status: 200,
          statusText: 'OK'
        }
      case '/features-section':
        const featuresSectionKey = queryParams.story || 'Default';
        const featuresSection = featuresSectionStories.find(item => item.title === featuresSectionKey);
        return {
          data: this.normalizeData(featuresSection) as T,
          status: 200,
          statusText: 'OK'
        }
      case '/bento-grid':
        const bentoGridKey = queryParams.story || 'Default';
        const bentoGrid = bentoGridStories.find(item => item.title === bentoGridKey);
        return {
          data: this.normalizeData(bentoGrid) as T,
          status: 200,
          statusText: 'OK'
        }
      case '/cta-section':
        const ctaKey = queryParams.story || 'Default';
        const cta = ctaSectionStories.find(item => item.title === ctaKey);
        return {
          data: this.normalizeData(cta) as T,
          status: 200,
          statusText: 'OK'
        }
      case '/testimonials':
        const testimonialsKey = queryParams.story || 'Default';
        const testimonials = testimonialsStories.find(item => item.title === testimonialsKey);
        return {
          data: this.normalizeData(testimonials) as T,
          status: 200,
          statusText: 'OK'
        }
      default:
        return {
          data: { message: 'Default endpoint', endpoint } as T,
          status: 200,
          statusText: 'OK'
        };
    }
  }



  // Get available endpoints
  getEndpoints(): Array<{ method: string; endpoint: string; description: string }> {
    return [
      { method: 'GET', endpoint: '/menu-grid-item', description: 'Returns MenuGrid Item component config' },
      { method: 'GET', endpoint: '/menu-grid', description: 'Returns MenuGrid component config' },
      { method: 'GET', endpoint: '/dropdown', description: 'Returns Dropdown component config' },
      { method: 'GET', endpoint: '/hamburger-menu', description: 'Returns Hamburger Menu component config' },
      { method: 'GET', endpoint: '/header', description: 'Returns Header component config' },
      { method: 'GET', endpoint: '/hero', description: 'Returns Hero component config' },
      { method: 'GET', endpoint: '/items-accordion', description: 'Returns ItemsAccordion component config' },
      { method: 'GET', endpoint: '/footer', description: 'Returns Footer component config' },
      { method: 'GET', endpoint: '/stats', description: 'Returns Stats component config' },
      { method: 'GET', endpoint: '/feature-split', description: 'Returns FeatureSplit component config' },
      { method: 'GET', endpoint: '/content-block', description: 'Returns ContentBlock component config' },
      { method: 'GET', endpoint: '/features-section', description: 'Returns FeaturesSection component config' },
      { method: 'GET', endpoint: '/bento-grid', description: 'Returns BentoGrid component config' },
      { method: 'GET', endpoint: '/cta-section', description: 'Returns CTASection component config' },
      { method: 'GET', endpoint: '/testimonials', description: 'Returns Testimonials component config' },
    ];
  }
}

// Create default instance
export const mockApi = new MockApiService();

// Helper function for simple GET requests
export async function mockFetch<T = any>(
  endpoint: string,
  options?: { delay?: number }
): Promise<T> {
  const response = await mockApi.get<T>(endpoint, options);
  return response.data;
}

// Pre-configured fetchers for common endpoints
export const mockApiFetchers = {
  getMenuGridItems: () => mockFetch('/menu-grid-item'),
  getMenuGrid: () => mockFetch('/menu-grid'),
  getDropdown: () => mockFetch('/dropdown'),
  getHamburgerMenu: () => mockFetch('/hamburger-menu'),
  getHeader: () => mockFetch('/header'),
  getHero: () => mockFetch('/hero'),
  getItemsAccordion: () => mockFetch('/items-accordion'),
  getFooter: () => mockFetch('/footer'),
  getStats: () => mockFetch('/stats'),
  getFeatureSplit: () => mockFetch('/feature-split'),
  getContentBlock: () => mockFetch('/content-block'),
  getFeaturesSection: () => mockFetch('/features-section'),
  getBentoGrid: () => mockFetch('/bento-grid'),

};