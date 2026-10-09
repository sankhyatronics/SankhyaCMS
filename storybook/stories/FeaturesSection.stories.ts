import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/features-section';
import { renderElement } from './helpers';

const meta = {
  title: 'Components/FeaturesSection',
  component: 'st-features-section',
  tags: ['autodocs'],
  args: {
    "title": "Features",
    "subtitle": "Tiles from the items property",
    "columns": 3,
    "items": [
      {
        "icon": "mdi:rocket-launch",
        "title": "Fast",
        "description": "Ships as native custom elements — no framework runtime."
      },
      {
        "icon": "mdi:palette",
        "title": "Themeable",
        "description": "Every colour and size is a CSS custom property."
      },
      {
        "icon": "mdi:puzzle",
        "title": "Composable",
        "description": "Nest components in slots; drive pages from JSON."
      }
    ]
  },
  render: renderElement('st-features-section')
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const TwoColumns: Story = { args: {
    "columns": 2
  } };
