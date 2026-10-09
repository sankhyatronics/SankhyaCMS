import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import pkg from '../packages/sankhya-cms/package.json';

const config: Config = {
  title: 'Sankhya CMS',
  tagline: 'Lit components and React bindings for JSON-driven portals',
  favicon: 'img/favicon.ico',
  future: { v4: true },

  url: process.env.DOCS_URL ?? 'https://sankhyaui.sankhyatronics.com',
  baseUrl: '/',
  organizationName: 'sankhyatronics',
  projectName: 'SankhyaCMS',
  onBrokenLinks: 'throw',
  i18n: { defaultLocale: 'en', locales: ['en'] },

  presets: [
    [
      'classic',
      {
        docs: { routeBasePath: '/', sidebarPath: './sidebars.ts' },
        blog: false,
        theme: { customCss: './src/css/custom.css' }
      } satisfies Preset.Options
    ]
  ],

  themeConfig: {
    colorMode: { defaultMode: 'light', disableSwitch: false, respectPrefersColorScheme: true },
    navbar: {
      title: 'Sankhya CMS',
      logo: { alt: 'Sankhya CMS', src: 'img/logo.svg' },
      items: [
        { type: 'docSidebar', sidebarId: 'docsSidebar', position: 'left', label: 'Docs' },
        { label: `v${pkg.version}`, position: 'right', href: 'https://www.npmjs.com/package/@sankhyatronics/sankhya-cms' },
        { href: 'https://github.com/sankhyatronics/SankhyaCMS', label: 'GitHub', position: 'right' }
      ]
    },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} Sankhyatronics Solutions Private Limited.`
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json']
    }
  } satisfies Preset.ThemeConfig
};

export default config;
