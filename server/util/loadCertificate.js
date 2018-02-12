import path from 'path';
import fs from 'fs';
import constants from 'constants';

const existFile = (src) => {
  try {
    fs.lstatSync(src);
    return true;
  } catch (e) {
    return false;
  }
};

export default (certConfig) => {
  const secureOptions = constants.SSL_OP_NO_SSLv3 | constants.SSL_OP_NO_SSLv2 | constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1;
  if (existFile(certConfig.certificate)) {
    return {
      key: fs.readFileSync(certConfig.key),
      cert: fs.readFileSync(certConfig.certificate),
      secureOptions,
    };
  } else if (existFile(path.resolve(`${__dirname}/../${certConfig.certificate}`))) {
    return {
      key: fs.readFileSync(path.resolve(`${__dirname}/../${certConfig.key}`)),
      cert: fs.readFileSync(path.resolve(`${__dirname}/../${certConfig.certificate}`)),
      secureOptions,
    };
  }

  throw new Error('Certificate does not exist');
}
