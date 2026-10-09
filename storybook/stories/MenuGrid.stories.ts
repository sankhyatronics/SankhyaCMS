import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/menu-grid';
import '@sankhyatronics/sankhya-cms/menu-grid-item';
import { renderElement } from './helpers';

const meta = {
  title: 'Components/MenuGrid',
  component: 'st-menu-grid',
  tags: ['autodocs'],
  args: {
    "columns": 2
  },
  render: renderElement('st-menu-grid', "<st-menu-grid-item title=\"Consulting\" description=\"Advice\" href=\"#\"></st-menu-grid-item><st-menu-grid-item title=\"Development\" description=\"Build\" href=\"#\"></st-menu-grid-item><st-menu-grid-item title=\"Support\" description=\"Run\" href=\"#\"></st-menu-grid-item>")
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};
