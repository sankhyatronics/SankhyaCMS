import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/footer';
import { renderElement } from './helpers';

const meta = {
  title: 'Components/Footer',
  component: 'st-footer',
  tags: ['autodocs'],
  args: {
    "companyName": "Sankhyatronics",
    "poweredBy": "SankhyaCMS",
    "poweredByLink": "https://sankhyatronics.com"
  },
  render: renderElement('st-footer')
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Site: Story = { args: {
    "imageSrc": "https://sankhyatronics.com/images/Icon_flat_color.svg",
    "description": "Software for people who run things.",
    "socialLinks": [
      {
        "icon": "mdi:github",
        "href": "https://github.com/sankhyatronics"
      }
    ],
    "columns": [
      {
        "title": "Policies",
        "links": [
          {
            "label": "Privacy",
            "href": "/privacy"
          },
          {
            "label": "Terms",
            "href": "/terms"
          }
        ]
      },
      {
        "title": "Company",
        "links": [
          {
            "label": "Contact",
            "href": "/contact"
          }
        ]
      }
    ]
  } };

export const Inverted: Story = { args: {
    "inverted": true
  } };
