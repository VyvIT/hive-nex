import winston from 'winston';

const chalk = require('chalk');
const ip = require('ip');

let loggerInstance = undefined;

export const setupLogger = ({
  path,
  filename,
  maxsize,
  maxFiles,
  level,
  zippedArchive,
}) => {
  const winstonTransports = [];
  if (process.env.NODE_ENV === 'production') {
    winstonTransports.push(new winston.transports.File({
      filename: `${path}/${filename}`,
      maxsize: maxsize,
      maxFiles: maxFiles,
      level: level,
      zippedArchive: zippedArchive,
    }));
  } else {
    winstonTransports.push(new winston.transports.Console({
      level: 'silly',
      prettyPrint: true,
      colorize: true,
      timestamp: true,
    }));
  }

  loggerInstance = new (winston.Logger)({
    transports: winstonTransports,
  });
};

const divider = chalk.gray('\n-----------------------------------');

const logger = {

  // Called whenever there's an error on the server we want to print
  error: (err) => {
    loggerInstance.error(err);
  },

  info: (msg) => {
    loggerInstance.info(msg);
  },

  silly: (msg) => {
    loggerInstance.silly(msg);
  },

  // Called when express.js app starts on given port w/o errors
  appStarted: (schema, port, host) => {
    const mode = process.env.NODE_ENV === 'production' ?
      chalk.green('Production mode') :
      chalk.red('NON production mode!');

    console.log(`Server started ! ${chalk.green('✓')} (MODE: ${mode})`);
    console.log(`
${chalk.bold('Access URLs:')}${divider}
Localhost: ${chalk.magenta(`${schema}://${host}:${port}`)}
      LAN: ${chalk.magenta(`${schema}://${ip.address()}:${port}`)}${divider}
${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `);
  },
};

export default logger;
