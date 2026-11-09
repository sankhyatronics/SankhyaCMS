import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/tag-strip';
import { renderElement } from './helpers';

const meta = {
  title: 'Components/TagStrip',
  component: 'st-tag-strip',
  tags: ['autodocs'],
  args: {
    label: 'Works with',
    items: ['AWS', 'Azure', 'Google Cloud', 'React', 'Node.js']
  },
  argTypes: {
    items: { control: 'object' }
  },
  parameters: { layout: 'fullscreen' },
  render: renderElement('st-tag-strip')
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const WithoutLabel: Story = { args: { label: '' } };

export const Inverted: Story = { args: { inverted: true } };
