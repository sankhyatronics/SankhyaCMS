---
sidebar_position: 2
---

# Installation

Install SankhyaUI and its peer dependencies using your preferred package manager:

```bash npm2yarn
npm install @sankhyatronics/sankhya-ui
```

## Storybook

You can access the Storybook documentation here: [https://sankhyaui-stories.sankhyatronics.com/](https://sankhyaui-stories.sankhyatronics.com/)

## Quick Start

### 1. Basic Usage

You can import and use any component directly in your React application:

```tsx
import { Hero, Button } from '@sankhyatronics/sankhya-ui';

function App() {
  return (
    <Hero
      title="Welcome to SankhyaUI"
      subtitle="Building the future of digital experiences."
      actionLabel="Get Started"
      imageSrc="/hero-image.jpg"
    />
  );
}
```

### 2. Dynamic Rendering (CMS Usage)

The core strength of SankhyaUI lies in its `DynamicRenderer`. This component takes a JSON structure (typically fetched from a Headless CMS API) and automatically renders the corresponding components.

```tsx
import { DynamicRenderer } from '@sankhyatronics/sankhya-ui';

// Example JSON response from your CMS
const pageData = [
  {
    type: "Hero",
    data: {
      title: "Dynamic Page Building",
      subtitle: "Powered by JSON",
      imageSrc: "https://example.com/image.jpg"
    }
  },
  {
    type: "Stats",
    data: {
      items: [
        { label: "Components", value: "20+" },
        { label: "Downloads", value: "10k" }
      ]
    }
  }
];

function Page() {
  return <DynamicRenderer data={pageData} />;
}
```

## Component Library

SankhyaUI offers a comprehensive set of components categorized for different needs:

- **Layout**: `BentoGrid`, `Card`, `ContentBlock`, `FeatureSplit`
- **Marketing**: `Hero`, `Carousel`, `Stats`, `Testimonials`, `CTASection`
- **Navigation**: `Header`, `Footer`, `MenuGrid`, `Dropdown`
- **Forms & Actions**: `Select`, `IconButton`


