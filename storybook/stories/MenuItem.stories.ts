import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/menu-item';
import { renderElement } from './helpers';

const meta = {
  title: 'Components/MenuItem',
  component: 'st-menu-item',
  tags: ['autodocs'],
  args: {
    "title": "Pricing",
    "href": "#",
    "description": "Plans and quotes",
    "showDescription": true,
    "badge": "New",
    "active": false
  },
  render: renderElement('st-menu-item')
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Active: Story = { args: {
    "active": true
  } };

export const Compact: Story = { args: {
    "compact": true
  } };
