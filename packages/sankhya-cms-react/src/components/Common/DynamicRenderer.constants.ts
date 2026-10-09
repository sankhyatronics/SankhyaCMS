import type { ComponentType } from 'react';
import type { ComponentList } from './schema';
import {
    BentoGrid,
    Card,
    Carousel,
    ContentBlock,
    CookieConsent,
    Dropdown,
    FeatureItem,
    FeatureSplit,
    FeaturesSection,
    Footer,
    Header,
    Hero,
    IconButton,
    ItemsAccordion,
    MenuGrid,
    MenuGridItem,
    MenuItem,
    PromoBanner,
    Select,
    Stats,
    Testimonials
} from '../lit';

export const baseComponents = {
    Header,
    MenuItem,
    MenuGrid,
    MenuGridItem,
    Dropdown,
    Hero,
    IconButton,
    FeatureSplit,
    ContentBlock,
    FeaturesSection,
    FeatureItem,
    BentoGrid,
    Footer,
    Stats,
    PromoBanner,
    Testimonials,
    Select,
    Carousel,
    CookieConsent,
    Card,
    ItemsAccordion
} as const;

/**
 * Components whose children are split by their `slot` into named props instead of `children`.
 * Maps slot name -> prop name; the key `default` covers children without a `slot`.
 */
export type SlotMap = Record<string, string>;

const componentRegistry: Record<string, ComponentType<any>> = { ...baseComponents };
const slotRegistry: Record<string, SlotMap> = {
    Header: { default: 'menuBar', utility: 'utilityButtons' }
};

export function registerComponent(
    name: ComponentList | (string & {}),
    component: ComponentType<any>,
    slots?: SlotMap
): void {
    componentRegistry[name] = component;
    if (slots) slotRegistry[name] = slots;
}

export function getComponent(name: string): ComponentType<any> | undefined {
    return Object.hasOwn(componentRegistry, name) ? componentRegistry[name] : undefined;
}

export function getSlots(name: string): SlotMap | undefined {
    return slotRegistry[name];
}

export function hasComponent(name: string): boolean {
    return Object.hasOwn(componentRegistry, name);
}
