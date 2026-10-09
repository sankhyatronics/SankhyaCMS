import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/stats';
import { renderElement } from './helpers';

const meta = {
  title: 'Components/Stats',
  component: 'st-stats',
  tags: ['autodocs'],
  args: {
    "items": [
      {
        "value": "99.9%",
        "label": "Uptime",
        "description": "Last 12 months"
      },
      {
        "value": "120+",
        "label": "Customers"
      },
      {
        "value": "24/7",
        "label": "Support"
      }
    ]
  },
  render: renderElement('st-stats')
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Inverted: Story = { args: {
    "inverted": true
  } };
