import path from 'path';
import apiRouter from './api';
import chalk from 'chalk';
import responseTime from 'response-time';
import logger from '../logger';

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const createWebpackMiddleware = (compiler, publicPath) => {
  return webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath,
    silent: true,
    stats: 'errors-only',
  });
};

module.exports = function addDevMiddlewares(app, webpackConfig) {
  const compiler = webpack(webpackConfig);

  app.use(responseTime(function (req, res, time) {
    logger.silly(`${req.method}: ${req.url} ${chalk.green(`(${time.toFixed(0)}ms)`)}`);
  }));

  const webpackDevMiddleware = createWebpackMiddleware(compiler, webpackConfig.output.publicPath);
  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddleware(compiler));

  // Since webpackDevMiddleware uses memory-fs internally to store build artifacts, we use it instead
  const fs = webpackDevMiddleware.fileSystem;
  app.use(apiRouter);
  app.get('*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
};