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
