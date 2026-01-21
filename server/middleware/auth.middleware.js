const User = require("../models/user.model");
const AppError = require("../utils/appError");
const jwt = require('jsonwebtoken')

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.lt;

        if (!token) {
            return next(new AppError("You are not authorized!", 401));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return next(new AppError("Invalid token!", 401));
        }
        const user = await User.findById(decoded.id);

        if (!user) {
            return next(new AppError("User does not exist!", 404));
        }


        req.user = user;
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        
        // Handle token expiration separately
        if (error.name === "TokenExpiredError") {
            return next(new AppError("your authorization time has expired, please try again!", 401));
        }
        return next(new AppError("You are not authorized!", 401));
    }
};

const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next();
    };
};
module.exports = {protect,restrictTo} 
