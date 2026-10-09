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
