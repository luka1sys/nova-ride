import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";

const ExecutivePartners = () => {
    const { t } = useTranslation();
    
    const partners = [
        { id: 1, logo: "/imgi_5_icon-partners-1.svg", name: "Elite Mobility" },
        { id: 2, logo: "/imgi_6_icon-partners-2.svg", name: "Global Jet" },
        { id: 3, logo: "/imgi_7_icon-partners-3.svg", name: "Sky Priority" },
        { id: 4, logo: "/imgi_8_icon-partners-4.svg", name: "Urban Luxe" },
    ];

    return (
        <section className="relative py-24 md:py-32 overflow-hidden bg-[#050505]">
            {/* --- Background Layer --- */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/imgi_57_hero-bg.jpg" 
                    className="w-full h-full object-cover opacity-20 grayscale" 
                    alt="Background" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* --- Left Side: Text Content --- */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                            <span className="text-[10px] uppercase tracking-[0.3em] text-amber-500 font-bold">
                                {t("Strategic Alliances")}
                            </span>
                        </div>

                        <h2 className="text-5xl md:text-7xl font-bold leading-[0.9] tracking-tighter uppercase italic">
                            {t("Our")} <span className="text-amber-500">{t("Executive")}</span> <br /> 
                            <span className="text-transparent stroke-white">{t("Network")}</span>
                        </h2>

                        <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-md">
                            {t("We collaborate with industry leaders to ensure your journey meets the highest global standards of luxury and safety.")}
                        </p>

                        <div className="flex items-center gap-8 pt-4">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-white">50+</p>
                                <p className="text-[10px] uppercase tracking-widest text-gray-500">{t("Global Cities")}</p>
                            </div>
                            <div className="w-px h-10 bg-white/10" />
                            <div className="text-center">
                                <p className="text-3xl font-bold text-white">100%</p>
                                <p className="text-[10px] uppercase tracking-widest text-gray-500">{t("Premium Fleet")}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* --- Right Side: Partner Cards --- */}
                    <div className="relative">
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full" />
                        
                        <div className="grid grid-cols-2 gap-4 md:gap-6">
                            {partners.map((partner, index) => (
                                <motion.div
                                    key={partner.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -10, borderColor: 'rgba(245, 158, 11, 0.4)' }}
                                    className="p-8 md:p-12 bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2rem] flex flex-col items-center justify-center gap-6 group transition-all duration-500"
                                >
                                    <img 
                                        src={partner.logo} 
                                        alt={partner.name}
                                        className="h-10 md:h-12 opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                                    />
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 group-hover:text-amber-500 transition-colors">
                                        {partner.name}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Team Image Overlay */}
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            className="hidden md:block absolute -bottom-12 -left-12 w-48 h-48 rounded-3xl overflow-hidden border-4 border-[#050505] shadow-2xl"
                        >
                            <img src="/imgi_16_team-1.jpg" className="w-full h-full object-cover" alt="Team" />
                        </motion.div>
                    </div>

                </div>
            </div>

            <style jsx>{`
                .stroke-white {
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
                }
            `}</style>
        </section>
    );
};

export default ExecutivePartners;