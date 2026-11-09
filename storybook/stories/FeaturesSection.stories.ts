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

/** `eyebrow` above the title; the title is an `h2`, each tile's title an `h3`. */
export const WithEyebrow: Story = { args: {
    "eyebrow": "Why Sankhya"
  } };

/** Five tiles in three columns: `align="center"` centres the incomplete last row (3 + 2). */
export const CenteredRows: Story = { args: {
    "eyebrow": "Why Sankhya",
    "columns": 3,
    "align": "center",
    "items": [
      { "icon": "mdi:rocket-launch", "title": "Fast", "description": "Native custom elements." },
      { "icon": "mdi:palette", "title": "Themeable", "description": "Every colour is a custom property." },
      { "icon": "mdi:puzzle", "title": "Composable", "description": "Nest components in slots." },
      { "icon": "mdi:shield-check", "title": "Accessible", "description": "Real links, headings and labels." },
      { "icon": "mdi:code-tags", "title": "Typed", "description": "Every prop has a TypeScript type." }
    ]
  } };

/** Inverted: light text on the dark band, with the eyebrow in the highlight colour. */
export const Inverted: Story = { args: {
    "eyebrow": "Why Sankhya",
    "inverted": true
  } };
