import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/bento-grid';
import { renderElement } from './helpers';

const meta = {
  title: 'Components/BentoGrid',
  component: 'st-bento-grid',
  tags: ['autodocs'],
  args: {
    "title": "Everything you need",
    "subtitle": "A flexible grid",
    "items": [
      {
        "title": "Fast",
        "description": "Native elements",
        "icon": "mdi:flash",
        "colSpan": 2,
        "rowSpan": 2
      },
      {
        "title": "Themeable",
        "description": "CSS variables",
        "icon": "mdi:palette",
        "colSpan": 2
      },
      {
        "title": "Accessible",
        "description": "Keyboard friendly",
        "icon": "mdi:human",
        "colSpan": 1
      },
      {
        "title": "Linkable",
        "description": "Whole card is a link",
        "icon": "mdi:link",
        "colSpan": 1,
        "href": "#"
      }
    ]
  },
  render: renderElement('st-bento-grid')
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};
