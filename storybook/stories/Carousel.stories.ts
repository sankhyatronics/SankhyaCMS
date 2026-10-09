import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/carousel';
import { renderElement } from './helpers';

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
  render: renderElement('st-carousel', "<div style=\"padding:4rem;text-align:center\">Slide 1</div><div style=\"padding:4rem;text-align:center\">Slide 2</div><div style=\"padding:4rem;text-align:center\">Slide 3</div>")
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const AutoPlay: Story = { args: {
    "autoPlay": true
  } };
