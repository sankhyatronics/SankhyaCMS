import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/contact-form';
import { renderElement } from './helpers';

/**
 * Storybook has no contact API. These stories answer submissions sent to MOCK_ENDPOINT with the response
 * their `render` chooses; every other request goes to the network as usual.
 */
const MOCK_ENDPOINT = 'https://contact.example.test/api/contact';

const json = (status: number, body: unknown, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...headers } });

let respond: () => Response = () => json(201, { ok: true, reference: 'INQ-1234' });
const networkFetch = window.fetch.bind(window);
window.fetch = (input, init) => (String(input) === MOCK_ENDPOINT ? Promise.resolve(respond()) : networkFetch(input, init));

function withResponse(answer: () => Response) {
  return (args: Args) => {
    respond = answer;
    return renderElement('st-contact-form')(args);
  };
}

const TOPICS = [
  { value: 'sales', label: 'Sales', group: 'Products' },
  { value: 'pilot', label: 'Pilot programme', group: 'Products' },
  { value: 'partner', label: 'Partnership', group: 'Work with us' },
  { value: 'support', label: 'Support' }
];

const meta = {
  title: 'Components/ContactForm',
  component: 'st-contact-form',
  tags: ['autodocs'],
  args: {
    endpoint: MOCK_ENDPOINT,
    topics: TOPICS
  },
  render: withResponse(() => json(201, { ok: true, reference: 'INQ-1234' }))
} satisfies Meta;

export default meta;
type Story = StoryObj;

/** Topics in groups. Submitting shows the reference from the mocked 201 answer. */
export const Default: Story = {};

/** The topic from `defaultTopic` is preselected when the page URL names no topic. */
export const PreselectedTopic: Story = { args: {
    defaultTopic: 'pilot'
  } };

/** A privacy line above the button, with a link to the policy. */
export const WithPrivacyNote: Story = { args: {
    privacyNote: 'We use your details only to reply to your enquiry.',
    privacyHref: '/privacy-policy'
  } };

/** The server rejects the e-mail address and an unknown field. The input is kept. */
export const ServerValidation: Story = {
  render: withResponse(() => json(400, { ok: false, errors: { email: 'This address cannot receive mail.', body: 'Please check the form.' } }))
};

/** The server asks the visitor to wait 30 seconds. */
export const RateLimited: Story = {
  render: withResponse(() => json(429, { ok: false }, { 'Retry-After': '30' }))
};

/** The API is down. The error note is shown and the input is kept. */
export const Unavailable: Story = {
  render: withResponse(() => json(503, { ok: false }))
};

/** No endpoint is set: the form renders, and submitting shows the error note without sending anything. */
export const NotConfigured: Story = { args: {
    endpoint: ''
  } };
