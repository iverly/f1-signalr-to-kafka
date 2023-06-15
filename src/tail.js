const { Tail } = require('tail');
const config = require('./config');
const kafka = require('./kafka');

let watcherInstance;

/**
 * The function initializes a watcher instance for a specified file path.
 */
const init = () => {
  try {
    watcherInstance = new Tail(config.input.params.path);
  } catch (err) {
    throw new Error(`Failed to initialize watcher: ${err.message}`);
  }
};

/**
 * The function returns the watcher instance if it exists, otherwise it throws an error.
 * @returns The function `getWatcherInstance` returns the `watcherInstance` if it exists, otherwise it
 * throws an error with the message "Watcher instance is not initialized".
 */
const getWatcherInstance = () => {
  if (!watcherInstance) {
    throw new Error('Watcher instance is not initialized');
  }

  return watcherInstance;
};

/**
 * This function sends data from the watcher instance to a Kafka producer.
 */
const start = () => {
  const watcher = getWatcherInstance();
  const producer = kafka.getProducer();

  watcher.on('line', (data) => {
    producer.send({
      topic: config.output.params.topic,
      messages: [
        {
          value: data,
        },
      ],
    });
  });
};

module.exports = {
  init,
  start,
  getWatcherInstance,
};
