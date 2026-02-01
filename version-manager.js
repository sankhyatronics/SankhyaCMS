const fs = require('fs');
const path = require('path');

// Check for command line argument for 'unset' mode
// Usage: node version-manager.js --reset
const isResetMode = process.argv.includes('--reset');

const packages = [
    { name: 'SankhyaUI', type: 'library', path: './SankhyaUI/package.json' },
    { name: 'Stories', type: 'client', path: './Stories/package.json' },
    { name: 'Sample', type: 'client', path: './Sample/package.json' },
    { name: 'sankhyaui-docs', type: 'docs', path: './sankhyaui-docs/package.json' }
];

const rootPkgJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const newVersion = rootPkgJson.version;

console.log(`Running in ${isResetMode ? 'RESET (Local File)' : 'SET (Versioned)'} mode...`);

packages.forEach(pkg => {
    const pkgJson = JSON.parse(fs.readFileSync(pkg.path, 'utf8'));

    // Always sync the package version itself to the root version
    pkgJson.version = newVersion;

    if (pkg.type === 'client') {
        if (isResetMode) {
            // In reset mode, point to local file path
            pkgJson.dependencies['@sankhyatronics/sankhya-ui'] = `workspace:*`;
        } else {
            // In set mode, point to the specific version
            pkgJson.dependencies['@sankhyatronics/sankhya-ui'] = `${newVersion}`;
        }
    }
    fs.writeFileSync(pkg.path, JSON.stringify(pkgJson, null, 2));
    console.log(`✓ Updated ${pkg.name} ${pkg.type === 'client' ? `dependency to ${pkgJson.dependencies['@sankhyatronics/sankhya-ui']}` : `to v${newVersion}`}`);
});