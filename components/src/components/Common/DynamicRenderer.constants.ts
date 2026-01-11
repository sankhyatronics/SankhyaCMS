import { ComponentList } from './DynamicRenderer.interfaces';
import { Header } from '../Header/Header';
import { MenuItem } from '../Menu/MenuItem';
import { MenuGrid } from '../Menu/MenuGrid';
import { MenuGridItem } from '../Menu/MenuGridItem';
import { Hero } from '../Hero/Hero';
import { IconButton } from '../IconButton/IconButton';
import { HamburgerMenu } from '../HamburgerMenu/HamburgerMenu';
import { FeatureSplit } from '../FeatureSplit/FeatureSplit';
import { ContentBlock } from '../ContentBlock/ContentBlock';
import { FeaturesSection } from '../FeaturesSection/FeaturesSection';
import { FeatureItem } from '../FeaturesSection/FeatureItem';
import { BentoGrid } from '../BentoGrid/BentoGrid';
import { Dropdown } from '../Dropdown/Dropdown';
import { Stats } from '../Stats/Stats';

// Base components (excluding Dropdown to avoid circular dependency)
export const baseComponents = {
    Header,
    MenuItem,
    MenuGrid,
    MenuGridItem,
    Dropdown,
    Hero,
    IconButton,
    HamburgerMenu,
    FeatureSplit,
    ContentBlock,
    FeaturesSection,
    FeatureItem,
    BentoGrid,
    Stats
} as const;

// Type-safe component registry
type ComponentRegistry = {
    [K in ComponentList]?: React.ComponentType<any>;
};

let componentRegistry: ComponentRegistry = { ...baseComponents };

// Register components dynamically
export function registerComponent<T extends ComponentList>(
    name: T,
    component: React.ComponentType<any>
): void {
    componentRegistry[name] = component;
}

// Get component from registry
export function getComponent<T extends ComponentList>(name: T): React.ComponentType<any> | undefined {
    return componentRegistry[name];
}

// Check if component exists
export function hasComponent(name: string): name is ComponentList {
    return name in componentRegistry;
}