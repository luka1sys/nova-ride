import axios from "axios";

// Base URL Review API-სთვის
const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL + "/api/reviews",
  withCredentials: true, // აუცილებელია cookies გადასაგზავნად (JWT)
});


export const createReview = (data) => API.post("/", data);

export const getCarReviews = (carId) => API.get(`/${carId}`);