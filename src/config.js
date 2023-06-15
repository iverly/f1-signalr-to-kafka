const config = {
  input: {
    type: 'file',
    params: {
      path: process.env.EXPORTER_FILE_PATH || './f1-events.txt',
    },
  },
  output: {
    type: 'kafka',
    params: {
      brokers: [process.env.EXPORTER_KAFKA_BROKER || 'localhost:9092'],
      topic: process.env.EXPORTER_KAFKA_TOPIC || 'f1-events',
      clientId: process.env.EXPORTER_KAFKA_CLIENT_ID || 'f1-events-exporter',
    },
  },
};

module.exports = config;
