const { Kafka } = require('kafkajs');
const config = require('./config');
const logger = require('./logger');

let kafkaInstance = null;
let producerInstance = null;

/**
 * The function initializes a Kafka producer instance with the provided configuration parameters.
 */
const init = async () => {
  kafkaInstance = new Kafka({
    clientId: config.output.params.clientId,
    brokers: config.output.params.brokers,
    logCreator: () => logger.customKafkaLogger,
  });

  producerInstance = kafkaInstance.producer();
};

/**
 * The function returns the producer instance if it exists, otherwise it throws an error.
 * @returns The function `getProducer` is returning the `producerInstance` if it exists. If
 * `producerInstance` does not exist, it throws an error with the message "Producer not initialized".
 */
const getProducer = () => {
  if (!producerInstance) {
    throw new Error('Producer not initialized');
  }

  return producerInstance;
};

/**
 * This function connects to a Kafka producer.
 */
const connect = async () => {
  const producer = getProducer();

  try {
    await producer.connect();
  } catch (err) {
    throw new Error(`Error while connecting to Kafka: ${err.message}`);
  }
};

module.exports = {
  init,
  connect,
  getProducer,
};
