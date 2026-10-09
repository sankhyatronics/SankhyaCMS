import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/feature-split';
import { renderElement } from './helpers';

const meta = {
  title: 'Components/FeatureSplit',
  component: 'st-feature-split',
  tags: ['autodocs'],
  args: {
    "title": "Why it works",
    "subtitle": "Image beside a feature list",
    "imageSrc": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200",
    "imageAlt": "Dashboard",
    "imagePosition": "left",
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
    ],
    "actionLabel": "Learn more",
    "href": "#"
  },
  render: renderElement('st-feature-split')
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const ImageRight: Story = { args: {
    "imagePosition": "right"
  } };

export const ImageTop: Story = { args: {
    "imagePosition": "top"
  } };
