import './App.css';
import { MemoryRouter } from 'react-router';
import type { Preview, ReactRenderer } from '@storybook/react-vite';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

const preview: Preview = {
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
    withThemeByDataAttribute<ReactRenderer>({
      themes: {
        Light: 'light',
        Dark: 'dark',
        slate: 'slate',
        indigo: 'indigo',
        emerald: 'emerald'
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],
};

export default preview;