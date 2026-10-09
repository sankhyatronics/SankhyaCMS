import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/hero';
import { renderElement } from './helpers';

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
