const Booking = require("../models/booking.model");
const Car = require("../models/car.model");
const User = require("../models/user.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");


const createBooking = catchAsync(async (req, res, next) => {
    const { carId, startDate, endDate } = req.body;

    // auth middleware-დან
    const userId = req.user._id;

    const car = await Car.findById(carId);
    if (!car) {
        return next(new AppError("Car not found", 404));
    }

    if (new Date(endDate) < new Date(startDate)) {
        return next(new AppError("End date must be after start date", 400));
    }

    // ✅ Overlapping check – prevent double booking
    const existingBookings = await Booking.find({
        car: carId,
        status: 'confirmed'
    });

    const requestedStart = new Date(startDate);
    const requestedEnd = new Date(endDate);

    const isOverlapping = existingBookings.some(b => {
        const bookedStart = new Date(b.startDate);
        const bookedEnd = new Date(b.endDate);
        return requestedStart <= bookedEnd && requestedEnd >= bookedStart;
    });

    if (isOverlapping) {
        return next(new AppError('This car is already booked for the selected dates', 400));
    }

    const days =
        Math.ceil(
            (new Date(endDate) - new Date(startDate)) /
            (1000 * 60 * 60 * 24)
        ) + 1;

    const totalPrice = days * car.pricePerDay;

    const newBooking = await Booking.create({
        car: carId,
        user: userId,
        startDate,
        endDate,
        totalPrice
    });

    res.status(201).json({
        status: "success",
        booking: newBooking
    });
});


const updateExpiredBookings = async () => {
    const now = new Date();

    await Booking.updateMany(
        {
            endDate: { $lt: now },
            status: { $in: ['confirmed'] }
        },
        {
            status: 'completed'
        }
    );
};

const getAllBookings = catchAsync(async (req, res, next) => {
    await updateExpiredBookings();
    const bookings = await Booking.find()
        .populate('user', 'fullname')
        .populate('car', 'brand model year ');

    res.status(200).json({
        status: 'success',
        bookings
    });
});

const getBooking = catchAsync(async (req, res, next) => {
    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId)
        .populate('user', 'fullname')
        .populate('car', 'brand model year');

    if (!booking) {
        return next(new AppError('Booking not found', 404));
    }

    res.status(200).json({
        status: 'success',
        booking
    });
});

const deleteBooking = catchAsync(async (req, res, next) => {
    const bookingId = req.params.id;
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    if (!deletedBooking) {
        return next(new AppError('Booking not found', 404));
    };
    res.status(200).json({
        status: 'success',
        message: 'Booking deleted successfully',
        booking: deletedBooking
    })
})

const updateBooking = catchAsync(async (req, res, next) => {
    const bookingId = req.params.id;
    const updates = req.body;

    // ვახორციელებთ განახლებას
    const updatedBooking = await Booking.findByIdAndUpdate(bookingId, updates, {
        new: true,          // აბრუნებს განახლებულ დოკუმენტს
        runValidators: true
    });

    if (!updatedBooking) {
        return next(new AppError('Booking not found', 404));
    }


    res.status(200).json({
        status: 'success',
        message: 'Booking updated successfully',
        booking: updatedBooking
    });
});


const getMyBookings = catchAsync(async (req, res, next) => {
    await updateExpiredBookings();
    const bookings = await Booking.find({ user: req.user.id })
        .populate('car', 'brand model year');

    res.status(200).json({
        status: 'success',
        bookings
    });
});



exports.confirmBookingPayment = async (req, res) => {
    const { bookingId } = req.body;
    await Booking.findByIdAndUpdate(bookingId, {
        status: 'confirmed'
    });
    res.json({ message: 'Booking confirmed' });
};
module.exports = { createBooking, getAllBookings, getBooking, deleteBooking, updateBooking, getMyBookings }