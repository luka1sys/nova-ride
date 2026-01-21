
// Authentication
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

const signToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user)
    res.cookie('lt', token, {
        // cookie ს სიცოცხლის ვადა 
        maxAge: process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
        // 
        secure: true,
        // javascript ბრაუზერში  ვერ წაიკითხავს cookie ს 
        httpOnly: true,
        // 
        sameSite: 'none'
    })
    // ვაბრუნებთ სტატუსის კოდს და ახალ მომხმარებელს Json ფორმატში 
    res.status(statusCode).json({
        status: 'sucess',
        user
    })
}

const signUp = catchAsync(async (req, res, next) => {
    const { fullname, email, password } = req.body;

    const newUser = await User.create({
        fullname,
        email,
        password
    });

    const verificationToken = newUser.createVerificationToken();
    await newUser.save({ validateBeforeSave: false });

    const verificationURL = `${req.protocol}://${req.get('host')}/users/verify/${verificationToken}`;

    const htmlMessage = `
    <div style="font-family: Arial, sans-serif; text-align: center;">
        <h2>Welcome to Fleet Rental!</h2>
        <p>Please click the button below to verify your email address:</p>
        <a href="${verificationURL}" 
           style="background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
           Verify Email
        </a>
    </div>`;

    // 1. იმეილს ვუშვებთ ფონურ რეჟიმში (await-ის გარეშე)
    sendEmail(
        email,
        'Verify your account',
        `Please verify your account here: ${verificationURL}`,
        htmlMessage
    ).catch(err => {
        // ეს შეცდომა მხოლოდ სერვერის ლოგებში გამოჩნდება და მომხმარებელს არ შეაწუხებს
        console.error("Background Email Send Error:", err);
    });

    // 2. პასუხს ვაბრუნებთ მაშინვე
    res.status(201).json({
        status: 'success',
        message: 'User created successfully. Please check your email!',
        user: newUser
    });
});

// login 
const login = catchAsync(async (req, res, next) => {
    // ვიღებთ წვდომას ემაილზე და პაროლზე 
    const { email, password } = req.body

    // ვეძებთ ემაილს user კოლექციიდან 
    const user = await User.findOne({ email });
    // თუ არ გვაქვს user ვაბრუნებთ ერორის მმართელ ფუნქციას 
    if (!user) {
        return next(new AppError('your email or password is incorrect', 404))
    }
    if (!user.isVerified) {
        return next(new AppError('Please verify your email before logging in', 401));
    }
    // ვადარებთ შეყვანილ პაროლს (password) და ბაზაში შენახულ ჰეშირებულ პაროლს (user.password)
    // comparePassword არის user მოდელში განსაზღვრული მეთოდი, რომელიც bcrypt-ს ანალოგიურად ადარებს
    const iscorrect = await user.comparePassword(password, user.password);
    // თუ პაროლი არ ემთხვევა, ვაბრუნებთ შეცდომას
    if (!iscorrect) {
        return next(new AppError('your email or password is incorrect', 404))
    }
    // თუ email და password სწორია, ვაბრუნებთ წარმატებულ პასუხს (200)
    // response-ში ვაგზავნით iscorrect ცვლადს და user ობიექტს
    createSendToken(user, 200, res)

})

const logout = (req, res) => {
    res.cookie('lt', '', {
        maxAge: 0,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/'
    });

    res.status(200).json({
        status: 'success',
        message: 'Logged out successfully'
    });
};
const updateUser = catchAsync(async (req, res, next) => {
    if (req.user.role !== 'admin') {
        return next(new AppError('You are not allowed to change users', 403));
    }

    const userId = req.params.id; // URL პარამეტრიდან ვიღებთ
    const { fullname, email, role } = req.body;

    const updateData = { fullname, email, role };

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

    res.status(200).json({
        status: 'success',
        user
    });
});


const deleteUser = catchAsync(async (req, res, next) => {
    // მხოლოდ admin-ებს აქვთ უფლება
    if (req.user.role !== 'admin') {
        return next(new AppError('You are not allowed to delete users', 403));
    }

    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
        return next(new AppError('User not found', 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'User deleted successfully'
    });
});


const getAllUsers = catchAsync(async (req, res) => {
    const users = await User.find();
    res.status(200).json({
        status: 'success',
        users
    })
})


const verifyEmail = catchAsync(async (req, res, next) => {
    const { token } = req.params;

    // ვეძებთ მომხმარებელს, რომელსაც აქვს ეს ტოკენი და მისი ვადა ჯერ არ გასულა ($gt: Date.now())
    const user = await User.findOne({
        verificationToken: token,
        verificationTokenExpires: { $gt: Date.now() }
    });

    if (!user) {
        return next(new AppError('Invalid or expired verification token', 400));
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined; // ვშლით ვადასაც
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        status: 'success',
        message: 'Email verified successfully!'
    });
});

const changePassword = catchAsync(async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return next(new AppError("Please provide current and new password", 400));
    }

    // ვიღებთ user-ს DB-დან (რადგან password select:false ხშირად აქვთ)
    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
        return next(new AppError("User not found", 404));
    }

    // ვამოწმებთ ძველ პაროლს
    const isCorrect = await user.comparePassword(currentPassword, user.password);

    if (!isCorrect) {
        return next(new AppError("Current password is incorrect", 401));
    }

    // ვანახლებთ პაროლს
    user.password = newPassword;
    await user.save(); // აქ ავტომატურად დაიჰეშება pre('save')-ით

    res.status(200).json({
        status: "success",
        message: "Password updated successfully"
    });
});

const updateMe = catchAsync(async (req, res, next) => {
    // მხოლოდ საკუთარი მონაცემები
    const { fullname, email } = req.body;

    // არ აძლევს user-ს role-ს შეცვლის საშუალებას
    const updateData = { fullname, email };

    const user = await User.findByIdAndUpdate(req.user.id, updateData, { new: true });

    res.status(200).json({
        status: 'success',
        user
    });
});







// ექსპორტს ვუკეთებთ ფუნქციებსს 
module.exports = { signUp, login, logout, updateUser, updateMe, verifyEmail, getAllUsers, signToken, changePassword, deleteUser, updateMe };