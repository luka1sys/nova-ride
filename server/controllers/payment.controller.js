
const Booking = require('../models/booking.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const stripe = require('stripe')(process.env.STRIPE_SECRET);

// Payment: create checkout session for a booking
const createBookingCheckoutSession = catchAsync(async (req, res, next) => {
    const { bookingId } = req.body;

    // ვამოწმებთ ჯავშანს
    const booking = await Booking.findById(bookingId).populate('car');
    if (!booking) {
        return next(new AppError('Booking not found', 404));
    }

    // შეიქმნას Stripe line item
    const line_items = [
        {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: booking.car.brand + ' ' + booking.car.model,
                    description: `Car booking from ${booking.startDate.toDateString()} to ${booking.endDate.toDateString()}`,
                },
                unit_amount: booking.totalPrice * 100, // cents
            },
            quantity: 1,
        },
    ];

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items,
        metadata: {
            bookingId: booking._id.toString(),
        },
        success_url: `${process.env.CLIENT_URL}/paymentsuccess?bookingId=${booking._id}`,
        cancel_url: `${process.env.CLIENT_URL}/`,
    });

    res.json({ url: session.url });
});



// CONFIRM PAYMENT (demo / portfolio)
const confirmBookingPayment = async (req, res) => {
    const { bookingId } = req.body;

    await Booking.findByIdAndUpdate(bookingId, {
        status: 'confirmed'
    });

    res.status(200).json({ message: 'Booking confirmed' });
};
module.exports = { createBookingCheckoutSession, confirmBookingPayment };