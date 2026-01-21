// utils/email.js - ახალი ვერსია Resend-თვის
const { Resend } = require('resend');

// შექმენით Resend ინსტანცია
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (email, subject, text, html) => {
    try {
        console.log(' Sending email via Resend to:', email);

        // გამოიყენეთ Resend-ის API
        const { data, error } = await resend.emails.send({
            from: 'NovaRide <onboarding@resend.dev>', // უფასო ტესტ დომეინი
            to: email,
            subject: subject,
            html: html || text, // HTML თუ არის, წინააღმდეგ შემთხვევაში ტექსტი
            text: text // ტექსტური ვერსია
        });

        if (error) {
            console.error('❌ Resend error:', error);
            // არ გადააგდოთ ერორი, რომ მომხმარებელი მაინც შეიქმნას
            return null;
        }

        console.log('✅ Email sent successfully! ID:', data.id);
        return data;
    } catch (error) {
        console.error('❌ Unexpected email error:', error.message);
        return null; // დაბრუნდით null-ს, არ გადააგდოთ ერორი
    }
};

module.exports = sendEmail;