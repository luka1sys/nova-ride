import { useState } from "react";
import { useBooking } from "../contexts/BookingContext";
import { useCars } from "../contexts/CarsContext";
import { useTranslation } from "react-i18next"; // იმპორტი

const CreateBookingForm = ({ carId }) => {
    const { createBooking, proccedToCheckout, error, booking } = useBooking();
    const { cars } = useCars();
    const { t } = useTranslation(); // ინიციალიზაცია
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
            const booking = await createBooking({ carId, startDate, endDate });
            await proccedToCheckout(booking._id);
            setStartDate("");
            setEndDate("");
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            {/* Error Message Section */}
            {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border-l-4 border-[#ff3131] rounded-r-xl animate-shake">
                    <svg className="text-[#ff3131] shrink-0" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-[11px] font-black uppercase tracking-tight text-[#ff3131]">
                        {t(error)}
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-[0.2em] ml-1">
                        {t("Pick-up Date")}
                    </label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#ff3131] focus:border-transparent outline-none transition-all font-medium text-gray-700"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-[0.2em] ml-1">
                        {t("Return Date")}
                    </label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#ff3131] focus:border-transparent outline-none transition-all font-medium text-gray-700"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-bold text-gray-400 tracking-[0.2em] ml-1">
                    {t("Special Instructions (Optional)")}
                </label>
                <textarea
                    placeholder={t("E.g. I will arrive late, please prepare a child seat...")}
                    rows="3"
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#ff3131] focus:border-transparent outline-none transition-all font-medium text-gray-700 resize-none"
                ></textarea>
            </div>

            <div className="p-5 border border-white/5 rounded-2xl flex justify-between items-center bg-white/[0.03] backdrop-blur-md shadow-xl">
                {/* მარცხენა მხარე: სტატუსი */}
                <div className="flex items-center gap-3">
                    <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </div>
                    <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.1em] text-white/90 italic">
                        {t("Instant confirmation")}
                    </p>
                </div>

                {/* მარჯვენა მხარე: ფასი და დღეები */}
                <div className="text-right">
                    <div className="text-xl font-black text-white leading-none">
                        {days > 0 ? (
                            `$${totalPrice.toLocaleString()}`
                        ) : (
                            <span className="text-amber-500/50 text-sm uppercase tracking-widest">{t("Pending")}</span>
                        )}
                    </div>
                    <div className="mt-1">
                        <span className="text-[9px] text-gray-500 uppercase tracking-tighter font-bold">
                            {days > 0 
                                ? `${days} ${t("days total")}` 
                                : t("Please select dates")}
                        </span>
                    </div>
                </div>
            </div>
            
            <button
                type="submit"
                disabled={loading}
                className={`w-full py-5 rounded-xl font-black uppercase tracking-[0.2em] text-sm transition-all duration-300 transform active:scale-95 shadow-lg 
                    ${loading
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-black text-white hover:bg-[#ff3131] hover:shadow-red-200"
                    }`}
            >
                {loading ? t("Processing...") : t("Confirm Reservation")}
            </button>

            <p className="text-center text-[9px] text-gray-400 uppercase tracking-widest">
                NovaRide • {t("Premium Fleet Services")}
            </p>
        </form>
    );
};

export default CreateBookingForm;