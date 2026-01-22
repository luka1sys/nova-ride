import React, { useState } from 'react'; // დავამატეთ useState
import { useParams, useNavigate } from "react-router-dom";
import CreateBookingForm from "../components/BookingForm";
import { useTranslation } from "react-i18next";
import { CreditCard, Banknote } from 'lucide-react'; // იკონებისთვის

const BookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' ან 'cash'

    // ეს ფუნქცია გამოიძახება მაშინ, როცა ფორმა წარმატებით შეივსება
    const handleBookingSuccess = () => {
        if (paymentMethod === 'cash') {
            navigate('/paymentsuccess');
        } else {
            // აქ მიდის სტანდარტული გადახდის (Card) ლოგიკა
            // მაგალითად: navigate('/checkout'); 
            // თუ პირდაპირ ჯავშნის დასრულებაზე გადაგყავდათ, დატოვეთ თქვენი ძველი ლოგიკა
            navigate('/paymentsuccess'); // დროებითი
        }
    };

    if (!id) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505]">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white tracking-tighter">{t("MACHINE NOT FOUND")}</h1>
                    <button onClick={() => navigate(-1)} className="mt-6 text-[#FE9A00] uppercase tracking-widest">{t("Go Back")}</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] flex flex-col items-center font-sans">
            <div className="max-w-[1200px] w-full p-6 md:p-12">
                <div className="mb-12">
                    <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-xs text-gray-500 hover:text-[#FE9A00]">
                        ← {t("Back to Vehicle details")}
                    </button>
                    <h1 className="text-4xl md:text-5xl font-bold text-white">
                        {t("Complete Your")} <span className="text-[#FE9A00]">{t("Reservation")}</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8">
                        <div className="bg-[#0c0c0c] border border-white/10 rounded-3xl p-8 md:p-10">
                            
                            {/* Payment Method Selection */}
                            <div className="mb-10">
                                <h2 className="text-xl font-semibold text-white mb-4">{t("Select Payment Method")}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <button 
                                        onClick={() => setPaymentMethod('card')}
                                        className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${paymentMethod === 'card' ? 'border-[#FE9A00] bg-[#FE9A00]/10' : 'border-white/5 bg-white/[0.02]'}`}
                                    >
                                        <CreditCard className={paymentMethod === 'card' ? 'text-[#FE9A00]' : 'text-gray-500'} />
                                        <div className="text-left">
                                            <p className="text-sm font-bold text-white">{t("Pay with Card")}</p>
                                            <p className="text-[11px] text-gray-500">{t("Visa, MasterCard, Amex")}</p>
                                        </div>
                                    </button>

                                    <button 
                                        onClick={() => setPaymentMethod('cash')}
                                        className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${paymentMethod === 'cash' ? 'border-[#FE9A00] bg-[#FE9A00]/10' : 'border-white/5 bg-white/[0.02]'}`}
                                    >
                                        <Banknote className={paymentMethod === 'cash' ? 'text-[#FE9A00]' : 'text-gray-500'} />
                                        <div className="text-left">
                                            <p className="text-sm font-bold text-white">{t("Pay with Cash")}</p>
                                            <p className="text-[11px] text-gray-500">{t("Pay at the office")}</p>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <div className="mb-6 border-b border-white/5 pb-6">
                                <h2 className="text-xl font-semibold text-white">{t("Personal Information")}</h2>
                            </div>

                            <div className="booking-form-wrapper custom-dark-form">
                                {/* გადავცემთ onSuccess ჰუკს ფორმას */}
                                <CreateBookingForm carId={id} paymentMethod={paymentMethod} onSuccess={handleBookingSuccess} />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[#0c0c0c] border border-white/10 p-8 rounded-3xl">
                            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-[#FE9A00]">{t("Service Benefits")}</h3>
                            <ul className="space-y-4">
                                {["Professional Concierge", "Premium Insurance", "Flexible Cancellation"].map((text, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300">
                                        <div className="w-1.5 h-1.5 bg-[#FE9A00] rounded-full"></div>
                                        {t(text)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="bg-[#FE9A00] p-8 rounded-3xl text-black">
                            <p className="text-xs font-bold uppercase opacity-70">{t("Need fast help?")}</p>
                            <p className="font-bold text-2xl">+995 555 123 456</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <footer className="mt-auto py-10 w-full border-t border-white/5 text-center text-gray-600 text-[11px] uppercase tracking-widest">
                © 2024 NovaRide Premium - {t("All Rights Reserved")}
            </footer>

            <style jsx>{`
                .custom-dark-form input, .custom-dark-form select, .custom-dark-form textarea {
                    background: #151515 !important;
                    border: 1px solid #252525 !important;
                    color: #fff !important;
                    border-radius: 12px !important;
                    padding: 14px !important;
                    width: 100%;
                    outline: none !important;
                }
                .custom-dark-form button[type="submit"] {
                    background: #FE9A00 !important;
                    color: #000 !important;
                    font-weight: 700 !important;
                    width: 100%;
                    padding: 16px !important;
                    border-radius: 14px !important;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
};

export default BookingPage;