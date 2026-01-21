import ChangePassword from "./ChangePasswordForm";
import { useAuth } from "../contexts/AuthContext";
import { IconUser, IconMail, IconCrown, IconId, IconFingerprint } from "@tabler/icons-react";
import { motion } from "framer-motion";
import UpdateMyProfileForm from "./UpdateMyProfileForm";
import { useTranslation } from "react-i18next";

const AdminSystemConfig = () => {
    const { user } = useAuth();
    const { t } = useTranslation();

    return (
        <div className="max-w-6xl mx-auto p-6 md:p-12">
            {/* სათაურის სექცია */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold uppercase tracking-tighter text-white leading-none">
                    {t("System")} <span className="text-[#FE9A00]">{t("Config")}</span>
                </h1>
                <div className="flex items-center gap-3 mt-3">
                    <div className="h-[1px] w-12 bg-[#FE9A00]" />
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em]">
                        {t("Administrative Security Gateways")}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

                {/* მარცხენა მხარე: Admin Identity Card */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#0A0A0A] border border-white/5 rounded-[40px] p-10 shadow-2xl relative overflow-hidden"
                    >
                        {/* ფონური დეკორაცია (Watermark) */}
                        <div className="absolute top-10 right-10 text-white/[0.03] scale-[3.5] pointer-events-none">
                            
                        </div>

                        {/* Header with Icon */}
                        <div className="flex items-center gap-3 mb-10 relative z-10">
                            <div className="w-10 h-10 rounded-xl bg-[#FE9A00]/10 flex items-center justify-center border border-[#FE9A00]/20">
                                <IconId size={22} className="text-[#FE9A00]" />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-tighter text-white">
                                {t("Admin")} <span className="text-[#FE9A00]">{t("Identity")}</span>
                            </h3>
                        </div>

                        <div className="space-y-10 relative z-10">
                            {/* Full Name */}
                            <div className="group">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-3">
                                    {t("Full Name")}
                                </p>
                                <div className="flex items-center gap-4">
                                    <IconUser size={20} className="text-gray-600 group-hover:text-[#FE9A00] transition-colors" />
                                    <p className="text-xl font-bold text-white tracking-tight">
                                        {user?.fullname || t('Administrator')}
                                    </p>
                                </div>
                            </div>

                            {/* Email Address */}
                            <div className="group">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-3">
                                    {t("Communication Link")}
                                </p>
                                <div className="flex items-center gap-4">
                                    <IconMail size={20} className="text-gray-600 group-hover:text-[#FE9A00] transition-colors" />
                                    <p className="text-xl font-bold text-white/90 tracking-tight">
                                        {user?.email || 'admin@nexus.sys'}
                                    </p>
                                </div>
                            </div>

                            {/* Divider Line */}
                            <div className="w-full h-[1px] bg-gradient-to-r from-white/10 to-transparent" />

                            {/* Privileges/Role */}
                            <div className="group">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">
                                    {t("Access Privileges")}
                                </p>
                                <div className="inline-flex items-center gap-3 bg-[#FE9A00]/10 border border-[#FE9A00]/30 px-5 py-2 rounded-full shadow-lg shadow-orange-500/5">
                                    <IconCrown size={16} className="text-[#FE9A00]" />
                                    <span className="text-[11px] font-bold text-white uppercase tracking-[0.15em]">
                                        {user?.role ? t(user.role) : t('Root Admin')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Security Info Card */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/[0.02] border border-white/5 rounded-[24px] p-6"
                    >
                        <div className="flex gap-4">
                            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse mt-1.5" />
                            <p className="text-gray-500 text-[11px] leading-relaxed font-medium">
                                {t("System logs are active. Any modification to the identity or security credentials will be timestamped and linked to your current session IP.")}
                            </p>
                        </div>
                    </motion.div>
                </div>


                {/* მარჯვენა მხარე: ChangePassword კომპონენტი */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col h-full"
                >
                    <ChangePassword />
                </motion.div>
                
                <UpdateMyProfileForm />
            </div>
        </div>
    );
};

export default AdminSystemConfig;