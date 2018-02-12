export default (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';

  // app.use(function (req, res, next) {
  //   // TODO: more checks
  //   if (req.url !== '/login' && !req.headers['cookie']) {
  //     res.redirect('/login');
  //   } else {
  //     next();
  //   }
  // });

  if (isProd) {
    const addProdMiddlewares = require('./production');
    addProdMiddlewares(app, options);
  } else {
    const webpackConfig = require('../../internal/webpack/dev');
    const devMiddlewares = require('./development');
    devMiddlewares(app, webpackConfig);
  }
  return app;
};