import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs",
    "@storybook/addon-themes"
  ],
  "framework": "@storybook/react-vite",
  "staticDirs": ["public"],
  async viteFinal(config) {
    return {
      ...config,
      build: {
        ...config.build,
        chunkSizeWarningLimit: 2000,
      },
    };
  },
};
export default config;