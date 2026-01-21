import React from 'react';
import { createBooking } from '../api/checkout'; // შენს API ფაილშია ზემოთ
import { createCheckout } from '../services/paymentService';

const BookingButton = ({ bookingId }) => {
    const handleBooking = async () => {
        try {
            // POST request backend-ში, რომ შექმნას Stripe session
            const response = await createCheckout({ bookingId });
            const { url } = response.data;

            // გადამისამართება Stripe Checkout page-ზე
            window.location.href = url;
        } catch (err) {
            console.error('Error creating booking:', err);
            alert('Booking failed. Try again!');
        }
    };

    return (
        <button
            onClick={handleBooking}
            className="bg-blue-600 text-white px-4 py-2 rounded"
        >
            Book Now
        </button>
    );
};

export default BookingButton;