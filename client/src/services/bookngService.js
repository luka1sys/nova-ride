
import axios from 'axios'
const API = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL  + "/api/booking",
    withCredentials: true //  აუცილებელია cookies გადასაგზავნად
});
export const createBooking = (data) => API.post('/', data)
export const getMyBookings = () => API.get('/my');
export const getAllBookings = () => API.get('/');
export const deleteBooking = (id) => API.delete(`/${id}`);
