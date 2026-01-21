import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { IconUser, IconMail, IconShieldLock, IconX, IconLoader2, IconCircleCheck } from "@tabler/icons-react";
import { useTranslation } from "react-i18next"; // 1. იმპორტი

const UserUpdateForm = ({ userId, onClose }) => {
    const { updateUserrr, users } = useAuth();
    const { t } = useTranslation(); // 2. ინიციალიზაცია
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);

    const accentColor = "rgb(254, 154, 0)";

    useEffect(() => {
        const currentUser = users.find(u => u._id === userId);
        if (currentUser) {
            setFullname(currentUser.fullname || "");
            setEmail(currentUser.email || "");
            setRole(currentUser.role || "");
        }
    }, [userId, users]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateUserrr(userId, { fullname, email, role });
            if (onClose) onClose(); 
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#0A0A0A] p-8 md:p-10 rounded-[40px] relative overflow-hidden border border-white/5 shadow-2xl">
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 blur-[80px] rounded-full" />
            
            {/* Close Button */}
            <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2.5 bg-white/5 hover:bg-orange-500 hover:text-white rounded-xl transition-all text-gray-500 active:scale-90 z-10"
            >
                <IconX size={20} />
            </button>

            {/* Header */}
            <div className="mb-10 relative">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-1.5 h-6 bg-orange-500 rounded-full" />
                    <h2 className="text-2xl font-bold tracking-tight text-white leading-none">
                        {t("Update")} <span style={{ color: accentColor }}>{t("Operator")}</span>
                    </h2>
                </div>
                <p className="text-xs text-gray-500 font-medium tracking-wide ml-4">
                    {t("Security Level & Identity Clearance")}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative">
                {/* Fullname */}
                <div className="group">
                    <label className="text-xs font-semibold text-gray-500 ml-1 mb-2.5 block group-focus-within:text-orange-500 transition-colors">
                        {t("Full Name")}
                    </label>
                    <div className="relative">
                        <IconUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-orange-500 transition-colors" size={18} />
                        <input
                            type="text"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            className="w-full bg-white/[0.03] border border-white/10 p-4 pl-12 rounded-2xl text-sm text-white focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-700"
                            placeholder={t("Enter full name")}
                            required
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="group">
                    <label className="text-xs font-semibold text-gray-500 ml-1 mb-2.5 block group-focus-within:text-orange-500 transition-colors">
                        {t("Email Address")}
                    </label>
                    <div className="relative">
                        <IconMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-orange-500 transition-colors" size={18} />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/[0.03] border border-white/10 p-4 pl-12 rounded-2xl text-sm text-white focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-700"
                            placeholder="email@example.com"
                            required
                        />
                    </div>
                </div>

                {/* Role */}
                <div className="group">
                    <label className="text-xs font-semibold text-gray-500 ml-1 mb-2.5 block group-focus-within:text-orange-500 transition-colors">
                        {t("System Role")}
                    </label>
                    <div className="relative">
                        <IconShieldLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-orange-500 transition-colors" size={18} />
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full bg-white/[0.03] border border-white/10 p-4 pl-12 rounded-2xl text-sm text-white focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.05] transition-all appearance-none cursor-pointer"
                        >
                            <option value="user" className="bg-[#0A0A0A]">{t("Standard User")}</option>
                            <option value="admin" className="bg-[#0A0A0A]">{t("System Admin")}</option>
                        </select>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-6 py-4 rounded-2xl border border-white/10 text-xs font-bold text-gray-400 hover:bg-white/5 hover:text-white transition-all active:scale-95"
                    >
                        {t("Cancel")}
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`flex-1 px-6 py-4 rounded-2xl bg-white text-black text-xs font-bold hover:bg-orange-500 hover:text-white transition-all active:scale-95 shadow-xl flex items-center justify-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <>
                                <IconLoader2 className="animate-spin" size={18} />
                                {t("Updating...")}
                            </>
                        ) : (
                            <>
                                <IconCircleCheck size={18} />
                                {t("Save Changes")}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserUpdateForm;