import { mergeConfig } from 'vite';
import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.ts'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs', '@storybook/addon-themes'],
  framework: '@storybook/web-components-vite',
  // The static build is served from a sub-path (docs.sankhyatronics.com/sankhya-cms/storybook/), so
  // every asset must be referenced relatively, not from the domain root.
  viteFinal: async config => mergeConfig(config, { base: './' })
};

export default config;
