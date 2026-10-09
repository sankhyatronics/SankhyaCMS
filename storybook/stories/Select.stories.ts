import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/select';
import { renderElement } from './helpers';

const meta = {
  title: 'Components/Select',
  component: 'st-select',
  tags: ['autodocs'],
  args: {
    "options": [
      {
        "value": "en",
        "label": "English"
      },
      {
        "value": "da",
        "label": "Dansk"
      }
    ],
    "value": "en",
    "fieldLabel": "Language",
    "placeholder": "Choose…"
  },
  render: renderElement('st-select')
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Disabled: Story = { args: {
    "disabled": true
  } };
