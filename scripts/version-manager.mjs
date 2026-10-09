// Stamps the root package.json version into every publishable package.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = JSON.parse(readFileSync('package.json', 'utf8'));
for (const dir of ['packages', 'tooling']) {
  for (const name of readdirSync(dir)) {
    const file = join(dir, name, 'package.json');
    if (!existsSync(file)) continue;
    const pkg = JSON.parse(readFileSync(file, 'utf8'));
    pkg.version = root.version;
    writeFileSync(file, `${JSON.stringify(pkg, null, 2)}\n`);
    console.warn(`${pkg.name} -> ${root.version}`);
  }
}
