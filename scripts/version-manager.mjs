// Stamps the root package.json version into every package in the repo, so they all share one version.
// A new package must be added to the list below.
import { readFileSync, writeFileSync } from 'node:fs';

const packages = [
  { name: 'sankhya-cms', path: './packages/sankhya-cms/package.json' },
  { name: 'sankhya-cms-react', path: './packages/sankhya-cms-react/package.json' },
  { name: 'sankhya-rich-editor', path: './packages/sankhya-rich-editor/package.json' },
  { name: 'oxlint-config', path: './tooling/oxlint-config/package.json' },
  { name: 'typescript-config', path: './tooling/typescript-config/package.json' },
  { name: 'storybook', path: './storybook/package.json' },
  { name: 'docs', path: './docs/package.json' }
];

const newVersion = JSON.parse(readFileSync('./package.json', 'utf8')).version;

for (const pkg of packages) {
  const pkgJson = JSON.parse(readFileSync(pkg.path, 'utf8'));
  pkgJson.version = newVersion;
  writeFileSync(pkg.path, `${JSON.stringify(pkgJson, null, 2)}\n`);
  console.log(`✓ Updated ${pkg.name} to v${newVersion}`);
}
