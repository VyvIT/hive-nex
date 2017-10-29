const path = require('path');
const webpack = require('webpack');
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');
const logger = require('../logger');

module.exports = function addDevMiddlewares(app, router, webpackConfig) {
  const compiler = webpack(webpackConfig);
  const devMiddlewareInstance = devMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    silent: true,
    stats: 'errors-only',
  });
  app.use(devMiddlewareInstance);
  app.use(hotMiddleware(compiler));

  // Since webpackDevMiddleware uses memory-fs internally to store build artifacts, we use it instead
  const fs = devMiddlewareInstance.fileSystem;
  router.get('*', (ctx, next) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        ctx.status = 404;
      } else {
        ctx = file;
      }
    });
  });
};