import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // დამატებულია
import ChooseUs from "../components/ChooseU";
import ExecutivePartners from "../components/ExecutivePartners";
import Footer from "../components/Footer";
import WatchOurVideo from "../components/WatchOurVideo";
import About from "./About";
import Testimonials from '../components/Testimonials';

const AboutPage = () => {
    const { t } = useTranslation(); // დამატებულია
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);

    return (
        <main className="bg-[#050505] min-h-screen text-white overflow-hidden selection:bg-amber-500 selection:text-black font-sans">
            
            {/* --- IMMERSIVE HERO SECTION --- */}
            <div className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
                {/* Parallax Background */}
                <motion.div 
                    style={{ y: y1 }}
                    className="absolute inset-0 z-0 scale-110"
                >
                    <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: "url('imgi_17_team-2.jpg')" }}
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#050505]"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-[#050505]/60"></div>
                </motion.div>

                <div className="relative z-10 text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-amber-500 font-bold tracking-[0.5em] uppercase text-[10px] md:text-xs mb-4 block">
                            {t("Our Journey & Legacy")}
                        </span>
                        <h1 className="text-6xl md:text-[120px] font-black tracking-tighter uppercase leading-none italic mb-8">
                            {t("Beyond")} <br /> 
                            <span className="text-transparent stroke-white opacity-80">{t("The Drive")}</span>
                        </h1>
                        
                        <div className="flex items-center justify-center gap-6">
                            <div className="h-[1px] w-12 bg-amber-500/50"></div>
                            <nav className="flex items-center gap-4 text-white/80 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
                                <Link to="/" className="hover:text-amber-500 transition-all duration-300">{t("Home")}</Link>
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                <span className="text-amber-500">{t("Our Story")}</span>
                            </nav>
                            <div className="h-[1px] w-12 bg-amber-500/50"></div>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-20"></div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="relative z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <About />
                </motion.div>

                <section className="relative py-10 overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 blur-[120px] rounded-full z-0 pointer-events-none"></div>
                    <ExecutivePartners />
                </section>
                
                <div className="container mx-auto px-6 md:px-16">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>
                
                <WatchOurVideo />

                <div className="bg-[#080808] py-10 border-y border-white/5">
                    <ChooseUs />
                </div>
            </div>

            {/* --- CALL TO ACTION --- */}
            <section className="py-24 text-center px-6">
                <h3 className="text-3xl md:text-5xl font-bold mb-8 uppercase tracking-tighter">
                    {t("Ready to experience")} <br/> 
                    <span className="text-amber-500">{t("The Excellence?")}</span>
                </h3>
                <Link to="/carspage">
                    <button className="px-10 py-4 bg-amber-500 text-black font-black uppercase tracking-widest hover:bg-white transition-all duration-500 rounded-sm shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                        {t("Explore Our Fleet")}
                    </button>
                </Link>
            </section>
            
            <Testimonials/>
            <Footer />

            <style jsx>{`
                .stroke-white {
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.6);
                }
                @media (max-width: 768px) {
                    .stroke-white {
                        -webkit-text-stroke: 0.5px rgba(255, 255, 255, 0.6);
                    }
                }
            `}</style>
        </main>
    );
};

export default AboutPage;

