import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/testimonials';
import { renderElement } from './helpers';
import { customerStories } from './samples';

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
  argTypes: {
    layout: { control: 'inline-radio', options: ['grid', 'carousel'] }
  },
  render: renderElement('st-testimonials')
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

/** Customer-story carousel: logo, image, headline, metrics and a story link per card. */
export const CustomerCarousel: Story = {
  args: {
    title: 'Powering sites for global brands, governments & counting',
    subtitle: '',
    layout: 'carousel',
    actionLabel: 'Explore customer stories',
    actionHref: '#',
    items: customerStories
  }
};

export const CustomerCarouselInverted: Story = {
  args: { ...CustomerCarousel.args, inverted: true }
};

export const StoryGrid: Story = {
  args: { ...CustomerCarousel.args, layout: 'grid', items: customerStories.slice(0, 3) }
};
