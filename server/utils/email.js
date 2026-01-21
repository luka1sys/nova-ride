const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 2525, // Render-ზე 2525 ყველაზე საიმედოა
            secure: false,
            auth: {
                // აქ აუცილებლად შენი იმეილი ჩაწერე .env-ში
                user: process.env.BREVO_USER, 
                pass: process.env.BREVO_PASSWORD
            }
        });

        const mailOptions = {
            from: `"NovaRide" <${process.env.BREVO_USER}>`,
            to: email,
            subject: subject,
            text: text,
            html: html
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully via Brevo');
    } catch (error) {
        console.error('❌ Email sending error:', error);
    }
};