const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function () {
            // password საჭირო მხოლოდ მაშინ, როცა არაა OAuth მომხმარებელი
            return !this.oauthProvider;
        },
        minlength: 6,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isVerified: { // email-ვერიფიკაციისთვის
        type: Boolean,
        default: false
    },
    isActive: {

        type: Boolean,
        default: true
    },

    oauthProvider: {
        type: String,
        enum: ["google", "facebook", "github", null],
        default: null
    },
    oauthId: {
        type: String,
        default: null
    },
    verificationToken: String,
    verificationTokenExpires: Date
})
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);  // ← აქ უნდა გქონდეს await
    next();
})
userSchema.methods.comparePassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.createVerificationToken = function () {
    const token = crypto.randomBytes(32).toString('hex');
    this.verificationToken = token;

    // ლინკი ვალიდური იქნება 24 საათის განმავლობაში
    this.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;

    return token;
};



const User = mongoose.model('User', userSchema, 'users')
module.exports = User