const express = require('express');
const { createBooking, getAllBookings, getBooking, deleteBooking, updateBooking, getMyBookings } = require('../controllers/booking.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');
const bookingRouter = express.Router()
bookingRouter.get('/my', protect, getMyBookings);
bookingRouter.post('/', protect, createBooking);
bookingRouter.get('/', protect, restrictTo('admin'), getAllBookings)
bookingRouter.get('/:id', protect, getBooking)
bookingRouter.delete('/:id', protect, restrictTo('admin'), deleteBooking)
bookingRouter.patch('/:id', protect, restrictTo('admin'), updateBooking)


module.exports = bookingRouter