// Publishes Inter (the suite's UI font, see --st-font-family in theme.css) as dist/fonts.css plus the
// latin-subset woff2 files it references. Latin covers English, German and Danish, so the other
// subsets (cyrillic, greek, vietnamese, latin-ext) are left out.
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);
const WEIGHTS = [400, 500, 600, 700];

mkdirSync('dist/fonts', { recursive: true });

const blocks = WEIGHTS.map((weight) => {
  const cssPath = require.resolve(`@fontsource/inter/${weight}.css`);
  const css = readFileSync(cssPath, 'utf8');
  const pattern = new RegExp(`/\\* inter-latin-${weight}-normal \\*/\\s*@font-face \\{[\\s\\S]*?\\}`);
  const match = css.match(pattern);
  if (!match) throw new Error(`copy-fonts: no latin ${weight} block in ${cssPath}`);

  const file = `inter-latin-${weight}-normal.woff2`;
  copyFileSync(join(dirname(cssPath), 'files', file), join('dist/fonts', file));
  // Keep only the woff2 source; every browser the suite supports reads it.
  return match[0]
    .replace(/src: url\(\.\/files\/[^)]+\) format\('woff2'\)[^;]*;/, `src: url(./fonts/${file}) format('woff2');`);
});

writeFileSync('dist/fonts.css', `${blocks.join('\n\n')}\n`);
