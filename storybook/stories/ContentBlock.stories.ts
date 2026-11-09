import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/content-block';
import { renderElement } from './helpers';

const meta = {
  title: 'Components/ContentBlock',
  component: 'st-content-block',
  tags: ['autodocs'],
  args: {
    "title": "About us",
    "subtitle": "Markdown content",
    "content": "## Heading\n\nSome **markdown** with a [link](https://sankhyatronics.com).\n\n- one\n- two"
  },
  render: renderElement('st-content-block')
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const WithImage: Story = { args: {
    "imageSrc": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200",
    "imageAlt": "Team",
    "imageCaption": "Our team"
  } };

/** `heading-level="3"`: a sub-section title (an `h3`), smaller and lighter than the section title. */
export const SubsectionHeading: Story = { args: {
    "title": "Getting started",
    "headingLevel": 3
  } };

/** An eyebrow above the title, in the same style as the steps and section eyebrows. */
export const WithEyebrow: Story = { args: {
    "eyebrow": "Our story",
    "title": "Built for enterprise portals"
  } };

/** `text-alignment="center"`: eyebrow, title, subtitle and body all centred. */
export const Centered: Story = { args: {
    "eyebrow": "Our story",
    "title": "Built for enterprise portals",
    "subtitle": "Centred",
    "textAlignment": "center"
  } };
