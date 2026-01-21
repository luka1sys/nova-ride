const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text, html) => { // დავამატეთ html პარამეტრი
    try {
        // 1. ტრანსპორტერი
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_APP_PASSWORD
            }
        });

        // 2. წერილის პარამეტრები
        const mailOptions = {
            from: `"Fleet Admin" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: subject,
            text: text, // fallback მათთვის, ვისაც HTML არ ეხსნება
            html: html  // აქ ჩაჯდება დიზაინი
        };

        // 3. გაგზავნა
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);

    } catch (error) {
        console.error('Email sending error:', error);
        // სურვილისამებრ შეგიძლია აქ AppError ისროლო, თუ გინდა რომ რეგისტრაცია გაჩერდეს ემაილის გაგზავნის გარეშე
    }
};

module.exports = sendEmail;