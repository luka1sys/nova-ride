const mongoose = require('mongoose');
const bookingSchema = mongoose.Schema({

    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: [true, 'Car is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required']

    },
    endDate: {
        type: Date,
        required: [true, 'end date is required']

    },
    totalPrice: {
        type: Number,
        required: true


    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending' // ჯავშანი ჯერ გადახდის გარეშეა
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
const Booking = mongoose.model('Booking', bookingSchema, 'booking')
module.exports = Booking