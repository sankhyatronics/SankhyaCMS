import { themes as prismThemes } from 'prism-react-renderer';
import pkg from '../SankhyaUI/package.json';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'SankhyUI',
  tagline: 'React UI library for headless CMS',
  favicon: 'https://sankhyatronics.com/images/Icon_flat_color.svg',
  future: {
    v4: true,
  },
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  url: 'https://sankhyaui.sankhyatronics.com/',
  baseUrl: '/',
  organizationName: 'sankhyatronics',
  projectName: 'sankhyacms',
  onBrokenLinks: 'throw',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    liveCodeBlock: {
      playgroundPosition: 'bottom', // or 'top'
    },
    navbar: {
      title: 'SankhyUI',
      logo: {
        alt: 'SankhyUI Logo',
        src: 'https://sankhyatronics.com/images/Icon_flat_color.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          label: `v${pkg.version}`,
          position: 'right',
          href: 'https://www.npmjs.com/package/@sankhyatronics/sankhya-ui',
        },
        {
          href: 'https://github.com/sankhyatronics/sankhyacms',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Sankhyatronics Solutions Private Limited.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
