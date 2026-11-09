import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/hero';
import { renderElement } from './helpers';
import { heroSlides } from './samples';

const meta = {
  title: 'Components/Hero',
  component: 'st-hero',
  tags: ['autodocs'],
  args: {
    "title": "Build portals from JSON",
    "subtitle": "Lit components with React bindings.",
    "actionLabel": "Get started",
    "href": "#",
    "textAlignment": "left",
    "padding": "large",
    "focalPoint": "center",
    "imageSrc": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600"
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['auto', 'large', 'full'] },
    contentPosition: { control: 'inline-radio', options: ['center', 'bottom'] },
    overlay: { control: 'inline-radio', options: ['even', 'gradient', 'none'] },
    textAlignment: { control: 'inline-radio', options: ['left', 'center', 'right', 'justify'] }
  },
  render: renderElement('st-hero')
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Centered: Story = { args: {
    "textAlignment": "center"
  } };

export const NoImage: Story = { args: {
    "imageSrc": ""
  } };

/** Large editorial hero: eyebrow, two buttons, copy on the lower left over a gradient. */
export const Editorial: Story = {
  args: {
    eyebrow: heroSlides[0].eyebrow,
    title: heroSlides[0].title,
    subtitle: heroSlides[0].subtitle,
    actionLabel: heroSlides[0].actionLabel,
    secondaryActionLabel: heroSlides[0].secondaryActionLabel,
    secondaryHref: '#',
    imageSrc: heroSlides[0].imageSrc,
    padding: 'none',
    size: 'large',
    contentPosition: 'bottom',
    overlay: 'gradient'
  }
};

export const EditorialCentered: Story = {
  args: { ...Editorial.args, textAlignment: 'center', overlay: 'even' }
};

/** Copy beside the image on the page surface, with a badge and check-marked highlights. */
export const Split: Story = {
  args: {
    layout: 'split',
    badge: 'New in 0.2',
    title: 'Ship portals from JSON',
    subtitle: 'Lit components with React bindings, themed with CSS variables.',
    imageAlt: 'Dashboard on a laptop',
    imageSrc: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200',
    highlights: ['Themeable', 'Accessible', 'Responsive'],
    actionLabel: 'Get started',
    href: '#',
    secondaryActionLabel: 'Read the docs',
    secondaryHref: '#'
  }
};

/** The badge and highlights on the default background layout. */
export const BadgeAndHighlights: Story = {
  args: {
    badge: 'Now available',
    highlights: ['No build step', 'Dark mode', 'Screen-reader friendly'],
    actionLabel: 'Get started',
    href: '#'
  }
};
