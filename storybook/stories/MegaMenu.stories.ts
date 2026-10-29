import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/header';
import '@sankhyatronics/sankhya-cms/dropdown';
import '@sankhyatronics/sankhya-cms/mega-menu';
import '@sankhyatronics/sankhya-cms/menu-item';

const link = (title: string, extra = '') => `<st-menu-item variant="link" title="${title}" href="#" ${extra}></st-menu-item>`;

const products = (open = '') => `
  <st-dropdown label="Products" mega open-on-hover ${open}>
    <st-mega-menu heading="Products" description="Our platforms protect every kind of identity — AI agents, customers, employees and partners." featured-heading="Platforms">
      <st-menu-item slot="intro" variant="link" title="Try it free" href="#"></st-menu-item>
      <st-menu-item slot="intro" variant="link" title="Pricing" href="#"></st-menu-item>
      <st-menu-item slot="intro" variant="link" title="Product innovations" href="#"></st-menu-item>
      <st-mega-menu-column>
        <st-mega-menu-column heading="Securing AI agents">
          ${link('AI for Agents', 'badge="New"')}${link('AI Identity for B2B', 'badge="New" target="_blank"')}${link('Cross App Access', 'badge="New"')}
        </st-mega-menu-column>
        <st-mega-menu-column heading="Identity and Access Management">
          ${link('Single Sign-On')}${link('Adaptive MFA')}${link('Device Access')}${link('Universal Directory')}
        </st-mega-menu-column>
      </st-mega-menu-column>
      <st-mega-menu-column>
        <st-mega-menu-column heading="Threat detection">
          ${link('Identity Security Posture Management')}${link('Identity Threat Protection')}
        </st-mega-menu-column>
        <st-mega-menu-column heading="Integrations">
          ${link('Integration Network')}${link('Secure Identity Integrations')}
        </st-mega-menu-column>
      </st-mega-menu-column>
      <st-mega-menu-feature slot="featured" variant="overlay" title="Platform" description="Protect all your identities with one security fabric." href="#"></st-mega-menu-feature>
      <st-mega-menu-feature slot="featured" variant="overlay" title="Customer Identity" description="Delightful sign-in experiences with enterprise-grade security." href="#" style="--st-mega-menu-feature-from: oklch(0.45 0.15 300); --st-mega-menu-feature-to: oklch(0.15 0.02 300)"></st-mega-menu-feature>
    </st-mega-menu>
  </st-dropdown>`;

const support = (open = '') => `
  <st-dropdown label="Support" mega open-on-hover ${open}>
    <st-mega-menu>
      <st-mega-menu-column variant="accent" heading="Resources" cta-label="All resources" cta-href="#">
        ${link('Webinars')}${link('Blog')}${link('Press')}${link('Events')}
      </st-mega-menu-column>
      <st-mega-menu-column variant="card" heading="Get support" cta-label="Support center" cta-href="https://example.com">
        ${link('Support center')}${link('Knowledge base', 'target="_blank"')}
      </st-mega-menu-column>
      <st-mega-menu-column variant="card" heading="Customer success" cta-label="All offerings" cta-href="#">
        ${link('Success plans')}${link('Professional services')}${link('Training')}
      </st-mega-menu-column>
      <st-mega-menu-column variant="card" heading="Community" cta-label="Join the community" cta-href="https://example.com">
        ${link('Forum', 'target="_blank"')}${link('Groups', 'target="_blank"')}
      </st-mega-menu-column>
    </st-mega-menu>
  </st-dropdown>`;

const meta = {
  title: 'Components/MegaMenu',
  component: 'st-mega-menu',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  render: header()
} satisfies Meta;

function header(open: 'products' | 'support' | '' = '', headerAttrs = '') {
  return () => `
    <st-header title="Sankhya" logo-href="#" ${headerAttrs}>
      <div slot="menu" style="display:flex;align-items:center;gap:0.25rem">
        ${products(open === 'products' ? 'open' : '')}${support(open === 'support' ? 'open' : '')}
      </div>
    </st-header>
    <div style="height: 1200px; padding: 2rem">Page content</div>`;
}

export default meta;
type Story = StoryObj;

/** Hover (or click) a section. Narrow the viewport below 900px for the phone drill-down. */
export const InHeader: Story = {};

/** Intro column, nested groups with badges and external links, overlay feature cards. */
export const ProductsOpen: Story = { render: header('products') };

/** Equal card columns with pill buttons — no intro or featured area. */
export const SupportOpen: Story = { render: header('support') };

/** The phone layout: hamburger panel open, drilled into Products (view below 900px wide). */
export const MobileDrillDown: Story = { render: header('products', 'mobile-open') };
