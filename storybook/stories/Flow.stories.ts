import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/flow';
import { renderElement } from './helpers';

const nodes = [
  { label: 'Browser', caption: 'Renders the page', variant: 'outline' },
  { label: 'Portal', caption: 'Reads the JSON', variant: 'solid' },
  { label: 'CMS', caption: 'Serves the content', variant: 'accent' },
  { label: 'Publish', caption: 'Goes live', variant: 'solid' }
];

const meta = {
  title: 'Components/Flow',
  component: 'st-flow',
  tags: ['autodocs'],
  args: {
    label: 'Request flow',
    nodes
  },
  argTypes: {
    nodes: { control: 'object' }
  },
  parameters: { layout: 'fullscreen' },
  render: renderElement('st-flow')
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Inverted: Story = { args: { inverted: true } };

export const Minimal: Story = { args: { nodes: [{ label: 'Draft' }, { label: 'Review' }, { label: 'Publish' }] } };
