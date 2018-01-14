/* eslint-disable global-require */

module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    // const addProdMiddlewares = require('./addProdMiddlewares');
    // addProdMiddlewares(app, router, options);
  } else {
    const webpackConfig = require('../../internal/webpack/dev');
    const devMiddlewares = require('./development');
    devMiddlewares(app, webpackConfig);
  }
  return app;
};