const express = require("express");
const { createReview, getCarReviews } = require("../controllers/review.controller");
const { protect } = require("../middleware/auth.middleware");


const reviewRouter = express.Router();

// Review დამატება
reviewRouter.post("/", protect, createReview);
    
// მანქანის review-ები
reviewRouter.get("/:carId", getCarReviews);

module.exports = reviewRouter;