const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookingsController');
const { validateBody } = require('../middleware/validate');
const Joi = require('joi');

const bookingSchema = Joi.object({
  movie: Joi.string().required(),
  movieId: Joi.any().optional(),
  showtime: Joi.string().required(),
  seats: Joi.array().items(Joi.string()).min(1).required(),
  total: Joi.number().optional(),
  userEmail: Joi.string().email().optional()
});

router.get('/', controller.listBookings);
router.post('/', validateBody(bookingSchema), controller.createBooking);
router.get('/:id', controller.getBooking);
router.get('/user/:email', controller.getBookingsByUser);

module.exports = router;
