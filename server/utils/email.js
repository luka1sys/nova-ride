const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text, html) => { // დავამატეთ html პარამეტრი
    try {
        // 1. ტრანსპორტერი
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // 465-ისთვის აუცილებელია true
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_APP_PASSWORD
            },
            // დაამატე ეს პარამეტრები, რომ კავშირი არ გაწყდეს
            connectionTimeout: 10000, // 10 წამი
            greetingTimeout: 10000,
            socketTimeout: 10000,
            tls: {
                rejectUnauthorized: false // ჰოსტინგზე კავშირის დასამყარებლად აუცილებელია
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