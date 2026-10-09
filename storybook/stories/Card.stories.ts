import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/card';
import { renderElement } from './helpers';

const meta = {
  title: 'Components/Card',
  component: 'st-card',
  tags: ['autodocs'],
  args: {
    "variant": "default",
    "padding": "medium",
    "elevation": "sm",
    "hoverable": false
  },
  render: renderElement('st-card', "<strong>Card title</strong><p>Content goes in the default slot.</p>")
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Bordered: Story = { args: {
    "variant": "bordered"
  } };

export const Hoverable: Story = { args: {
    "hoverable": true,
    "elevation": "md"
  } };
