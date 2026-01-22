import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmBookingPayment } from "../services/paymentService";
import { useBooking } from "../contexts/BookingContext";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";

const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const bookingId = searchParams.get("bookingId");
    const { fetchMyBookings, fetchAllBookings } = useBooking();
    const { user } = useAuth();
    const isAdmin = user?.role === "admin";
    const accentColor = "#FE9A00";

    // დაამატე fetchAllBookings დესტრუქტურიზაციაში


    useEffect(() => {
        if (!bookingId) return;

        const updateData = async () => {
            try {
                // 1. ვადასტურებთ გადახდას
                await confirmBookingPayment(bookingId);

                // 2. პატარა დაყოვნება (მაგ: 500ms), რომ ბაზამ მოასწროს სტატუსის შეცვლა
                await new Promise(resolve => setTimeout(resolve, 500));

                // 3. ვაახლებთ მომხმარებლის პირად ჯავშნებს
                await fetchMyBookings();

                // 4. თუ ადმინია, ვაახლებთ ყველა ჯავშნის სიასაც (ესაა მთავარი!)
                if (user?.role === 'admin') {
                    await fetchAllBookings();
                }
            } catch (err) {
                console.error("Failed to confirm booking", err);
            }
        };

        updateData();
    }, [bookingId, user, fetchMyBookings, fetchAllBookings]);

    return (
        <section className="bg-[#050505] min-h-screen py-10 md:py-20 px-4 md:px-6 relative overflow-hidden font-sans flex items-center justify-center">

            {/* Background Typography - Hidden on small mobile to avoid clutter */}
            <div className="absolute top-10 left-10 text-[15vw] md:text-[10vw] font-black text-white/[0.01] leading-none select-none pointer-events-none uppercase hidden xs:block">
                {t("SUCCESS")}
            </div>

            <div className="max-w-6xl mx-auto w-full relative z-10">
                {/* Grid: 1 column on mobile, 2 on desktop */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white/[0.02] backdrop-blur-md border border-white/5 p-6 md:p-16 rounded-[30px] md:rounded-[40px]">

                    {/* Left Side: Content */}
                    <div className="text-left order-2 lg:order-1">
                        <div className="mb-6 md:mb-8">
                            <div className="flex items-center gap-2 mb-4 justify-start">
                                <div className="w-8 h-[1px]" style={{ backgroundColor: accentColor }}></div>
                                <span style={{ color: accentColor }} className="font-bold tracking-widest uppercase text-[9px] md:text-[10px]">
                                    {t("Transaction Completed")}
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
                                {t("Booking")} <span className="text-white/50 font-light">{t("Confirmed.")}</span>
                            </h2>

                            <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-md">
                                {t("Your reservation has been secured. A confirmation email is being prepared for your inbox.")}
                            </p>
                        </div>

                        {/* Order Details Strip - Responsive Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-8 md:mb-10 border-t border-white/5 pt-6 md:pt-8">
                            <div>
                                <p className="text-gray-600 text-[8px] md:text-[9px] uppercase tracking-widest mb-1">{t("Reference ID")}</p>
                                <p className="text-white text-[11px] md:text-sm font-mono tracking-tighter truncate">
                                    #{bookingId?.slice(-8).toUpperCase() || "SUCCESS"}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-[8px] md:text-[9px] uppercase tracking-widest mb-1">{t("System Status")}</p>
                                <div className="flex items-center gap-2 text-green-500">
                                    <div className="w-1.5 h-1.5 rounded-full bg-current animate-ping"></div>
                                    <p className="text-[10px] md:text-[11px] font-bold uppercase">{t("Verified Safe")}</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons - Stack on very small screens */}
                        <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
                            <button
                                onClick={() => navigate(isAdmin ? "/adminpanel" : "/panel")}
                                style={{ backgroundColor: accentColor }}
                                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 text-black font-bold text-[10px] md:text-xs rounded-full hover:scale-105 transition-all active:scale-95 uppercase tracking-widest"
                            >
                                {t("view My Bookings")}
                            </button>
                            <button
                                onClick={() => navigate("/")}
                                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border border-white/10 text-white font-bold text-[10px] md:text-xs rounded-full hover:bg-white hover:text-black transition-all uppercase tracking-widest"
                            >
                                {t("go to Home")}
                            </button>
                        </div>
                    </div>

                    {/* Right Side: Visual Showcase - Responsive scaling */}
                    <div className="relative flex justify-center items-center order-1 lg:order-2">
                        <div className="relative z-10 w-full max-w-[200px] md:max-w-sm aspect-square bg-gradient-to-b from-white/5 to-transparent rounded-3xl p-6 md:p-8 border border-white/5">
                            <img
                                src="/success.png"
                                className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(254,154,0,0.15)] md:drop-shadow-[0_0_30px_rgba(254,154,0,0.2)]"
                                alt="Success"
                            />
                        </div>

                        {/* Decorative Circles - Scaled for mobile */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-white/[0.03] rounded-full animate-spin-slow"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 border border-white/[0.05] rounded-full"></div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .animate-spin-slow {
                    animation: spin 20s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
};

export default PaymentSuccessPage;

















// import { useState } from "react";
// import { useAuth } from "../contexts/AuthContext";
// import { useBooking } from "../contexts/BookingContext";

// const Panel = () => {
//     const { logout, user } = useAuth();
//     const { myBookings } = useBooking();
//     const [showSettings, setShowSettings ]= useState(false);




//     return (
//         <div className="flex min-h-screen  bg-[#fcfcfc] font-sans">

//             {/* --- SIDEBAR --- */}
//             <aside className="w-64 bg-black ml-[20px] rounded-tl-[30px] text-white flex flex-col hidden md:flex">
//                 <div className="p-8 text-2xl font-black italic tracking-tighter">
//                     NOVA<span className="text-[#ff3131]">RIDE</span>
//                 </div>

//                 <nav className="flex-1 px-4 space-y-2">
//                     <a href="#" className="flex items-center p-3 bg-[#ff3131] rounded-lg font-bold">Dashboard</a>
//                     <button  href="#" className="flex items-center cursor-pointer p-3 hover:bg-white/10 rounded-lg transition-colors">My Bookings</button >

//                     <button className="flex items-center  cursor-pointer p-3 hover:bg-white/10 rounded-lg transition-colors" onClick={(e) => {
//                         e.preventDefault();
//                         setShowSettings(prev => !prev);
//                     }}>Settings</button>
//                 </nav>
//                 {showSettings &&
//                     <div className="mb-[400px] p-3 pl-15 border-t border-white/10">
//                         <button onClick={logout} className="flex items-center text-gray-400 hover:text-[#ff3131] transition-colors">
//                             Logout →
//                         </button>
//                     </div>
//                 }


//             </aside>

//             {/* --- MAIN CONTENT --- */}
//             <main className="flex-1 flex flex-col">

//                 {/* Top Header */}
//                 <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8">
//                     <h1 className="text-xl font-bold uppercase tracking-tight">User Dashboard</h1>
//                     <div className="flex items-center gap-4">
//                         <div className="text-right">
//                             <p className="text-sm font-bold leading-none">{user.fullname}</p>
//                             <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{user.role}</p>
//                         </div>
//                         <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-[#ff3131]">
//                             {user.fullname?.charAt(0).toUpperCase()}
//                         </div>
//                     </div>
//                 </header>

//                 <div className="p-8 space-y-8">

//                     {/* --- STATS SECTION --- */}
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
//                             <div className="absolute top-0 right-0 w-16 h-16 bg-[#ff3131]/5 rounded-bl-full transition-all group-hover:scale-110"></div>
//                             <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Active Bookings</p>
//                             <p className="text-4xl font-black mt-2">{myBookings.length}</p>
//                         </div>
//                         <div className="bg-black text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
//                             <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total Distance</p>
//                             <p className="text-4xl font-black mt-2 italic">1,240 <span className="text-[#ff3131] text-lg">km</span></p>
//                         </div>
//                         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//                             <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Account Status</p>
//                             <p className="text-xl font-bold mt-2 text-green-500 flex items-center gap-2">
//                                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Verified
//                             </p>
//                         </div>
//                     </div>

//                     {/* --- TABLE SECTION --- */}
//                     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//                         <div className="p-6 border-b border-gray-50 flex justify-between items-center">
//                             <h3 className="font-black uppercase tracking-tight italic text-lg">Recent Bookings</h3>
//                             <button className="text-[#ff3131] text-xs font-bold uppercase hover:underline">View All</button>
//                         </div>
//                         <div className="overflow-x-auto">
//                             <table className="w-full text-left border-collapse">
//                                 <thead className="bg-gray-50/50">
//                                     <tr>
//                                         <th className="p-4 text-[10px] uppercase font-bold text-gray-400 tracking-widest">Car Model</th>
//                                         <th className="p-4 text-[10px] uppercase font-bold text-gray-400 tracking-widest">Date</th>
//                                         <th className="p-4 text-[10px] uppercase font-bold text-gray-400 tracking-widest">Status</th>
//                                         <th className="p-4 text-[10px] uppercase font-bold text-gray-400 tracking-widest text-right">Price</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="divide-y divide-gray-50">
//                                     {
//                                         myBookings.map((booking, index) => (
//                                             <tr key={index}>
//                                                 <td className="p-4 font-bold group-hover:text-[#ff3131]">{booking.car.model}</td>
//                                                 <td className="p-4 text-sm text-gray-500">
//                                                     {booking.startDate ? new Date(booking.startDate).toLocaleDateString('ka-GE') : '---'}
//                                                 </td>
//                                                 <td className={`p-4 text-[10px] font-bold uppercase ${booking.status === 'confirmed' ? 'text-green-500' : 'text-orange-500'}`}> {booking.status}</td>
//                                                 <td className="p-4 text-right font-black italic">${booking.totalPrice}</td>
//                                             </tr>
//                                         ))
//                                     }
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>

//                 </div>
//             </main>
//         </div>
//     );
// };

// export default Panel;




