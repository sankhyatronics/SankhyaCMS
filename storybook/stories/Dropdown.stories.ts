import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/dropdown';
import '@sankhyatronics/sankhya-cms/menu-grid';
import '@sankhyatronics/sankhya-cms/menu-grid-item';
import { renderElement } from './helpers';

const meta = {
  title: 'Components/Dropdown',
  component: 'st-dropdown',
  tags: ['autodocs'],
  args: {
    "label": "Services",
    "align": "left",
    "iconPosition": "left"
  },
  render: renderElement('st-dropdown', "<st-menu-grid columns=\"1\"><st-menu-grid-item title=\"Consulting\" href=\"#\"></st-menu-grid-item><st-menu-grid-item title=\"Development\" href=\"#\"></st-menu-grid-item></st-menu-grid>")
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const AlignRight: Story = { args: {
    "align": "right"
  } };
