import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.ts'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs', '@storybook/addon-themes'],
  framework: '@storybook/web-components-vite'
};

export default config;
