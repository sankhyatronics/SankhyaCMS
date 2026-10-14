// Makes a package's manifest publishable with plain `npm publish`, which (unlike pnpm) leaves
// `workspace:` and `catalog:` ranges in the tarball. Run from the package directory:
//   prepack  -> node ../../scripts/resolve-workspace-deps.mjs         (rewrite, keeping a backup)
//   postpack -> node ../../scripts/resolve-workspace-deps.mjs --restore
// `workspace:^` / `workspace:~` / `workspace:*` become `^1.2.3` / `~1.2.3` / `1.2.3`, using the root
// package.json version that update-version stamps into every package. devDependencies are dropped:
// consumers never install them and they are full of `workspace:` / `catalog:` ranges.
import { existsSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const manifest = 'package.json';
const backup = 'package.json.workspace-backup';

if (process.argv.includes('--restore')) {
  if (existsSync(backup)) {
    renameSync(backup, manifest);
    console.log('✓ Restored workspace package.json');
  }
  process.exit(0);
}

const rootManifest = fileURLToPath(new URL('../package.json', import.meta.url));
const version = JSON.parse(readFileSync(rootManifest, 'utf8')).version;
const original = readFileSync(manifest, 'utf8');
const pkg = JSON.parse(original);

for (const field of ['dependencies', 'peerDependencies', 'optionalDependencies']) {
  for (const [name, range] of Object.entries(pkg[field] ?? {})) {
    if (!range.startsWith('workspace:')) continue;
    const spec = range.slice('workspace:'.length);
    const resolved = spec === '*' ? version : spec === '^' || spec === '~' ? `${spec}${version}` : spec;
    pkg[field][name] = resolved;
    console.log(`✓ ${name}: ${range} -> ${resolved}`);
  }
}
delete pkg.devDependencies;

if (!existsSync(backup)) writeFileSync(backup, original);
writeFileSync(manifest, `${JSON.stringify(pkg, null, 2)}\n`);
