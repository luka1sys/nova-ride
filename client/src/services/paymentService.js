


import axios from 'axios'
const API = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL + "/api/checkout",
    withCredentials: true //  აუცილებელია cookies გადასაგზავნად
});
export const createCheckout = (data) => API.post('/', data)
export const confirmBookingPayment = (bookingId) => API.post('/confirm', { bookingId });