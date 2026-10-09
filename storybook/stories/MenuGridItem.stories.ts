import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/menu-grid-item';
import { renderElement } from './helpers';

const meta = {
  title: 'Components/MenuGridItem',
  component: 'st-menu-grid-item',
  tags: ['autodocs'],
  args: {
    "title": "Consulting",
    "description": "Advice and strategy",
    "href": "#",
    "showDescription": true,
    "badge": ""
  },
  render: renderElement('st-menu-grid-item')
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Compact: Story = { args: {
    "compact": true
  } };
