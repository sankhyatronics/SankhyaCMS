import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/header';
import '@sankhyatronics/sankhya-cms/hero';
import '@sankhyatronics/sankhya-cms/menu-item';
import { renderElement } from './helpers';
import { heroSlides } from './samples';

const menu = "<div slot=\"menu\" style=\"display:flex;gap:.5rem\"><st-menu-item title=\"Home\" href=\"#\"></st-menu-item><st-menu-item title=\"Products\" href=\"#\"></st-menu-item><st-menu-item title=\"Pricing\" href=\"#\"></st-menu-item></div>";

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
  render: renderElement('st-header', menu)
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

/** The header with tall content after it, so the scroll states can be tried in the canvas. */
function withPage(args: Record<string, unknown>, hero: boolean): HTMLElement {
  const page = document.createElement('div');
  page.append(renderElement('st-header', menu)(args));
  if (hero) {
    const slide = heroSlides[1];
    page.append(
      Object.assign(document.createElement('st-hero'), {
        eyebrow: slide.eyebrow,
        title: slide.title,
        subtitle: slide.subtitle,
        actionLabel: slide.actionLabel,
        secondaryActionLabel: slide.secondaryActionLabel,
        imageSrc: slide.imageSrc,
        size: 'full',
        contentPosition: 'bottom',
        overlay: 'gradient'
      })
    );
  }
  const filler = document.createElement('div');
  filler.style.cssText = 'height:150vh;padding:2rem;font:1rem/1.6 system-ui';
  filler.textContent = 'Scroll the canvas to see the header change.';
  page.append(filler);
  return page;
}

/** Sticky header that gains a shadow (`scrolled`) once the page scrolls. */
export const StickyScrolled: Story = {
  args: { sticky: true },
  parameters: { layout: 'fullscreen' },
  render: args => withPage(args, false)
};

/** See-through over a dark hero with light text; turns solid once scrolled. */
export const TransparentOverHero: Story = {
  args: { transparent: true },
  parameters: { layout: 'fullscreen' },
  render: args => withPage(args, true)
};

/** Slides away while scrolling down, comes back on scroll up. */
export const HideOnScroll: Story = {
  args: { sticky: true, hideOnScroll: true },
  parameters: { layout: 'fullscreen' },
  render: args => withPage(args, false)
};

const menuIcon =
  '<svg slot="menu-icon" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="3" rx="1.5" fill="#3f59b7"/><rect x="3" y="10.5" width="12" height="3" rx="1.5" fill="#f0b429"/><rect x="3" y="16" width="18" height="3" rx="1.5" fill="#3f59b7"/></svg>';
const closeIcon =
  '<svg slot="close-icon" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#fde2e2"/><path d="m8 8 8 8M16 8l-8 8" stroke="#c0392b" stroke-width="2.2" stroke-linecap="round"/></svg>';

/** Narrow the canvas below 900px: the toggle shows the host's own `menu-icon` / `close-icon` instead of the built-in glyphs. */
export const CustomToggleIcons: Story = {
  args: { languages: [] },
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: renderElement('st-header', `${menu}${menuIcon}${closeIcon}`)
};
