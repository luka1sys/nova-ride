const express = require('express');
const { createBookingCheckoutSession,  webhookCheckout } = require('../controllers/payment.controller');
const paymentRouter = express.Router();



paymentRouter.post('/', createBookingCheckoutSession);
paymentRouter.post('/confirm', webhookCheckout);
module.exports = paymentRouter;
