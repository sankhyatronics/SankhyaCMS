# @sankhyatronics/SankhyaCMS

The core UI library for the SankhyaCMS system. Build dynamic, JSON-driven portals with ease.

## Installation

```bash
pnpm add @sankhyatronics/SankhyaCMS
```

## Quick Start

```tsx
import { DynamicRenderer } from '@sankhyatronics/SankhyaCMS';
import '@sankhyatronics/SankhyaCMS/styles';

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
