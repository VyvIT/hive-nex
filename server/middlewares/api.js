import express from 'express';
import httpProxy from 'http-proxy';

const proxyApiHandler = function (req, res) {
  console.log('proxyApiHandler', req.url);
  proxy.web(req, res);
};

const proxy = httpProxy.createProxyServer({
  target: 'https://10.100.248.4:8443', // baseUrl,
  secure: false,
});

proxy.on('error', (err, req) => {
  console.log('proxy error on:', req.url);
  console.log(err);
  // logger.error('proxy error on:', req.url);
  // logger.error(err);
});

const router = express.Router();

router
  .get('/test', proxyApiHandler)
  .post('/login', proxyApiHandler)
  .all('/logout', proxyApiHandler);
// proxying will fail if koa bodyParser is used so apply body parser only on custom endpoint
//.post('/export', koaBodyParser, exportHandler)
//.all(/^\/api|public\/.+/, proxyApiHandler);
// .get('*', reactRenderHandler);

export default router;
