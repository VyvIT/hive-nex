import express from 'express';
import nconf from 'nconf';
import httpProxy from 'http-proxy';
import logger from '../logger';

const proxyApiHandler = function (req, res) {
  logger.silly(`(proxyApiHandler) handling: ${req.url}`);
  proxy.web(req, res);
};

const proxy = httpProxy.createProxyServer({
  target: nconf.get('server:apiURL'),
  secure: false,
});

// proxy.on('proxyRes', (proxyRes, req, res) => {
//   console.log(req.url);
//   console.log(req.path);
//   console.log(req.pathname);
//   console.log(proxyRes.headers['set-cookie']);
// });

proxy.on('error', (err, req, res) => {
  console.log(err);
  logger.error(`(proxyApiHandler) proxy error for: ${err}`);
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end('Something went wrong. And we are reporting a custom error message.');
});

const router = express.Router();

router
  .get('/test', proxyApiHandler)
  .post('/login', proxyApiHandler)
  .all('/logout', proxyApiHandler)
  .all(/^\/api|public\/.+/, proxyApiHandler);
// TODO: .post('/export', koaBodyParser, exportHandler)
// .get('*', reactRenderHandler);

export default router;
