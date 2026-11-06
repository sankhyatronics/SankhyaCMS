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

/** Brand-colour banner with a white primary button. */
export const Accent: Story = { args: {
    "variant": "accent"
  } };

/** Two outlined buttons. */
export const TwoActions: Story = { args: {
    "secondaryActionLabel": "See pricing",
    "secondaryHref": "#pricing"
  } };

/** Accent banner with two buttons: the primary is white, the outlined secondary white on the brand fill. */
export const AccentTwoActions: Story = { args: {
    "variant": "accent",
    "secondaryActionLabel": "See pricing",
    "secondaryHref": "/pricing"
  } };
