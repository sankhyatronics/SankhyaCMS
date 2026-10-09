import type { ComponentType } from 'react';
import type { ComponentList } from './schema';
import { Header } from '../Header/Header';
import { MenuItem } from '../Menu/MenuItem';
import { MenuGrid } from '../Menu/MenuGrid';
import { MenuGridItem } from '../Menu/MenuGridItem';
import { Hero } from '../Hero/Hero';
import { IconButton } from '../IconButton/IconButton';
import { FeatureSplit } from '../FeatureSplit/FeatureSplit';
import { ContentBlock } from '../ContentBlock/ContentBlock';
import { FeaturesSection } from '../FeaturesSection/FeaturesSection';
import { FeatureItem } from '../FeaturesSection/FeatureItem';
import { BentoGrid } from '../BentoGrid/BentoGrid';
import { Dropdown } from '../Dropdown/Dropdown';
import { Stats } from '../Stats/Stats';
import { PromoBanner } from '../PromoBanner/PromoBanner';
import { Testimonials } from '../Testimonials/Testimonials';
import { Select } from '../Select/Select';
import { Carousel } from '../Carousel/Carousel';
import { CookieConsent } from '../CookieConsent/CookieConsent';
import { Footer } from '../Footer/Footer';
import { Card } from '../Card/Card';
import { ItemsAccordion } from '../ItemsAccordion/ItemsAccordion';

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
