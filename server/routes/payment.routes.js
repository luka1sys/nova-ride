const express = require('express');
const { createBookingCheckoutSession,} = require('../controllers/payment.controller');
const paymentRouter = express.Router();



paymentRouter.post('/', createBookingCheckoutSession);
module.exports = paymentRouter;
