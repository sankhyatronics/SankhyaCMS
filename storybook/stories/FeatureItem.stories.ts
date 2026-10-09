import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/features-section';
import { renderElement } from './helpers';

const meta = {
  title: 'Components/FeatureItem',
  component: 'st-feature-item',
  tags: ['autodocs'],
  args: {
    "icon": "mdi:rocket-launch",
    "title": "Fast",
    "description": "Ships as native custom elements.",
    "href": "#",
    "actionLabel": "More"
  },
  render: renderElement('st-feature-item')
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};
