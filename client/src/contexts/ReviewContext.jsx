import React, { createContext, useContext, useState } from "react";
import { createReview, getCarReviews } from "../services/reviewService";
import { useEffect } from "react";



const ReviewContext = createContext();
export const useReview = () => useContext(ReviewContext);

export const ReviewProvider = ({ children }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        loadReviews();

    }, []);

    const loadReviews = async (carId) => {
        try {


            const response = await getCarReviews(carId);
            setReviews(response.data.reviews || []);
        } catch (err) {
            console.log("load reviews error:", err.response?.data?.message || err.message);
        }
    };

    const addReview = async (data) => {
        try {
            const response = await createReview(data);
            setReviews((prev) => [...prev, response.data.review]);
            return response.data.review;
        } catch (err) {
            console.log("review error:", err.response?.data?.message || err.message);

            throw err;
        }
    };
    console.log("reviews from context:", reviews);
    return (
        <ReviewContext.Provider value={{ reviews, loadReviews, addReview }}>
            {children}
        </ReviewContext.Provider>
    );
};



