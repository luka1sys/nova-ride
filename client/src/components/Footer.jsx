import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();
    // თქვენი აქცენტის ფერი: ნარინჯისფერი
    const brandAccent = 'rgb(254, 154, 0)';

    return (
        <footer className="bg-[#050505] text-white w-full pt-24 pb-12 px-6 md:px-12 lg:px-24 border-t border-white/5 relative overflow-hidden">
            
            {/* ფონის დეკორატიული ელემენტი - დიდი ტექსტი ფონზე */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 select-none pointer-events-none">
                <h2 className="text-[15vw] font-black text-white/[0.02] leading-none uppercase tracking-tighter">
                    Novaride
                </h2>
            </div>

            {/* გვერდითა Glow ნათება */}
            <div 
                className="absolute top-0 right-0 w-[400px] h-[400px] opacity-[0.03] blur-[120px] rounded-full pointer-events-none"
                style={{ backgroundColor: brandAccent }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
                    
                    {/* ლოგო და ბრენდინგი */}
                    <div className="lg:col-span-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <h1 className="text-4xl font-black tracking-tighter mb-8 italic uppercase">
                                NOVA<span style={{ color: brandAccent }}>RIDE</span>
                            </h1>
                            <p className="text-gray-500 text-lg leading-relaxed max-w-sm font-light italic">
                                {t("Redefining the boundaries of premium mobility. Your journey, our masterpiece.")}
                            </p>
                        </motion.div>
                    </div>

                    {/* ლინკების ბლოკები */}
                    <div className="lg:col-span-5 grid grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-8">{t("Navigation")}</h3>
                            <ul className="space-y-4">
                                {['Home', 'Fleet', 'Experience', 'Concierge'].map((link) => (
                                    <li key={link}>
                                        <a href={`#${link}`} className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center group">
                                            <span className="w-0 group-hover:w-4 h-[1px] bg-[rgb(254,154,0)] mr-0 group-hover:mr-3 transition-all duration-300"></span>
                                            {t(link)}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-8">{t("Legal Space")}</h3>
                            <ul className="space-y-4">
                                {['Terms of Use', 'Privacy Policy', 'Cookie Policy', 'Security'].map((link) => (
                                    <li key={link}>
                                        <a href={`#${link}`} className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center group">
                                            <span className="w-0 group-hover:w-4 h-[1px] bg-[rgb(254,154,0)] mr-0 group-hover:mr-3 transition-all duration-300"></span>
                                            {t(link)}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter ბლოკი */}
                    <div className="lg:col-span-3">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-8">{t("Newsletter")}</h3>
                        <p className="text-gray-500 text-sm mb-6 leading-relaxed">{t("Join our elite circle for exclusive offers.")}</p>
                        <form className="relative" onSubmit={(e) => e.preventDefault()}>
                            <input 
                                type="email" 
                                placeholder={t("Enter your email")}
                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-5 outline-none text-sm focus:border-[rgb(254,154,0)]/50 transition-all placeholder:text-gray-700"
                            />
                            <button 
                                type="submit"
                                className="absolute right-2 top-2 bottom-2 px-4 rounded-xl text-black text-[10px] font-black uppercase tracking-widest transition-transform hover:scale-95 active:scale-90"
                                style={{ backgroundColor: brandAccent }}
                            >
                                {t("Join")}
                            </button>
                        </form>
                    </div>
                </div>

                {/* ქვედა ზოლი */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <p className="text-gray-600 text-[10px] font-bold tracking-[0.2em] uppercase">
                            © 2026 NOVARIDE AUTOMOTIVE.
                        </p>
                        <span className="hidden md:block w-1 h-1 bg-white/10 rounded-full"></span>
                        <p className="text-gray-600 text-[10px] font-bold tracking-[0.2em] uppercase">
                            {t("Handcrafted with precision.")}
                        </p>
                    </div>
                    
                    <div className="flex gap-8">
                        <span className="text-gray-700 text-[9px] font-black uppercase tracking-widest cursor-help hover:text-gray-400 transition-colors">EST. 2024</span>
                        <span className="text-gray-700 text-[9px] font-black uppercase tracking-widest cursor-help hover:text-gray-400 transition-colors">{t("Global Service")}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;