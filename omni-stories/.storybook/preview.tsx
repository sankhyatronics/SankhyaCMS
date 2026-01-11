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
        Ocean: 'ocean',
        Forest: 'forest',
        Desert: 'desert',
        Sankhyatronics: 'sankhyatronics'
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],
};

export default preview;