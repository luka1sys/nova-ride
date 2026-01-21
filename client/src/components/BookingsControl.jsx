import { useBooking } from "../contexts/BookingContext";
import { IconTrash, IconCalendarMonth, IconUser, IconCar, IconSearch, IconArrowRight } from "@tabler/icons-react";
import { useTranslation } from "react-i18next"; // 1. იმპორტი

const BookingsControl = () => {
    const { allBookings, deletedBooking } = useBooking();
    const { t } = useTranslation(); // 2. ჰუკი

    const handleDelete = async (id) => {
        try {
            await deletedBooking(id);
        } catch (error) {
            console.error("Failed to delete booking:", error);
        }
    };

    const getStatusStyle = (status) => {
        const s = status?.toLowerCase();
        switch (s) {
            case 'confirmed': return "bg-green-500/5 text-green-500 border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]";
            case 'pending': return "bg-orange-500/5 text-orange-500 border-orange-500/20 shadow-[0_0_15px_rgba(254,154,0,0.1)]";
            case 'complete':
            case 'completed': return "bg-white/5 text-white border-white/20 font-black";
            case 'cancelled': return "bg-red-500/5 text-red-500 border-red-500/20";
            default: return "bg-white/5 text-gray-500 border-white/10";
        }
    };

    const headerStyle = "p-6 text-[10px] uppercase font-black text-gray-500 tracking-widest border-b border-white/5";
    const cellStyle = "p-6 text-sm border-b border-white/5 text-white font-medium";

    return (
        <div className="w-full space-y-6">
            {/* --- TABLE CONTAINER --- */}
            <div className="bg-[#0A0A0A]/50 border border-white/5 rounded-[40px] overflow-hidden backdrop-blur-md relative">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.02]">
                                <th className={headerStyle}>{t("Vehicle Identity")}</th>
                                <th className={headerStyle}>{t("Customer Intel")}</th>
                                <th className={headerStyle}>{t("Operational Window")}</th>
                                <th className={headerStyle}>{t("Total Revenue")}</th>
                                <th className={headerStyle}>{t("Status")}</th>
                                <th className={headerStyle} style={{ textAlign: 'right' }}>{t("Actions")}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {allBookings?.map((booking) => (
                                <tr key={booking._id} className="hover:bg-white/[0.02] transition-all group">
                                    <td className={cellStyle}>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-orange-500/50 transition-colors text-orange-500">
                                                <IconCar size={20} stroke={2} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white group-hover:text-[#fe9a00] transition-colors uppercase tracking-tight">
                                                    {booking.car?.brand || 'N/A'}
                                                </p>
                                                <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mt-0.5 italic">
                                                    #{booking._id.slice(-6).toUpperCase()}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={cellStyle}>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-200 capitalize">{booking.user?.fullname || t('Guest User')}</span>
                                        </div>
                                    </td>
                                    <td className={cellStyle}>
                                        <div className="flex items-center gap-2 text-[10px] font-black">
                                            <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-400 font-mono">
                                                {new Date(booking.startDate).toLocaleDateString()}
                                            </span>
                                            <IconArrowRight size={12} className="text-[#fe9a00]" />
                                            <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-400 font-mono">
                                                {new Date(booking.endDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </td>
                                    <td className={cellStyle}>
                                        <div className="flex flex-col">
                                            <span className="text-lg font-black text-white italic tracking-tighter">
                                                ${booking.totalPrice?.toLocaleString()}
                                            </span>
                                        </div>
                                    </td>
                                    <td className={cellStyle}>
                                        <span className={`inline-flex items-center py-1.5 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${getStatusStyle(booking.status)}`}>
                                            {t(booking.status) || t('Unknown')}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right">
                                        <button
                                            onClick={() => handleDelete(booking._id)}
                                            className="p-3 bg-white/5 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-300 group/btn border border-white/5 active:scale-90"
                                            title={t("Delete")}
                                        >
                                            <IconTrash size={18} stroke={2} />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {(!allBookings || allBookings.length === 0) && (
                                <tr>
                                    <td colSpan="6" className="p-32 text-center">
                                        <div className="flex flex-col items-center gap-4 opacity-20">
                                            <IconSearch size={48} stroke={1} className="text-white" />
                                            <p className="text-white font-black uppercase tracking-[0.4em] italic text-sm">{t("No Active Bookings")}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BookingsControl;