import path from 'path';
import ini from 'ini';
import nconf from 'nconf';

nconf.argv().env();

/*
 // Setup nconf to use (in-order):
 //   1. Command-line arguments
 //   2. Environment variables
 //   3. config file from command-line arguments "--config=/path/to/file" or environment variable VT_UI_CONFIG or a file located at 'server/config/{NODE_ENV}.json'
 //   4. A file located at 'server/config/default.json'
 */

const load = (name, src) => {
  if (!src) {
    return;
  }
  if (path.extname(src).toLowerCase() === '.ini' || path.extname(src).toLowerCase() === '.config') {
    nconf.file(name, {
      file: src,
      format: ini,
    });
  } else {
    nconf.file(name, src);
  }
};

const loadConfig = () => {
  console.log('NODE_ENV:', nconf.get('NODE_ENV'));
  load('argv-config', nconf.get('config'));
  load('env-config', nconf.get('VT_UI_CONFIG'));
  load('node-env', path.resolve(`${__dirname}/../config/${nconf.get('NODE_ENV') || 'development'}.json`));
  load('default', path.resolve(`${__dirname}/../config/default.json`));
  return nconf;
};

export default loadConfig;
