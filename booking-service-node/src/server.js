require('dotenv').config();
const createApp = require('./app');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 6000;
const app = createApp();

const server = app.listen(PORT, () => {
  logger.info(`Booking Service listening on ${PORT}`);
});

process.on('SIGINT', () => {
  logger.info('Shutting down server');
  server.close(() => process.exit(0));
});
