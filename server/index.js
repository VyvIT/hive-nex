import express from 'express';
import loadServerConfig from './util/loadConfig';
import logger, { setupLogger } from './logger';
import setup from './middlewares/frontend';
import loadCertificate from './util/loadCertificate';
import { resolve } from 'path';

let nconf;
try {
  nconf = loadServerConfig();
} catch (e) {
  console.log('Failed loading server config', e);
}

const {
  loggerConfig,
  schema,
  host,
  port,
  certConfig,
  apiURL,
} = nconf.get('server');

setupLogger(loggerConfig);

// set this to enable https connections to servers with self-signed certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = certConfig.NODE_TLS_REJECT_UNAUTHORIZED || '1';
logger.info(`Node is${certConfig.NODE_TLS_REJECT_UNAUTHORIZED === '0' ? ' not' :
  ''} rejecting self-signed certificates ('NODE_TLS_REJECT_UNAUTHORIZED: ${certConfig.NODE_TLS_REJECT_UNAUTHORIZED}')`);

const app = express();
app.use('*', function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.use(function (err, req, res, next) {
  logger.error(err);
  res.status(500).send('Something broke!');
});

setup(app, {
  outputPath: resolve(process.cwd(), 'build/client'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
// const customHost = argv.host || process.env.HOST;
// const host = customHost || null; // Let http.Server use its default IPv6/4 host

const prettyHost = host || 'localhost';
const startUpCallback = (err) => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(schema, port, prettyHost);
};

// Start your app.
if (schema === 'https') {
  const https = require('https');
  https.createServer(loadCertificate(certConfig), app).listen(port, host, startUpCallback);
} else {
  const http = require('http');
  http.createServer(app).listen(port, host, startUpCallback);
}

// app.listen(port, host, (err) => {
//   if (err) {
//     return logger.error(err.message);
//   }
//   logger.appStarted(port, prettyHost);
// });