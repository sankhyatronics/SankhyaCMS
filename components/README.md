# @sankhyatronics/omniportal

The core UI library for the OmniPortal system. Build dynamic, JSON-driven portals with ease.

## Installation

```bash
pnpm add @sankhyatronics/omniportal
```

## Quick Start

```tsx
import { DynamicRenderer } from '@sankhyatronics/omniportal';
import '@sankhyatronics/omniportal/styles';

const pageData = [
  {
    type: "Hero",
    data: {
      Title: "Hello World",
      SubTitle: "Welcome to my portal"
    }
  }
];

function App() {
  return <DynamicRenderer data={pageData} />;
}
```

## Features
- **Highly Modular**: Each component is independent and purely visual.
- **CMS Ready**: Designed to work with Storyblok, Contentful, or custom JSON backends.
- **Tailwind Integrated**: Uses Tailwind CSS for modern, responsive designs.
