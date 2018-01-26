import express from 'express';
const logger = require('./logger');
const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontend');
// const responseTime = require('./middlewares/responseTime');
const resolve = require('path').resolve;

const app = express();

if (process.env.NODE_ENV === 'production') {
  console.log('production mode')
} else {
  console.log('NON production mode!')
}
// app.use(responseTime);

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

setup(app, {
  outputPath: resolve(process.cwd(), 'build/client'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(port, prettyHost);
});