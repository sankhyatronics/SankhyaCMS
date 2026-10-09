import type { Preview } from '@storybook/web-components-vite';
import { setCustomElementsManifest } from '@storybook/web-components-vite';
import { withThemeByClassName } from '@storybook/addon-themes';
import { THEMES } from '@sankhyatronics/sankhya-cms/theming';
import manifest from '@sankhyatronics/sankhya-cms/custom-elements.json';
import '@sankhyatronics/sankhya-cms/theme.css';
import '@sankhyatronics/sankhya-cms/themes.css';
import '@sankhyatronics/sankhya-cms/cms-theme.css';

// Prop/slot/event tables in the docs come straight from the Lit source's JSDoc.
setCustomElementsManifest(manifest);

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: Object.fromEntries(THEMES.map(theme => [theme.value, theme.value === 'default' ? '' : theme.value])),
      defaultTheme: 'default',
      parentSelector: 'html'
    })
  ],
  parameters: {
    layout: 'fullscreen',
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } }
  }
};

export default preview;
