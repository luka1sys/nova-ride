
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
        // cookie ს  ვადა 
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

    const verificationURL = `${req.protocol}://${req.get('host')}/api/users/verify/${verificationToken}`;

    const htmlMessage = `
<div style="background-color: #f0f2f5; padding: 60px 0; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #2d3436;">
    <div style="max-width: 550px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08);">
        
        <div style="background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%); padding: 30px; text-align: center;">
            <div style="font-size: 28px; font-weight: 800; color: #ffffff; letter-spacing: 2px; text-transform: uppercase;">
                <span style="color: #ff9500;">NovaRide</span>
            </div>
        </div>
        <div style="padding: 50px 40px; text-align: center;">
            <div style="margin-bottom: 25px;">
                <div style="display: inline-block; background-color: #e3f2fd; padding: 15px; border-radius: 50%; margin-bottom: 20px;">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0052cc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>
                <h2 style="margin: 0; color: #1a1a1a; font-size: 26px; font-weight: 700;">You’re almost ready!</h2>
            </div>

            <p style="font-size: 17px; line-height: 1.7; color: #5c6c75; margin-bottom: 30px;">
               Thank you for your interest in Fleet Rental. To activate your account, only one step is required — please confirm your email.
            </p>
            
            <div style="margin: 40px 0;">
                <a href="${verificationURL}" 
                   style="background: linear-gradient(to right, #0052cc, #007aff); color: #ffffff; padding: 18px 45px; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 5px 15px rgba(0, 82, 204, 0.3);">
                    Verify Your Email
                </a>
            </div>
            
            <hr style="border: 0; border-top: 1px solid #edf2f7; margin: 40px 0;">
            
            <p style="font-size: 13px; color: #a0aec0; line-height: 1.5;">
                If the button above doesn't work, please visit the link below: <br>
                <a href="${verificationURL}" style="color: #0052cc; text-decoration: none; word-break: break-all;">${verificationURL}</a>
            </p>
        </div>

        <div style="background-color: #fcfcfc; padding: 25px; text-align: center; border-top: 1px solid #f1f1f1;">
            <p style="font-size: 12px; color: #bdc3c7; margin-bottom: 8px;">
                If this registration does not belong to you, simply delete this email.
            </p>
            <p style="font-size: 12px; color: #95a5a6; font-weight: bold; margin: 0;">
                © 2024 Fleet Rental Team.
            </p>
        </div>
    </div>
</div>`;

    
    sendEmail(
        email,
        'Verify your account',
        `Please verify your account here: ${verificationURL}`,
        htmlMessage
    ).catch(err => {
        
        console.error("Background Email Send Error:", err);
    });

    //  პასუხს ვაბრუნებთ 
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

    // ვეძებთ მომხმარებელს, რომელსაც აქვს ეს ტოკენი და მისი ვადა ჯერ არ გასულა 
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

    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
        return next(new AppError("User not found", 404));
    }


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


const crypto = require('crypto'); 

const forgotPassword = catchAsync(async (req, res, next) => {
    //  ვეძებთ იუზერს მეილის მიხედვით
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError('There is no user with email address.', 404));
    }

    //  ვაგენერირებთ შემთხვევით ტოკენს
    const resetToken = crypto.randomBytes(32).toString('hex');

    // ვინახავთ დაჰეშირებულ ტოკენს ბაზაში უსაფრთხოებისთვის
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // ვადა 10 წუთი

    await user.save({ validateBeforeSave: false });

    //  ვუგზავნით მეილზე ლინკს
    const resetURL = `${process.env.CLIENT_URL}/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a new password to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

    try {
        await sendEmail(user.email, 'Your password reset token (valid for 10 min)', message);

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!'
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new AppError('There was an error sending the email. Try again later!', 500));
    }
});


const resetPassword = catchAsync(async (req, res, next) => {
    //  ვიღებთ დაჰეშირებულ ტოკენს URL-იდან მოსული ტოკენის საფუძველზე
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    //  ვეძებთ იუზერს, ვისაც ეს ტოკენი აქვს და ვადა არ გასვლია
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });

    // თუ იუზერი არ არსებობს ან ტოკენს ვადა გაუვიდა
    if (!user) {
        return next(new AppError('Token is invalid or has expired', 400));
    }

    // ვცვლით პაროლს
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    //  ავტომატურად ვაკეთებთ ლოგინს (ვუგზავნით ახალ JWT ტოკენს)
    createSendToken(user, 200, res);
});







// ექსპორტს ვუკეთებთ ფუნქციებსს 
module.exports = { signUp, login, logout, updateUser, updateMe, verifyEmail, getAllUsers, signToken, changePassword, deleteUser, updateMe, forgotPassword, resetPassword };