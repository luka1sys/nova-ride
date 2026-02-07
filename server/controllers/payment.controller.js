
const Booking = require('../models/booking.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const stripe = require('stripe')(process.env.STRIPE_SECRET);


const createBookingCheckoutSession = catchAsync(async (req, res, next) => {
    const { bookingId } = req.body;

    // ვამოწმებთ ჯავშანს
    const booking = await Booking.findById(bookingId).populate('car');
    if (!booking) {
        return next(new AppError('Booking not found', 404));
    }

   
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






// ეს ფუნქცია გამოიძახება Stripe-ის მიერ ავტომატურად
const webhookCheckout = catchAsync(async (req, res, next) => {
    const signature = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body, 
            signature, 
            process.env.STRIPE_WEBHOOK_SECRET // ამას Stripe-ის პანელიდან აიღებ
        );
    } catch (err) {
        return res.status(400).send(`Webhook error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        
        // აქ ვაახლებთ ბაზას ნამდვილი გადახდის საფუძველზე
        await Booking.findByIdAndUpdate(session.metadata.bookingId, {
            status: 'confirmed',
            paymentId: session.payment_intent // ინახავ გადახდის ID-ს რეფერენსისთვის
        });
    }

    res.status(200).json({ received: true });
});
module.exports = { createBookingCheckoutSession,  webhookCheckout };