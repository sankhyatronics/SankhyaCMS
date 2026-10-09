import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/cookie-consent';
import { renderElement } from './helpers';

const meta = {
  title: 'Components/CookieConsent',
  component: 'st-cookie-consent',
  tags: ['autodocs'],
  args: {
    "message": "We use cookies to improve your experience.",
    "acceptButtonText": "Accept",
    "refuseButtonText": "Refuse",
    "privacyPolicyLink": "#",
    "privacyPolicyText": "Privacy policy",
    "storageKey": "story-cookie-consent"
  },
  render: renderElement('st-cookie-consent')
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};
