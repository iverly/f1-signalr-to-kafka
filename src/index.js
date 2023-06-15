const config = require('./config');
const logger = require('./logger');
const kafka = require('./kafka');
const tail = require('./tail');

const boostrap = async () => {
  logger.info('Starting application ...');
  logger.debug(`Running application with configuration: %O`, config);

  logger.info('Initializing kafka ...');
  await kafka.init();
  await kafka.connect();
  logger.info('Kafka initialized');

  logger.info('Initializing tail ...');
  tail.init();
  logger.info('Tail initialized');

  logger.info('Starting watcher on data file ...');
  tail.start();

  logger.info('Application started');
};

boostrap().catch((err) => {
  logger.error(err);
  process.exit(1);
});
