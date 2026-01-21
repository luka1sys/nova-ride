const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587, // შეცვალე 587-დან 2525-ზე
            secure: false,
            auth: {
                user: process.env.BREVO_USER,
                pass: process.env.BREVO_PASSWORD
            }
        });

        const mailOptions = {
            from: `"NovaRide" <dgebuadzeluka2008@gmail.com>`,
            to: email,
            subject: subject,
            text: text,
            html: html
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully via Brevo');
    } catch (error) {
        console.error('Brevo error:', error);
    }
};

module.exports = sendEmail;