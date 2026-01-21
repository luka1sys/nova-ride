import { useState } from "react";
import { useCars } from "../contexts/CarsContext";
import AddCarForm from "./AddCarForm";
import UpdateCarForm from "./UpdateCarForm";
import { motion, AnimatePresence } from "framer-motion";
import { IconPlus, IconEdit, IconTrash, IconSteeringWheel, IconEngine, IconGasStation } from "@tabler/icons-react";
import { useTranslation } from "react-i18next"; // 1. იმპორტი

const CarControl = () => {
    const { cars, loading, deletedCar } = useCars();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingCar, setEditingCar] = useState(null);
    const { t } = useTranslation(); // 2. ინიციალიზაცია

    const accentColor = "rgb(254, 154, 0)";

    return (
        <div className="w-full space-y-6">
            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/[0.02] p-6 rounded-[32px] border border-white/5">
                <div>
                    <h3 className="font-bold text-xl text-white tracking-tight">
                        {t("Fleet")} <span style={{ color: accentColor }}>{t("Inventory")}</span>
                    </h3>
                    <p className="text-xs text-gray-500 font-medium mt-1">
                        {t("Total Vehicles")}: {cars?.length || 0}
                    </p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-2xl text-xs font-bold hover:bg-orange-500 hover:text-white transition-all transform active:scale-95 shadow-lg shadow-white/5"
                >
                    <IconPlus size={18} stroke={3} />
                    {t("Add New Vehicle")}
                </button>
            </div>

            {/* --- TABLE CONTAINER --- */}
            <div className="bg-[#0A0A0A]/50 border border-white/5 rounded-[40px] overflow-hidden backdrop-blur-md">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-white/5">
                                <th className="p-6 text-xs font-semibold text-gray-500 tracking-wider">{t("Vehicle Details")}</th>
                                <th className="p-6 text-xs font-semibold text-gray-500 tracking-wider">{t("Specifications")}</th>
                                <th className="p-6 text-xs font-semibold text-gray-500 tracking-wider">{t("Daily Rate")}</th>
                                <th className="p-6 text-xs font-semibold text-gray-500 tracking-wider text-right">{t("Actions")}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="p-24 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                                            <p className="text-sm font-medium text-gray-500">{t("Syncing Fleet Data...")}</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : cars?.map((car) => (
                                <tr key={car._id} className="hover:bg-white/[0.02] transition-all group">
                                    <td className="p-6">
                                        <div className="flex items-center gap-5">
                                            <div className="w-24 h-16 bg-white/5 rounded-2xl overflow-hidden border border-white/10 group-hover:border-orange-500/50 transition-colors">
                                                <img
                                                    src={car.images?.[0] || 'https://via.placeholder.com/300x200'}
                                                    alt={car.model}
                                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-base font-bold text-white group-hover:text-orange-500 transition-colors">
                                                    {car.brand}
                                                </p>
                                                <p className="text-sm text-gray-500 font-medium">{car.model}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                                                <IconEngine size={14} className="text-orange-500" />
                                                {car.engine}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                                                <IconSteeringWheel size={14} className="text-orange-500" />
                                                {car.transmission}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-xl font-bold text-white">${car.pricePerDay}</span>
                                            <span className="text-[10px] text-gray-600 font-bold uppercase tracking-wider">/ {t("Day")}</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => setEditingCar(car)}
                                                className="p-3 bg-white/5 hover:bg-white hover:text-black rounded-xl transition-all border border-white/5 active:scale-90"
                                                title={t("Edit")}
                                            >
                                                <IconEdit size={18} />
                                            </button>
                                            <button
                                                onClick={() => deletedCar(car._id)}
                                                className="p-3 bg-white/5 hover:bg-red-500 hover:text-white rounded-xl transition-all border border-white/5 active:scale-90"
                                                title={t("Delete")}
                                            >
                                                <IconTrash size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- MODALS (ADD & UPDATE) --- */}
            <AnimatePresence>
                {(isAddModalOpen || editingCar) && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                            onClick={() => {
                                setIsAddModalOpen(false);
                                setEditingCar(null);
                            }}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar rounded-[40px] border border-white/10 shadow-2xl"
                        >
                            {isAddModalOpen ? (
                                <AddCarForm onClose={() => setIsAddModalOpen(false)} />
                            ) : (
                                <UpdateCarForm
                                    car={editingCar}
                                    onClose={() => setEditingCar(null)}
                                />
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CarControl;