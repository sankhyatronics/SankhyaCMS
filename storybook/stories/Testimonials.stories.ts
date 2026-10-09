import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/testimonials';
import { renderElement } from './helpers';

const meta = {
  title: 'Components/Testimonials',
  component: 'st-testimonials',
  tags: ['autodocs'],
  args: {
    "title": "What customers say",
    "subtitle": "Real feedback",
    "items": [
      {
        "name": "Asha Rao",
        "role": "CTO",
        "company": "Acme",
        "quote": "We shipped our site in a week.",
        "rating": 5
      },
      {
        "name": "Lars Nielsen",
        "role": "Head of Product",
        "company": "Nordic AS",
        "quote": "Clean, fast and easy to theme.",
        "rating": 4
      }
    ]
  },
  render: renderElement('st-testimonials')
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};
