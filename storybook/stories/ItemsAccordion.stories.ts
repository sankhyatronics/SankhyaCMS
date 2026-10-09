import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/items-accordion';
import { renderElement } from './helpers';

const meta = {
  title: 'Components/ItemsAccordion',
  component: 'st-items-accordion',
  tags: ['autodocs'],
  args: {
    "title": "FAQ",
    "subtitle": "Common questions",
    "allowMultiple": false,
    "items": [
      {
        "id": "a",
        "title": "What is it?",
        "content": "A set of Lit components for portals."
      },
      {
        "id": "b",
        "title": "Can I use React?",
        "content": "Yes — see sankhya-cms-react."
      }
    ]
  },
  render: renderElement('st-items-accordion')
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const AllowMultiple: Story = { args: {
    "allowMultiple": true
  } };
