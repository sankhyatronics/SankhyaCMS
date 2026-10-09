import { copyFileSync, mkdirSync } from 'node:fs';

mkdirSync('dist', { recursive: true });
for (const file of ['theme.css', 'themes.css', 'cms-theme.css']) copyFileSync(`src/${file}`, `dist/${file}`);
