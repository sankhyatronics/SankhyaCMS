const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const packages = [
    { name: 'SankhyaUI', path: './SankhyaUI/package.json' },
    { name: 'Stories', path: './Stories/package.json' },
    { name: 'Sample', path: './Sample/package.json' },
    { name: 'sankhyaui-docs', path: './sankhyaui-docs/package.json' }
];

const rootPkgJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const newVersion = rootPkgJson.version;
packages.forEach(pkg => {
    const pkgJson = JSON.parse(fs.readFileSync(pkg.path, 'utf8'));
    pkgJson.version = newVersion;
    fs.writeFileSync(pkg.path, JSON.stringify(pkgJson, null, 2));
    console.log(`✓ Updated ${pkg.name} to v${newVersion}`);
});