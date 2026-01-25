# @sankhyatronics/SankhyaUI

[![npm version](https://img.shields.io/npm/v/@sankhyatronics/sankhya-ui.svg)](https://www.npmjs.com/package/@sankhyatronics/sankhya-ui)

The core UI library for the SankhyaUI system. Build **dynamic, JSON-driven portals** with ease.  
**Pure view React components (React 19)** designed for seamless integration with **headless CMS** platforms.

[**Explore the Docs & Storybook »**](https://sankhyaui.sankhyatronics.com/?path=/docs/introduction--docs)

[**Sample App »**](https://sample-ui.sankhyatronics.com/)

## Features

- **Highly Modular**: Each component is independent and purely visual.
- **CMS Ready**: Designed to work with Storyblok, Contentful, or custom JSON backends.
- **Tailwind Integrated**: Uses Tailwind CSS for modern, responsive designs.
- **Dynamic Rendering**: Includes a `DynamicRenderer` to map JSON data directly to React components.

## Installation

Using pnpm (recommended):
```bash
pnpm add @sankhyatronics/sankhya-ui
```

Using npm:
```bash
npm install @sankhyatronics/sankhya-ui
```

Using yarn:
```bash
yarn add @sankhyatronics/sankhya-ui
```

## Quick Start

### 1. Import Styles

Import the CSS file at the root of your application (e.g., `main.tsx` or `App.tsx`):

```tsx
import '@sankhyatronics/sankhya-ui/styles';
```

### 2. Using DynamicRenderer

The `DynamicRenderer` is the heart of SankhyaUI for CMS-driven pages. It iterates over a list of content blocks and renders the appropriate component.

```tsx
import { DynamicRenderer } from '@sankhyatronics/sankhya-ui';

// Example data usually fetched from a CMS API
const pageData = [
  {
    type: "Hero", // Matches the component name
    data: {
      Title: "Hello World",
      SubTitle: "Welcome to my portal"
    }
  },
  {
    type: "Stats",
    data: {
      items: [
        { label: "Users", value: "10k+" },
        { label: "Revenue", value: "$5M" }
      ]
    }
  }
];

function App() {
  return <DynamicRenderer data={pageData} />;
}
```

### 3. Using Individual Components

You can also import and use components individually:

```tsx
import { Hero, Card } from '@sankhyatronics/sankhya-ui';

function LandingPage() {
  return (
    <>
      <Hero data={{ Title: "My Landing Page", SubTitle: "Built with SankhyaUI" }} />
      <Card title="Feature 1" description="Amazing feature" />
    </>
  );
}
```

## Available Components

### Layout & Structure
- **BentoGrid**: A flexible grid layout for displaying varied content.
- **Card**: Standard card component for items.
- **ContentBlock**: Generic content container.
- **FeatureSplit**: Left/right split content for features.
- **FeaturesSection**: A full section to showcase multiple features.
- **FeatureItem**: Individual item within a features section.
- **ItemsAccordion**: Accordion-style list for FAQs or details.

### Navigation
- **Header**: Main site header.
- **Footer**: Site footer.
- **MenuGrid**: Grid-based menu layout.
- **MenuGridItem**: Individual item providing navigation within a grid.
- **MenuItem**: Standard menu item.
- **Dropdown**: Dropdown menu component.

### Inputs & Actions
- **CTASection**: Call-to-Action section to drive user engagement.
- **IconButton**: Button with an icon.
- **Select**: Dropdown selection input.

### Branding & Marketing
- **Hero**: Top-of-page hero section.
- **Stats**: Section to display statistics or numbers.
- **Testimonials**: Section for user feedback and reviews.

## Development

To run the project locally for development:

```bash
pnpm dev
```

To build the library:

```bash
pnpm build
```

To run the linter:

```bash
pnpm lint
```

## License

Distributed under the MIT License. See `LICENSE` for more information.
