import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/section';
import '@sankhyatronics/sankhya-cms/stats';
import { renderElement } from './helpers';

const spacing = ['none', 's', 'm', 'l', 'xl', 'xxl'];

const meta = {
  title: 'Components/Section',
  component: 'st-section',
  tags: ['autodocs'],
  args: {
    eyebrow: 'Why it matters',
    title: 'No one can build the composable web alone',
    subtitle: 'Sections set the backdrop, spacing and width; put any components inside.',
    background: 'default',
    spacingAbove: 'l',
    spacingBelow: 'xl',
    width: 'contained',
    textAlignment: 'left'
  },
  argTypes: {
    background: { control: 'inline-radio', options: ['default', 'subtle', 'dark', 'accent', 'transparent'] },
    spacingAbove: { control: 'inline-radio', options: spacing },
    spacingBelow: { control: 'inline-radio', options: spacing },
    width: { control: 'inline-radio', options: ['contained', 'narrow', 'full'] },
    textAlignment: { control: 'inline-radio', options: ['left', 'center'] }
  },
  parameters: { layout: 'fullscreen' },
  render: renderElement(
    'st-section',
    '<p style="margin:0;font-size:1.125rem;line-height:1.6;max-width:60ch">Slotted content goes here — any element or component.</p>'
  )
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Dark: Story = { args: { background: 'dark', spacingBelow: 'xxl' } };

export const Subtle: Story = { args: { background: 'subtle', textAlignment: 'center' } };

/** A dark band wrapping another component (its own background made transparent). */
export const DarkWithStats: Story = {
  args: { background: 'dark', textAlignment: 'center', title: 'Trusted at scale', subtitle: '', eyebrow: '' },
  render: args => {
    const section = renderElement('st-section')(args);
    const stats = Object.assign(document.createElement('st-stats'), {
      inverted: true,
      items: [
        { value: '99.9%', label: 'Uptime' },
        { value: '120+', label: 'Customers' },
        { value: '24/7', label: 'Support' }
      ]
    });
    stats.style.cssText = 'background:transparent;padding:0';
    section.append(stats);
    return section;
  }
};
