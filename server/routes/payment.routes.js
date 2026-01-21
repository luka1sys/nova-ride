const express = require('express');
const { createBookingCheckoutSession, confirmBookingPayment } = require('../controllers/payment.controller');
const paymentRouter = express.Router();


// POST /api/bookings/checkout
paymentRouter.post('/', createBookingCheckoutSession);
paymentRouter.post('/confirm', confirmBookingPayment);
module.exports = paymentRouter;
