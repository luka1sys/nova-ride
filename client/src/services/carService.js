import axios from 'axios';
// axios-ს იმპორტი — ეს ბიბლიოთეკა გამოიყენება HTTP მოთხოვნების გასაკეთებად 
const API_URL = import.meta.env.VITE_SERVER_URL + "/api/cars";
// API-ის საბაზო URL — საიდანაც მანქანების მონაცემებს ვიღებთ.
export const fetchCars = async (filters = {}) => {

    const params = new URLSearchParams(filters);

    const res = await axios.get(API_URL + "?" + params.toString());
    return res.data;
};

export const createCar = (data) => {
    return axios.post(API_URL, data, { withCredentials: true });
};

export const deleteCar = (id) => {
    return axios.delete(API_URL + "/" + id, { withCredentials: true });
};

export const updateCarService = (id, data) => {
    return axios.patch(API_URL + "/" + id, data, { withCredentials: true });
}