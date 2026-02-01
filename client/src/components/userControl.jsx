import { useState } from "react";
import UserUpdateForm from "./UsersUpdateForm";
import { motion, AnimatePresence } from "framer-motion";
import { IconUserPlus, IconEdit, IconCheck, IconClock, IconSearch, IconTrash } from "@tabler/icons-react";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next"; // 1. იმპორტი

const UserControl = ({ users }) => {
    const [editingUser, setEditingUser] = useState(null);
    const { deleteUserrr } = useAuth();
    const { t } = useTranslation(); // 2. ჰუკი

    const handleDelete = async (userId) => {
        try {
     
            await deleteUserrr(userId);
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    return (
        <div className="w-full space-y-6">
            <div className="bg-[#0A0A0A]/50 border border-white/5 rounded-[40px] overflow-hidden backdrop-blur-md">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-white/5">
                                <th className="p-6 text-[10px] uppercase font-black text-gray-500 tracking-widest">{t("Operator Identity")}</th>
                                <th className="p-6 text-[10px] uppercase font-black text-gray-500 tracking-widest">{t("Network Details")}</th>
                                <th className="p-6 text-[10px] uppercase font-black text-gray-500 tracking-widest">{t("Access Status")}</th>
                                <th className="p-6 text-[10px] uppercase font-black text-gray-500 tracking-widest text-right">{t("System Actions")}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {users?.map((u) => (
                                <tr key={u._id} className="hover:bg-white/[0.02] transition-all group">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-orange-500/50 transition-colors">
                                                <span className="text-sm font-black text-white uppercase">{u.fullname?.charAt(0)}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white group-hover:text-orange-500 transition-colors capitalize tracking-tight">{u.fullname}</p>
                                                <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mt-0.5">{t("ID")}: {u._id?.slice(-8).toUpperCase()}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <p className="text-xs font-semibold text-gray-300">{u.email}</p>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <div className="w-1 h-1 rounded-full bg-orange-500 animate-pulse" />
                                            <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest">{t(u.role)}</p>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className={`inline-flex items-center gap-2 py-1.5 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all
                                            ${u.isVerified
                                                ? 'bg-green-500/5 text-green-500 border-green-500/20'
                                                : 'bg-orange-500/5 text-orange-500 border-orange-500/20'}`}>
                                            {u.isVerified ? <IconCheck size={12} stroke={4} /> : <IconClock size={12} stroke={4} />}
                                            {u.isVerified ? t('Verified') : t('Pending')}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => setEditingUser(u._id)}
                                                className="p-3 bg-white/5 hover:bg-white hover:text-black rounded-xl transition-all duration-300 border border-white/5"
                                                title={t("Edit User")}
                                            >
                                                <IconEdit size={18} stroke={2} />
                                            </button>

                                            <button
                                                onClick={() => handleDelete(u._id)}
                                                className="p-3 bg-white/5 text-gray-500 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-300 border border-white/5 hover:border-red-500"
                                                title={t("Delete User")}
                                            >
                                                <IconTrash size={18} stroke={2} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- MODAL SECTION --- */}
            <AnimatePresence>
                {editingUser && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                            onClick={() => setEditingUser(null)}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="relative w-full max-w-2xl z-10"
                        >
                            <div className="bg-[#050505] border border-white/10 rounded-[48px] shadow-2xl overflow-hidden relative">
                                <div className="p-2">
                                    <UserUpdateForm
                                        userId={editingUser}
                                        onClose={() => setEditingUser(null)}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserControl;