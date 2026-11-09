import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/steps';
import { renderElement } from './helpers';

const steps = [
  { title: 'Describe', description: 'Write the page as JSON, one flat node per component.' },
  { title: 'Validate', description: 'The schema checks every node before anything renders.' },
  { title: 'Publish', description: 'Ship it with the rest of the site, no redeploy of the portal.' }
];

const meta = {
  title: 'Components/Steps',
  component: 'st-steps',
  tags: ['autodocs'],
  args: {
    eyebrow: 'How it works',
    title: 'Three steps to a live page',
    subtitle: 'From a brief to a published page.',
    items: steps
  },
  argTypes: {
    items: { control: 'object' }
  },
  parameters: { layout: 'fullscreen' },
  render: renderElement('st-steps')
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

/** The final card becomes a dark navy call-out. */
export const HighlightLast: Story = { args: { highlightLast: true } };

/** The whole block on the dark band. */
export const Inverted: Story = { args: { inverted: true, highlightLast: true } };

export const FourSteps: Story = {
  args: {
    highlightLast: true,
    items: [...steps, { title: 'Measure', description: 'Watch the numbers and iterate.' }]
  }
};
