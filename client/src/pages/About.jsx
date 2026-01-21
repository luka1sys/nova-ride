import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; // დავამატეთ ჰუკი

const About = () => {
    const { t } = useTranslation(); // ინიციალიზაცია
    const containerRef = useRef(null);
    const accentColor = "rgb(254, 154, 0)";

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const scrolled = window.scrollY;
                const elements = containerRef.current.querySelectorAll('.parallax-layer');
                elements.forEach((el, index) => {
                    const speed = 0.1 + (index * 0.05);
                    el.style.transform = `translateY(${scrolled * speed}px)`;
                });
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section ref={containerRef} className='relative w-full min-h-screen flex flex-col lg:flex-row items-center justify-center py-32 px-6 md:px-16 gap-20 overflow-hidden bg-[#050505]'>

            {/* --- Background Layer --- */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/imgi_57_hero-bg.jpg"
                    className="w-full h-full object-cover opacity-20 grayscale"
                    alt="Background Texture"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[rgb(254,154,0)]/10 via-transparent to-transparent opacity-40"></div>
                <div className="parallax-layer absolute top-1/4 -left-40 w-[600px] h-[600px] bg-[rgb(254,154,0)]/5 blur-[120px] rounded-full z-0"></div>
            </div>

            {/* --- Image Section --- */}
            <div className='relative w-full lg:w-1/2 flex justify-center items-center z-20'>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative group"
                >
                    <div className="relative z-10 w-[320px] h-[480px] md:w-[420px] md:h-[580px] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl transition-all duration-700 group-hover:shadow-[rgb(254,154,0)]/20">
                        <img
                            src="https://demo.awaikenthemes.com/novaride/wp-content/uploads/2024/08/about-img-1.jpg"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            alt="Luxury Car"
                        />
                    </div>

                    <div
                        style={{ backgroundColor: accentColor }}
                        className="absolute -top-6 -right-6 md:-right-10 z-30 p-7 md:p-9 rounded-[30px] shadow-xl shadow-[rgb(254,154,0)]/30 border border-white/20"
                    >
                        <div className="text-center">
                            <p className="text-black font-black text-4xl italic leading-none">15+</p>
                            <p className="text-black/80 text-[9px] font-bold tracking-widest uppercase mt-2">{t("Years Excellence")}</p>
                        </div>
                    </div>

                    <div className="absolute -bottom-12 -left-12 z-30 w-[180px] h-[240px] md:w-[220px] md:h-[300px] rounded-[30px] overflow-hidden border-4 border-[#050505] shadow-2xl">
                        <img
                            src="https://demo.awaikenthemes.com/novaride/wp-content/uploads/2024/08/about-img-2.jpg"
                            className="w-full h-full object-cover"
                            alt="Interior"
                        />
                    </div>
                </motion.div>
            </div>

            {/* --- Content Section --- */}
            <div className='w-full lg:w-1/2 flex flex-col items-start z-30'>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-3 py-2 px-5 bg-white/5 border border-[rgb(254,154,0)]/30 rounded-full mb-8">
                        <span style={{ backgroundColor: accentColor }} className="w-2 h-2 rounded-full animate-pulse"></span>
                        <span style={{ color: accentColor }} className="text-[10px] font-bold tracking-[0.4em] uppercase">
                            {t("Premium Experience")}
                        </span>
                    </div>

                    <h2 className='text-5xl md:text-7xl font-bold leading-[1.1] text-white tracking-tight mb-8 uppercase'>
                        {t("Drive the")} <br />
                        <span style={{ color: accentColor }} className='italic font-black'>
                            {t("Future Today")}
                        </span>
                    </h2>

                    <p className='text-gray-400 text-lg font-light max-w-xl mb-12 leading-relaxed'>
                        {t("We provide more than just a car. We deliver a statement of style and performance, meticulously maintained for those who value absolute perfection.")}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12">
                        {[
                            { title: t("VIP Fleet"), desc: t("Access our exclusive collection of 2024 models.") },
                            { title: t("Smart Booking"), desc: t("Seamless digital experience from start to finish.") }
                        ].map((feature, index) => (
                            <div key={index} className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/5 hover:border-[rgb(254,154,0)]/40 transition-all duration-500">
                                <h3 style={{ color: accentColor }} className="font-bold text-xs uppercase tracking-widest mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-500 text-sm font-light">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    <Link to="/contactus" className="group">
                        <button
                            style={{ backgroundColor: accentColor }}
                            className="px-14 py-5 text-black font-medium text-[15px] rounded-sm transition-all duration-500 hover:shadow-[0_0_40px_rgba(254,154,0,0.4)] hover:-translate-y-1 active:scale-95"
                        >
                            {t("Contact Us")}
                        </button>
                    </Link>

                    <div className="mt-16 pt-8 border-t border-white/5 w-full flex gap-10">
                        <div>
                            <p className="text-white text-3xl font-light">99%</p>
                            <p className="text-gray-600 text-[8px] font-bold tracking-widest uppercase">{t("Happy Clients")}</p>
                        </div>
                        <div>
                            <p className="text-white text-3xl font-light">24/7</p>
                            <p className="text-gray-600 text-[8px] font-bold tracking-widest uppercase">{t("Support")}</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default About;