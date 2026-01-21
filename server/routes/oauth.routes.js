
const express = require('express');
const { googleCallBack, getGoogleAuthUrl } = require('../controllers/oauth.controller');

const oauthRouter = express.Router();


oauthRouter.get('/google/callback', googleCallBack)
oauthRouter.get('/google', getGoogleAuthUrl)




module.exports = oauthRouter


