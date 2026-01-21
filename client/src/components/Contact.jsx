import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const Contact = () => {
    const { t } = useTranslation();
    const brandAccent = 'rgb(254, 154, 0)';
    const navigate = useNavigate();

    // რბილი ანიმაციის პარამეტრები
    const fadeInVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section className="bg-black py-20 px-4 md:px-10 relative overflow-hidden">
            {/* ფონის დეკორაციები - Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.1] pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(${brandAccent} 1px, transparent 1px), linear-gradient(90deg, ${brandAccent} 1px, transparent 1px)`,
                        backgroundSize: '50px 50px',
                        maskImage: 'radial-gradient(ellipse at center, white, transparent)',
                        WebkitMaskImage: 'radial-gradient(ellipse at center, white, transparent)'
                    }}
                ></div>
            </div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInVariant}
                className="max-w-7xl mx-auto relative rounded-[40px] border border-white/10 bg-[#080808] overflow-hidden"
            >
                {/* Ambient Glows */}
                <div className="absolute -top-24 -right-24 w-96 h-96 blur-[120px] rounded-full opacity-15 pointer-events-none" style={{ backgroundColor: brandAccent }}></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 blur-[120px] rounded-full opacity-10 pointer-events-none" style={{ backgroundColor: brandAccent }}></div>

                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-8 md:px-20 py-16 md:py-24 gap-16">

                    {/* ტექსტური ბლოკი */}
                    <div className="w-full lg:w-1/2 order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: brandAccent }}></span>
                                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: brandAccent }}></span>
                            </span>
                            <span className="text-[10px] text-white/60 uppercase tracking-[0.3em] font-bold">
                                {t("Booking Open 24/7")}
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight  mb-6">
                            <span className="block text-white/90">
                                {t("Take the")}
                            </span>
                            <span className="block" style={{ color: brandAccent }}>
                                {t("Wheel today")}
                            </span>
                        </h2>

                        <p className="text-gray-400 text-lg md:text-xl max-w-md leading-relaxed mb-12">
                            {t("Unlock premium luxury and performance. Your dream car is just one click away from the open road.")}
                        </p>

                        <div className="flex flex-wrap gap-6 items-center">
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-xl"
                                style={{ backgroundColor: brandAccent, color: '#000' }}
                                onClick={() => navigate('/contactus')}
                            >
                                {t("contact us")}
                            </motion.button>

                            <button
                                className="text-white font-bold uppercase tracking-widest text-xs border-b-2 border-white/10 pb-2 transition-colors hover:border-[rgb(254,154,0)]"
                                onClick={() => navigate('/cars')}
                            >
                                {t("View Full Fleet")}
                            </button>
                        </div>
                    </div>

                    {/* სურათის ბლოკი */}
                    <div className="w-full lg:w-1/2 relative group order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="relative z-10"
                        >
                            <img
                                src="/cta-car-img.png"
                                alt="Luxury Car"
                                className="w-full h-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)] relative z-20"
                            />

                            {/* Floating Stats */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-4 right-0 p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 z-30 hidden md:block shadow-2xl"
                            >
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{t("Top Speed")}</p>
                                <p className="text-xl font-black text-white italic" style={{ color: brandAccent }}>320 KM/H</p>
                            </motion.div>
                        </motion.div>
                    </div>

                </div>
            </motion.div>
        </section>
    );
}

export default Contact;