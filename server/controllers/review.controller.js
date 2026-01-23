
const Booking = require("../models/booking.model");
const Car = require("../models/car.model");
const Review = require("../models/review.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// ➕ Review დამატება
const createReview = catchAsync(async (req, res, next) => {
  const { carId, rating, comment } = req.body;

  const hasBooked = await Booking.findOne({
    user: req.user.id,
    car: carId,
    status: "completed"
  });

  if (!hasBooked) {
    return next(new AppError("You can only review cars you rented", 403));
  }

  //  ერთჯერადი review
  const already = await Review.findOne({
    user: req.user.id,
    car: carId
  });

  if (already) {
    return next(new AppError("You already reviewed this car", 400));
  }

  //  Review შექმნა
  let review = await Review.create({
    user: req.user.id,
    car: carId,
    rating,
    comment
  });

  // აი ეს არის მთავარი ცვლილება: ვტვირთავთ მომხმარებლის სახელს შექმნილ ობიექტში
  review = await review.populate("user", "fullname");

  //  საშუალო რეიტინგის გადათვლა
  const reviews = await Review.find({ car: carId });

  const avg =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  await Car.findByIdAndUpdate(carId, {
    ratingsAverage: avg.toFixed(1),
    ratingsCount: reviews.length
  });

  res.status(201).json({
    status: "success",
    review
  });
});


//  მანქანის review-ების წამოღება
const getCarReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ car: req.params.carId })
    .populate("user", "fullname");

  res.status(200).json({
    status: "success",
    results: reviews.length,
    reviews
  });
});

module.exports = { createReview, getCarReviews }; 