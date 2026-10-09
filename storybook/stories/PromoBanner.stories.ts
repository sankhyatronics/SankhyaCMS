import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/promo-banner';
import { renderElement } from './helpers';

const meta = {
  title: 'Components/PromoBanner',
  component: 'st-promo-banner',
  tags: ['autodocs'],
  args: {
    "title": "New: JSON-driven pages",
    "subtitle": "Write content, not markup.",
    "actionLabel": "Read more",
    "href": "#"
  },
  render: renderElement('st-promo-banner')
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Inverted: Story = { args: {
    "inverted": true
  } };
