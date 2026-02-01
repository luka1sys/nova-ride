const axios = require('axios');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const { signToken } = require('./auth.controller');

// Google OAuth URLs
const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v1/userinfo';


const createSendToken = (user, res) => {
    const token = signToken(user);

    res.cookie('lt', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 კვირა
    });

    return res.redirect(`${process.env.CLIENT_URL}`);
};

const getGoogleAuthUrl = (req, res) => {
    const params = new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        response_type: 'code',
        scope: 'openid email profile',
        access_type: 'offline',
        prompt: 'consent',
    });

    res.redirect(`${GOOGLE_AUTH_URL}?${params.toString()}`);
};

const googleCallBack = async (req, res, next) => {
    try {
        const { code } = req.query;

        const tokenResponse = await axios.post(
            GOOGLE_TOKEN_URL,
            new URLSearchParams({
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI,
                grant_type: 'authorization_code',
            }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        const { access_token } = tokenResponse.data;

        const userInfoResponse = await axios.get(GOOGLE_USERINFO_URL, {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        const { name, email, id, verified_email } = userInfoResponse.data;

        if (!verified_email) {
            return next(new AppError('Email not verified by Google', 400));
        }

        let user = await User.findOne({ email });

        if (user) {
            return createSendToken(user, res);
        }

        // Create new OAuth user
        user = await User.create({
            fullname: name,
            email,
            oauthId: id,
            oauthProvider: 'google',
            isActive: true,
            isVerified: true,
        });

        createSendToken(user, res);

    } catch (err) {
        console.error('Google OAuth Error:', err);
        return next(new AppError('Failed to login with Google', 500));
    }
};

module.exports = { googleCallBack, getGoogleAuthUrl };