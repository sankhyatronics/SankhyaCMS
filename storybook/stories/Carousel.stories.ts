import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/carousel';
import '@sankhyatronics/sankhya-cms/hero';
import { renderElement } from './helpers';
import { heroSlidesMarkup } from './samples';

const meta = {
  title: 'Components/Carousel',
  component: 'st-carousel',
  tags: ['autodocs'],
  args: {
    "autoPlay": false,
    "interval": 4000,
    "showArrows": true,
    "showIndicators": true
  },
  argTypes: {
    indicatorStyle: { control: 'inline-radio', options: ['dots', 'tabs'] },
    transition: { control: 'inline-radio', options: ['slide', 'fade'] }
  },
  render: renderElement('st-carousel', "<div style=\"padding:4rem;text-align:center\">Slide 1</div><div style=\"padding:4rem;text-align:center\">Slide 2</div><div style=\"padding:4rem;text-align:center\">Slide 3</div>")
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const AutoPlay: Story = { args: {
    "autoPlay": true
  } };

/** Tabbed hero carousel: labelled tabs with progress bars, fade between full-bleed heroes. */
export const HeroCarousel: Story = {
  args: {
    autoPlay: true,
    interval: 7000,
    showArrows: false,
    indicatorStyle: 'tabs',
    transition: 'fade'
  },
  parameters: { layout: 'fullscreen' },
  render: renderElement('st-carousel', heroSlidesMarkup())
};

/** Tab labels set on the carousel instead of on each slide. */
export const TabLabels: Story = {
  args: {
    ...HeroCarousel.args,
    tabLabels: ['On demand', 'JSON portals', 'Platform']
  },
  parameters: { layout: 'fullscreen' },
  render: renderElement('st-carousel', heroSlidesMarkup())
};
