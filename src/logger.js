const logger = require('debug')('exporter');

const error = logger.extend('error');
const warn = logger.extend('warn');
const info = logger.extend('info');
const debug = logger.extend('debug');

if (process.env.EXPORTER_LOG_LEVEL === 'info') {
  debug.enabled = false;
}

if (process.env.EXPORTER_LOG_LEVEL === 'warn') {
  debug.enabled = false;
  info.enabled = false;
}

if (process.env.EXPORTER_LOG_LEVEL === 'error') {
  debug.enabled = false;
  info.enabled = false;
  warn.enabled = false;
}

/**
 * The function customKafkaLogger logs messages at different levels of severity using different console
 * methods.
 */
const customKafkaLogger = ({ level, log }) => {
  switch (level) {
    case 1:
      error(log.message);
      break;
    case 2:
      warn(log.message);
      break;
    case 4:
      info(log.message);
      break;
    case 5:
      debug(log.message);
      break;
    default:
  }
};

module.exports = {
  customKafkaLogger,
  error,
  warn,
  info,
  debug,
};
