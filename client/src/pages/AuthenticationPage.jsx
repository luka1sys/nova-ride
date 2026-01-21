import { motion, AnimatePresence } from 'framer-motion';
import { IconCrown, IconShieldCheck, IconArrowRight, IconAnalyze, IconCircleKey } from '@tabler/icons-react';
import { useAuth } from '../contexts/AuthContext';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { useTranslation } from 'react-i18next'; // 1. იმპორტი

const AuthenticationPage = () => {
    const { setActiveTab, activeTab } = useAuth();
    const { t } = useTranslation(); // 2. ინიციალიზაცია
    const accentColor = "rgb(254, 154, 0)";

    return (
        <div className={`min-h-screen bg-[#030303] text-white font-sans overflow-x-hidden flex flex-col`}
            style={{ '--accent': accentColor }}>

            <style>{`
                .selection-custom::selection {
                    background: ${accentColor};
                    color: black;
                }
            `}</style>

            <div className="selection-custom flex flex-col min-h-screen">
                {/* --- 1. ფონური შრეები --- */}
                <div className="fixed inset-0 z-0">
                    <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] blur-[120px] rounded-full"
                        style={{ backgroundColor: 'rgba(254, 154, 0, 0.05)' }} />
                    <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] blur-[150px] rounded-full"
                        style={{ backgroundColor: 'rgba(254, 154, 0, 0.08)' }} />
                    <div className="absolute inset-0 opacity-[0.1]"
                        style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
                </div>

                {/* --- 2. მთავარი კონტეინერი --- */}
                <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-between w-full max-w-[1700px] mx-auto px-6 md:px-16 pt-32 pb-16">

                    {/* მარცხენა სექცია */}
                    <div className="w-full lg:w-[55%] flex flex-col space-y-10 lg:pr-20">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4"
                        >
                            <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">
                                <IconCrown size={20} style={{ color: accentColor }} />
                            </div>
                            <span className="text-[10px] font-black tracking-[0.6em] uppercase text-gray-400">
                                {t("Secure Terminal")} v4.0
                            </span>
                        </motion.div>

                        <div className="space-y-6">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-4xl md:text-6xl tracking-tight leading-[1.1] uppercase"
                            >
                                {activeTab === 'login' ? (
                                    <div className="flex flex-col gap-2">
                                        <span className="text-gray-500 font-light tracking-[0.2em] text-xs md:text-sm">
                                            {t("System Authentication")}
                                        </span>
                                        <span className="font-extrabold flex items-center gap-4">
                                            {t("Access")}
                                            <span className="h-[1px] w-12 bg-white/20 hidden md:block"></span>
                                            <span style={{ color: accentColor }} className="italic font-light">
                                                {t("Portal.")}
                                            </span>
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        <span className="text-gray-500 font-light tracking-[0.2em] text-xs md:text-sm">
                                            {t("Join the Network")}
                                        </span>
                                        <span className="font-extrabold flex items-center gap-4">
                                            {t("Elite")}
                                            <span className="px-3 py-1 border border-white/10 rounded-full text-xl md:text-2xl font-light lowercase italic bg-white/5">
                                                {t("Member.")}
                                            </span>
                                        </span>
                                    </div>
                                )}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-gray-500 text-xs md:text-sm max-w-sm font-medium leading-relaxed tracking-wide border-l border-orange-500/30 pl-6"
                            >
                                {t("Experience the future of private transit. Your identity is protected by industry-leading encryption protocols.")}
                            </motion.p>
                        </div>

                        <div className="relative w-full pt-10">
                            <motion.img
                                key={activeTab}
                                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                src="/cta-car-img.png"
                                className="w-full h-auto drop-shadow-[0_40px_80px_rgba(254,154,0,0.15)] relative z-10"
                                alt="NovaRide Luxury"
                            />
                            <motion.div
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute top-0 left-0 w-1/3 h-full skew-x-12 z-20 pointer-events-none"
                                style={{ background: `linear-gradient(to right, transparent, rgba(254, 154, 0, 0.1), transparent)` }}
                            />
                        </div>
                    </div>

                    {/* მარჯვენა სექცია: Premium Form Card */}
                    <div className="w-full lg:w-[450px] relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-gradient-to-br from-[#0D0D0D] to-[#050505] border border-white/10 rounded-[40px] p-8 md:p-12 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative overflow-hidden"
                        >
                            <div className="absolute -top-10 -right-10 w-32 h-32 blur-[50px]"
                                style={{ backgroundColor: 'rgba(254, 154, 0, 0.1)' }} />

                            <div className="flex items-center justify-between mb-10">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: accentColor }}>
                                        {t("Verification")}
                                    </span>
                                    <h2 className="text-2xl font-bold uppercase  tracking-tighter">
                                        {t("Required")}
                                    </h2>
                                </div>
                                <IconCircleKey size={32} stroke={1.5} className="text-white/20" />
                            </div>

                            {/* --- განახლებული Tab Switcher --- */}
                            <div className="flex bg-white/5 p-1.5 rounded-2xl mb-12 border border-white/5">
                                {['login', 'signup'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        style={activeTab === tab ? { backgroundColor: accentColor } : {}}
                                        className={`flex-1 py-3.5 rounded-xl text-sm font-medium transition-all duration-500 ${activeTab === tab
                                                ? 'text-black shadow-lg shadow-orange-500/10'
                                                : 'text-gray-400 hover:text-white'
                                            }`}
                                    >
                                        {tab === 'login' ? t('Sign In') : t('Register')}
                                    </button>
                                ))}
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {activeTab === 'login' ? <Login /> : <Signup />}
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>

                        {/* Security Micro-Info */}
                        <div className="mt-8 flex justify-between items-center px-4">
                            <div className="flex items-center gap-2">
                                <IconShieldCheck size={16} className="text-green-500/70" />
                                <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">
                                    {t("AES-256 Bit Active")}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <IconAnalyze size={16} style={{ color: `rgba(254, 154, 0, 0.7)` }} />
                                <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">
                                    ID: 0x92-NR
                                </span>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="relative z-10 px-10 py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 mt-auto">
                    <div className="flex items-center gap-8">
                        <span className="text-[9px] font-bold text-gray-700 uppercase tracking-[0.4em] hover:text-gray-400 cursor-pointer transition-colors">
                            {t("Privacy Policy")}
                        </span>
                        <span className="text-[9px] font-bold text-gray-700 uppercase tracking-[0.4em] hover:text-gray-400 cursor-pointer transition-colors">
                            {t("System Status")}
                        </span>
                    </div>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/5 to-transparent mx-10 hidden md:block" />
                    <p className="text-[8px] font-black text-white/10 uppercase tracking-[0.6em]">
                        NR-INTEL © 2026 / {t("GLOBAL ACCESS")}
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default AuthenticationPage;