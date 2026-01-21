import { useParams, useNavigate } from "react-router-dom";
import CreateBookingForm from "../components/BookingForm";
import { useTranslation } from "react-i18next"; // იმპორტი

const BookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation(); // ინიციალიზაცია

    if (!id) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505]">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white tracking-tighter">{t("MACHINE NOT FOUND")}</h1>
                    <button
                        onClick={() => navigate(-1)}
                        className="mt-6 text-[#FE9A00] font-semibold uppercase tracking-widest hover:text-white transition-colors"
                    >
                        ← {t("Go Back")}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] flex flex-col items-center font-sans selection:bg-[#FE9A00] selection:text-black">
            
            {/* Top Slim Accent */}
            <div className="w-full h-[1px] bg-white/5"></div>

            <div className="max-w-[1200px] w-full p-6 md:p-12">
                
                {/* Clean Header Section */}
                <div className="mb-12">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-6 flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-[#FE9A00] transition-colors group"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> {t("Back to Vehicle details")}
                    </button>
                    
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                        {t("Complete Your")} <span className="text-[#FE9A00]">{t("Reservation")}</span>
                    </h1>
                    <p className="text-gray-400 mt-2 text-lg">{t("Experience premium mobility with NovaRide.")}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Side: Form Container */}
                    <div className="lg:col-span-8">
                        <div className="bg-[#0c0c0c] border border-white/10 shadow-2xl rounded-3xl overflow-hidden">
                            <div className="p-8 md:p-10">
                                <div className="mb-10 border-b border-white/5 pb-6">
                                    <h2 className="text-xl font-semibold text-white">{t("Personal Information")}</h2>
                                    <p className="text-sm text-gray-500 mt-1">{t("Please provide valid details to ensure a smooth pickup process.")}</p>
                                </div>

                                {/* Booking Form Wrapper */}
                                <div className="booking-form-wrapper custom-dark-form">
                                    <CreateBookingForm carId={id} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Sidebar Info */}
                    <div className="lg:col-span-4 space-y-6">
                        
                        {/* Highlights Card */}
                        <div className="bg-[#0c0c0c] border border-white/10 p-8 rounded-3xl shadow-lg">
                            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-[#FE9A00]">{t("Service Benefits")}</h3>
                            <ul className="space-y-4">
                                {[
                                    "Professional Concierge",
                                    "Premium Insurance Included",
                                    "Flexible Cancellation",
                                    "24/7 Support Hotline"
                                ].map((text, i) => (
                                    <li key={i} className="flex items-center gap-3 text-[15px] text-gray-300">
                                        <div className="w-1.5 h-1.5 bg-[#FE9A00] rounded-full"></div>
                                        {t(text)}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Direct Contact Card */}
                        <div className="bg-[#FE9A00] p-8 rounded-3xl text-black">
                            <p className="text-xs font-bold uppercase tracking-wider mb-1 opacity-70">{t("Need fast help?")}</p>
                            <p className="font-bold text-2xl tracking-tight">+995 555 123 456</p>
                            <div className="mt-4 pt-4 border-t border-black/10">
                                <p className="text-sm font-medium leading-tight">{t("Our team is ready to assist you with your booking 24/7.")}</p>
                            </div>
                        </div>

                        {/* Safety Notice */}
                        <div className="p-6 border border-white/5 rounded-2xl bg-white/[0.01] flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">{t("Secure Checkout")}</p>
                                <p className="text-[11px] text-gray-600">{t("SSL Encrypted Connection")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Simple Footer */}
            <footer className="mt-auto py-10 w-full border-t border-white/5">
                <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center text-gray-600 text-[11px] font-medium uppercase tracking-widest">
                    <span>NovaRide Premium</span>
                    <span>© 2024 {t("All Rights Reserved")}</span>
                </div>
            </footer>

            <style jsx>{`
                .custom-dark-form input, 
                .custom-dark-form select, 
                .custom-dark-form textarea {
                    background: #151515 !important;
                    border: 1px solid #252525 !important;
                    color: #fff !important;
                    border-radius: 12px !important;
                    padding: 14px !important;
                    font-size: 15px !important;
                    width: 100%;
                    outline: none !important;
                    transition: border-color 0.2s;
                }
                .custom-dark-form input:focus {
                    border-color: #FE9A00 !important;
                }
                .custom-dark-form label {
                    color: #888 !important;
                    font-size: 13px !important;
                    margin-bottom: 6px !important;
                    display: block;
                }
                .custom-dark-form button {
                    background: #FE9A00 !important;
                    color: #000 !important;
                    font-weight: 700 !important;
                    padding: 16px !important;
                    border-radius: 14px !important;
                    font-size: 16px !important;
                    margin-top: 10px !important;
                    cursor: pointer;
                }
                .custom-dark-form button:hover {
                    background: #fff !important;
                }
            `}</style>
        </div>
    );
};

export default BookingPage;