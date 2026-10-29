import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '@sankhyatronics/sankhya-cms/carousel';
import '@sankhyatronics/sankhya-cms/header';
import '@sankhyatronics/sankhya-cms/hero';
import '@sankhyatronics/sankhya-cms/menu-item';
import '@sankhyatronics/sankhya-cms/section';
import '@sankhyatronics/sankhya-cms/stats';
import '@sankhyatronics/sankhya-cms/testimonials';
import { customerStories, heroSlidesMarkup } from './samples';

/**
 * An enterprise marketing home page put together from the base components: a transparent header
 * over a tabbed hero carousel, a dark section band and a customer-story carousel.
 */
const meta = {
  title: 'Pages/Landing page',
  parameters: { layout: 'fullscreen' }
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const page = document.createElement('div');
    page.innerHTML = `
      <st-header title="Sankhyatronics" logo-href="#" transparent hide-on-scroll>
        <div slot="menu" style="display:flex;gap:.5rem">
          <st-menu-item title="Platform" href="#"></st-menu-item>
          <st-menu-item title="Solutions" href="#"></st-menu-item>
          <st-menu-item title="Customers" href="#"></st-menu-item>
          <st-menu-item title="Pricing" href="#"></st-menu-item>
        </div>
      </st-header>
      <st-carousel indicator-style="tabs" transition="fade" interval="7000"></st-carousel>
      <st-section background="dark" spacing-above="l" spacing-below="xxl" text-alignment="center"
        eyebrow="Ecosystem" title="No one can build the composable web alone"
        subtitle="One schema, one component set, every framework your teams already use.">
        <st-stats inverted style="background:transparent;padding:0"></st-stats>
      </st-section>
      <st-testimonials layout="carousel" title="Powering sites for global brands, governments & counting"
        action-label="Explore customer stories" action-href="#"></st-testimonials>
    `;
    const carousel = page.querySelector('st-carousel') as HTMLElement & { showArrows: boolean };
    carousel.showArrows = false;
    carousel.innerHTML = heroSlidesMarkup();
    Object.assign(page.querySelector('st-stats')!, {
      items: [
        { value: '99.9%', label: 'Uptime' },
        { value: '120+', label: 'Customers' },
        { value: '30', label: 'Markets' }
      ]
    });
    Object.assign(page.querySelector('st-testimonials')!, { items: customerStories });
    return page;
  }
};
