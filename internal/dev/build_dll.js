// No need to build the DLL in production
if (process.env.NODE_ENV === 'production') {
    process.exit(0);
}

require('shelljs/global');

const path = require('path');
const fs = require('fs');
const exists = fs.existsSync;
const writeFile = fs.writeFileSync;
const defaults = require('lodash/defaultsDeep');
const pkg = require(path.join(process.cwd(), 'package.json'));
const outputPath = path.join(process.cwd(), pkg.dllPlugin.path);
const dllManifestPath = path.join(outputPath, 'package.json');

mkdir('-p', outputPath);

echo('Building the Webpack DLL...');

/**
 * Create a manifest so npm install doesn't warn us
 */
if (!exists(dllManifestPath)) {
    writeFile(
        dllManifestPath,
        JSON.stringify(defaults({
            name: pkg.dllPlugin.name,
            private: true,
            author: pkg.author,
            repository: pkg.repository,
            version: pkg.version,
        }), null, 2),
        'utf8'
    );
}

// the BUILDING_DLL env var is set to avoid confusing the development environment
exec('cross-env BUILDING_DLL=true webpack --display-chunks --color --config internal/webpack/dll.js --hide-modules');