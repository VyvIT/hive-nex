/**
 * WEBPACK DLL config
 *
 * This profile is used to cache webpack's module
 * contexts for external library and framework type
 * dependencies which will usually not change often enough
 * to warrant building them from scratch every time we use
 * the webpack process.
 *
 * The DLL Plugin provides a dramatic speed increase to webpack build and hot module reloading
 * by caching the module metadata for all of our npm dependencies. We enable it by default
 * in development.
 */

const { join } = require('path');
const pullAll = require('lodash/pullAll');
const uniq = require('lodash/uniq');
const webpack = require('webpack');
const pkg = require(join(process.cwd(), 'package.json'));

if (!pkg.dllPlugin) {
  process.exit(0);
}

const buildEntry = (pkg) => {
  const dependencyNames = Object.keys(pkg.dependencies);
  const includeDependencies = uniq(dependencyNames.concat(pkg.dllPlugin.include));

  return {
    devDependencies: pullAll(includeDependencies, pkg.dllPlugin.exclude),
  };
};

const outputPath = join(process.cwd(), pkg.dllPlugin.path);

module.exports = require('./common')({
  context: process.cwd(),
  entry: pkg.dllPlugin.dlls || buildEntry(pkg),
  devtool: 'eval',
  output: {
    filename: '[name].dll.js',
    path: outputPath,
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: join(outputPath, '[name].json'),
    }),
  ],
  performance: {
    hints: false,
  },
});