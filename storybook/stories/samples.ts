/** Sample content shared by the hero-carousel, customer-carousel and landing-page stories. */

const image = (id: string) => `https://images.unsplash.com/${id}?w=1920&q=70&auto=format&fit=crop`;

export const heroSlides = [
  {
    tab: 'Product launch on demand',
    eyebrow: 'Launch week on demand',
    title: 'Welcome to the composable web',
    subtitle: 'Missed the livestream? Catch up on the new component suite and our latest platform features.',
    actionLabel: 'Watch now',
    secondaryActionLabel: 'Read the highlights',
    imageSrc: image('photo-1451187580459-43490279c0fa')
  },
  {
    tab: 'Portals from JSON',
    eyebrow: 'Sankhya CMS',
    title: 'Build portals from JSON',
    subtitle: 'Lit components with thin React bindings. One contract, every framework.',
    actionLabel: 'Get started',
    secondaryActionLabel: 'Contact sales',
    imageSrc: image('photo-1498050108023-c5249f4df085')
  },
  {
    tab: 'Future-proof your stack',
    eyebrow: 'Platform',
    title: 'Future-proof your content stack',
    subtitle: 'Theme once, publish everywhere, and keep every page valid against one schema.',
    actionLabel: 'Explore features',
    secondaryActionLabel: 'Contact sales',
    imageSrc: image('photo-1519389950473-47ba0277781c')
  }
];

const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** The slides as `st-hero` markup for an `st-carousel`. */
export function heroSlidesMarkup(): string {
  return heroSlides
    .map(
      slide => `<st-hero
        data-tab-label="${escape(slide.tab)}"
        eyebrow="${escape(slide.eyebrow)}"
        title="${escape(slide.title)}"
        subtitle="${escape(slide.subtitle)}"
        action-label="${escape(slide.actionLabel)}" href="#"
        secondary-action-label="${escape(slide.secondaryActionLabel)}" secondary-href="#"
        image-src="${slide.imageSrc}"
        size="large" content-position="bottom" overlay="gradient"></st-hero>`
    )
    .join('');
}

const logo = (text: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="32" viewBox="0 0 160 32"><text x="0" y="24" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#1d1d21">${text}</text></svg>`
  )}`;

export const customerStories = [
  {
    company: 'Northwind',
    logoSrc: logo('NORTHWIND'),
    mediaSrc: image('photo-1522071820081-009f0129c71c'),
    headline: 'Northwind gives 100 million travellers one seamless booking experience.',
    metrics: [
      { value: '100M', label: 'users' },
      { value: '85%', label: 'lower development cost' }
    ],
    href: '#'
  },
  {
    company: 'Contoso Racing',
    logoSrc: logo('CONTOSO'),
    mediaSrc: image('photo-1504707748692-419802cf939d'),
    headline: 'Contoso Racing ships race-day content to fans in minutes, not days.',
    metrics: [
      { value: '12x', label: 'faster publishing' },
      { value: '40+', label: 'markets' }
    ],
    href: '#'
  },
  {
    company: 'Fabrikam',
    logoSrc: logo('FABRIKAM'),
    mediaSrc: image('photo-1497366216548-37526070297c'),
    headline: 'Fabrikam unifies 30 regional sites on a single component library.',
    metrics: [{ value: '30', label: 'sites consolidated' }],
    href: '#'
  },
  {
    company: 'Tailspin',
    logoSrc: logo('TAILSPIN'),
    mediaSrc: image('photo-1556761175-b413da4baf72'),
    headline: 'Tailspin cut page-build time in half with JSON-driven layouts.',
    metrics: [
      { value: '50%', label: 'less build time' },
      { value: '3 wks', label: 'to launch' }
    ],
    href: '#'
  }
];
