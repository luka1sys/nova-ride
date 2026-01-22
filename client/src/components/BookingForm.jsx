import { useState } from "react";
import { useBooking } from "../contexts/BookingContext";
import { useCars } from "../contexts/CarsContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // დავამატეთ ნავიგაცია

const CreateBookingForm = ({ carId, paymentMethod, onSuccess }) => {
    const { createBooking, proccedToCheckout, error } = useBooking();
    const { cars } = useCars();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);

    const car = cars?.find(c => c._id === carId);

    let days = 0;
    let totalPrice = 0;

    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        if (days > 0 && car) {
            totalPrice = days * car.pricePerDay;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!startDate || !endDate) return alert(t("Please select both dates"));

        setLoading(true);
        try {
            // 1. ჯერ ვქმნით ჯავშანს
            const newBooking = await createBooking({
                carId,
                startDate,
                endDate,
                paymentMethod
            });

            // 2. ვამოწმებთ გადახდის მეთოდს
            if (paymentMethod === 'cash') {
                // თუ ქეშია - პირდაპირ წარმატების გვერდზე
                navigate('/paymentsuccess');
            } else if (paymentMethod === 'card') {
                // თუ ბარათია - ჯერ გადავიყვანოთ სტრაიპზე
                // აქ navigate('/paymentsuccess') არ უნდა ეწეროს!
                await proccedToCheckout(newBooking._id);

                // შენიშვნა: Stripe-იდან უკან დაბრუნებას (წარმატების შემთხვევაში) 
                // ბექენდი და Stripe-ის კონფიგურაცია აკონტროლებს (success_url)
            }

            // ფორმის გასუფთავება მხოლოდ წარმატების შემთხვევაში
            setStartDate("");
            setEndDate("");

        } catch (err) {
            console.error("Booking failed:", err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            {/* Error Message Section */}
            {error && (
                <div className="flex items-center gap-3 p-4 bg-red-500/10 border-l-4 border-[#FE9A00] rounded-r-xl">
                    <p className="text-[11px] font-black uppercase tracking-tight text-[#FE9A00]">
                        {t(error)}
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-[0.2em] ml-1">
                        {t("Pick-up Date")}
                    </label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        className="w-full p-4 bg-[#151515] border border-white/5 rounded-xl text-white outline-none focus:border-[#FE9A00] transition-all"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-[0.2em] ml-1">
                        {t("Return Date")}
                    </label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                        className="w-full p-4 bg-[#151515] border border-white/5 rounded-xl text-white outline-none focus:border-[#FE9A00] transition-all"
                    />
                </div>
            </div>

            {/* Price Summary Card */}
            <div className="p-6 border border-white/10 rounded-2xl flex justify-between items-center bg-white/[0.02]">
                <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#FE9A00] animate-pulse"></div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                        {t("Total Summary")}
                    </p>
                </div>

                <div className="text-right">
                    <div className="text-2xl font-black text-[#FE9A00]">
                        {days > 0 ? `$${totalPrice.toLocaleString()}` : "$0"}
                    </div>
                    <div className="text-[10px] text-gray-500 uppercase font-bold">
                        {days > 0 ? `${days} ${t("days total")}` : t("Select dates")}
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-5 rounded-xl font-black uppercase tracking-[0.2em] text-sm transition-all duration-300
                    ${loading
                        ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                        : "bg-[#FE9A00] text-black hover:bg-white hover:scale-[1.01]"
                    }`}
            >
                {loading ? t("Processing...") : paymentMethod === 'cash' ? t("Confirm & Pay Cash") : t("Proceed to Payment")}
            </button>
        </form>
    );
};

export default CreateBookingForm;