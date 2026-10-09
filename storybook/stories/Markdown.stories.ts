import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/markdown';
import { renderElement } from './helpers';

const meta = {
  title: 'Components/Markdown',
  component: 'st-markdown',
  tags: ['autodocs'],
  args: {
    "content": "# Hello\n\nRendered **safely** with `marked` + DOMPurify."
  },
  render: renderElement('st-markdown')
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};
