const express = require('express')
const { signUp, login, logout, updateUser, verifyEmail, getAllUsers, changePassword, deleteUser, updateMe, forgotPassword, resetPassword } = require('../controllers/auth.controller')
const { protect, restrictTo } = require('../middleware/auth.middleware')
const { get } = require('mongoose')
const authRouter = express.Router()

authRouter.post('/signup', signUp)
authRouter.post('/login', login)
authRouter.get('/logout', logout)
authRouter.get('/', protect, restrictTo('admin'), getAllUsers)
authRouter.patch('/update/:id', protect, restrictTo('admin'), updateUser)
authRouter.delete('/delete/:id', protect, restrictTo('admin'), deleteUser);
authRouter.get('/verify/:token', verifyEmail)

authRouter.patch('/change-password', protect, changePassword);
authRouter.patch('/update-me', protect, updateMe);
authRouter.post('/forgotPassword', forgotPassword);

// 2. პაროლის რეალური შეცვლა ტოკენის მეშვეობით
authRouter.patch('/resetPassword/:token', resetPassword);

authRouter.get('/me', protect, (req, res) => {
    res.json({
        loggedIn: true,
        user: req.user
    });
});



module.exports = authRouter