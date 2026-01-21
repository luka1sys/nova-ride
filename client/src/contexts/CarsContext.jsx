import { createContext, useContext, useEffect, useState, useMemo } from "react"
import { createCar, deleteCar, fetchCars, updateCarService, } from "../services/carService";
import { toast } from "react-toastify";



const CarsContext = createContext()
export const useCars = () => useContext(CarsContext)
export const CarsProvider = ({ children }) => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        getCars();
    }, [])

    const getCars = async (filters = {}) => {
        const res = await fetchCars(filters);
        setCars(res.cars);
    }

    const addCar = async (formData) => {
        const toastId = toast.loading('processing...');

        try {
            const res = await createCar(formData);

            // ახალი მანქანის დამატება state-ში refresh-ის გარეშე
            setCars(prev => [res.data.car, ...prev]);
            toast.update(toastId, {
                render: 'Added successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            })

            return res.data;
        } catch (err) {
            toast.update(toastId, {
                render: err?.response?.data?.message || "Failed to add car",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });

        }
    };

    const deletedCar = async (id) => {
        const toastId = toast.loading('processing...');
        try {

            const res = await deleteCar(id);
            setCars(prev => prev.filter(car => car._id !== id));
            toast.update(toastId, {
                render: 'Deleted successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            })
            return res.data;
        } catch (err) {
            toast.update(toastId, {
                render: err?.response?.data?.message || "Failed to update car",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    };

    const updateCar = async (id, updateData) => {
        const toastId = toast.loading('processing...');
        try {
            const res = await updateCarService(id, updateData);
            setCars(prev => prev.map(car => car._id === id ? res.data.car : car));
            toast.update(toastId, {
                render: 'Updated successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            })
            return res.data;

        } catch (err) {
            toast.update(toastId, {
                render: err?.response?.data?.message || "Failed to update car",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    }

    const totalCars = useMemo(() => {
        return cars?.length || 0;
    }, [cars]);
    return (

        <CarsContext.Provider value={{ cars, getCars, addCar, deletedCar, updateCar, totalCars }}>
            {children}
        </CarsContext.Provider>
    )
}