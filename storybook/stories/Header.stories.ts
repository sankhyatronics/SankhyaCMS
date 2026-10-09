import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/header';
import '@sankhyatronics/sankhya-cms/menu-item';
import { renderElement } from './helpers';

const meta = {
  title: 'Components/Header',
  component: 'st-header',
  tags: ['autodocs'],
  args: {
    "title": "Sankhyatronics",
    "sticky": false,
    "logoHref": "#",
    "languages": [
      {
        "code": "en",
        "label": "English"
      },
      {
        "code": "da",
        "label": "Dansk"
      }
    ],
    "currentLanguageCode": "en"
  },
  render: renderElement('st-header', "<div slot=\"menu\" style=\"display:flex;gap:.5rem\"><st-menu-item title=\"Home\" href=\"#\"></st-menu-item><st-menu-item title=\"Pricing\" href=\"#\"></st-menu-item></div>")
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};
