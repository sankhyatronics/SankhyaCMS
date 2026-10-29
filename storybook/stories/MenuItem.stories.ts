import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/menu-item';
import { renderElement } from './helpers';

const meta = {
  title: 'Components/MenuItem',
  component: 'st-menu-item',
  tags: ['autodocs'],
  args: {
    "title": "Pricing",
    "href": "#",
    "description": "Plans and quotes",
    "showDescription": true,
    "badge": "New",
    "active": false
  },
  render: renderElement('st-menu-item')
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Active: Story = { args: {
    "active": true
  } };

export const Compact: Story = { args: {
    "compact": true
  } };

export const Bar: Story = { args: {
    "variant": "bar",
    "title": "Dashboard",
    "badge": "",
    "showDescription": false,
    "active": true
  } };

/** `icon-size` lifts the slotted icon past its 16px (14px compact) default, e.g. for colour picture icons in a header bar. */
export const LargeIcon: Story = {
  args: { compact: true, title: 'Reports', description: '', badge: '', iconSize: '36px' },
  render: renderElement(
    'st-menu-item',
    '<svg slot="icon" viewBox="0 0 24 24"><rect x="3" y="12" width="4" height="9" rx="1" fill="#3f59b7"/><rect x="10" y="7" width="4" height="14" rx="1" fill="#f0b429"/><rect x="17" y="3" width="4" height="18" rx="1" fill="#2bb673"/></svg>'
  )
};
