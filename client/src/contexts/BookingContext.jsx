import { createContext, useContext, useState, useMemo } from "react";
import { createBooking as apiCreateBooking, deleteBooking, getAllBookings, getMyBookings } from "../services/bookngService";
import { createCheckout } from "../services/paymentService";
import { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const BookingContext = createContext();
export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
    const [booking, setBooking] = useState(null);
    const [myBookings, setMyBookings] = useState([]);
    const [allBookings, setAllBookings] = useState([]);
    const [error, setError] = useState('');
    const { user } = useAuth();
    useEffect(() => {
        if (user) {
            fetchMyBookings();
            if (user.role === 'admin') {
                fetchAllBookings();
            }
        } else {
            setMyBookings([]);
            setAllBookings([]);
        }
    }, [user])

    const createBooking = async (data) => {
        const toastId = toast.loading('processing...');
        try {
            const response = await apiCreateBooking(data);
            setBooking(response.data.booking);
            toast.update(toastId, {
                render: 'processed successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            })

            return response.data.booking;
        } catch (err) {
            toast.update(toastId, {
                render: err?.response?.data?.message || "Booking failed",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            setError(err?.response?.data?.message || "Booking failed");
            throw err;
        }
    };

    const fetchMyBookings = async () => {
        try {
            const response = await getMyBookings();
            setMyBookings(response.data.bookings);
        } catch (err) {
            alert(err?.response?.data?.message || "Failed to load bookings");
        }
    };

    const proccedToCheckout = async (bookingId) => {
        try {
            const response = await createCheckout({ bookingId });
            const { url } = response.data;
            window.location.href = url;
        } catch (err) {
            alert(err?.response?.data?.message || "Checkout failed");
            throw err;
        }
    };

    const fetchAllBookings = async () => {
        try {
            const response = await getAllBookings();
            setAllBookings(response.data.bookings);
        } catch (err) {
            console.log(err)
        }
    }

    const deletedBooking = async (id) => {
        const toastId = toast.loading('processing...');
        try {
            await deleteBooking(id); // call API
            // remove from allBookings
            setAllBookings(prev => prev.filter(booking => booking._id !== id));
            // remove from myBookings
            setMyBookings(prev => prev.filter(booking => booking._id !== id));
            toast.update(toastId, {
                render: 'Deleted successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            })
        } catch (err) {
            toast.update(toastId, {
                render: err?.response?.data?.message || "Booking failed",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    };

    const totalRevenue = useMemo(() => {
        return allBookings
            ?.filter(b => b.status?.toLowerCase() === 'confirmed')
            .reduce((sum, b) => sum + (b.totalPrice || 0), 0) || 0;
    }, [allBookings]);


    return (
        <BookingContext.Provider value={{ booking, myBookings, allBookings, error, createBooking, proccedToCheckout, fetchMyBookings, fetchAllBookings, deletedBooking, totalRevenue }}>
            {children}
        </BookingContext.Provider>
    );
};
