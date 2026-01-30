const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bookingsRouter = require('./routes/bookings');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(morgan('combined', { stream: logger.stream }));

  app.get('/health', (req, res) => res.json({ status: 'ok' }));

  app.use('/bookings', bookingsRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};

module.exports = createApp;
