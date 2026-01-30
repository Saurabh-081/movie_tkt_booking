const service = require('../services/bookingsService');

exports.listBookings = async (req, res, next) => {
  try {
    const { userEmail } = req.query;
    const result = userEmail ? await service.findByUser(userEmail) : await service.getAll();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createBooking = async (req, res, next) => {
  try {
    const created = await service.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

exports.getBooking = async (req, res, next) => {
  try {
    const b = await service.getById(req.params.id);
    if (!b) return res.status(404).json({ error: 'Booking not found' });
    res.json(b);
  } catch (err) {
    next(err);
  }
};

exports.getBookingsByUser = async (req, res, next) => {
  try {
    const result = await service.findByUser(req.params.email);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
