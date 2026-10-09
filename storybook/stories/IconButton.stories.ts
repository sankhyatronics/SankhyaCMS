import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/icon-button';
import { renderElement } from './helpers';

const meta = {
  title: 'Components/IconButton',
  component: 'st-icon-button',
  tags: ['autodocs'],
  args: {
    "label": "Toggle theme",
    "disabled": false
  },
  render: renderElement('st-icon-button', "<iconify-icon icon=\"mdi:theme-light-dark\"></iconify-icon>")
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Disabled: Story = { args: {
    "disabled": true
  } };
