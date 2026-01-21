import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; // იმპორტი

const Services = () => {
    const { t } = useTranslation(); // ინიციალიზაცია
    const accentColor = "rgb(254, 154, 0)";

    const servicesData = [
        {
            id: "01",
            title: t("Executive Chauffeur"),
            img: "/A-driver-opening-the-car-door.png",
            desc: t("Travel in absolute comfort while our professional chauffeurs manage every detail.")
        },
        {
            id: "02",
            title: t("Corporate Fleet"),
            img: "/article-hero-remarketing-essentials.jpg",
            desc: t("Impress partners with a premium fleet tailored for corporate excellence and prestige.")
        },
        {
            id: "03",
            title: t("Airport Transfer"),
            img: "/zanzibar-transfers.jpg",
            desc: t("Punctual, discreet, and reliable transfers ensuring a seamless transition.")
        },
        {
            id: "04",
            title: t("Event Mobility"),
            img: "/7-bac4690a.jpg",
            desc: t("Dedicated luxury transport solutions for high-profile events and private gala evenings.")
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.8, ease: "easeOut" } 
        }
    };

    return (
        <section className='relative w-full bg-[#050505] py-32 px-6 overflow-hidden'>
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[rgb(254,154,0)]/10 blur-[150px] rounded-full pointer-events-none"></div>

            <div className='max-w-[1400px] mx-auto relative z-10'>

                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className='flex flex-col items-center mb-28'
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div style={{ backgroundColor: accentColor }} className="w-12 h-[1px]"></div>
                        <span style={{ color: accentColor }} className="text-[12px] font-bold tracking-[0.4em] uppercase text-center">
                            Our Luxury Fleet
                        </span>
                        <div style={{ backgroundColor: accentColor }} className="w-12 h-[1px]"></div>
                    </div>
                    
                    <h2 className='text-5xl md:text-8xl font-bold text-white text-center leading-[0.9] tracking-tighter uppercase'>
                        ELITE <span className="stroke-text">TRANSPORT</span> <br />
                        <span style={{ color: accentColor }} className='italic font-light'>Solutions</span>
                    </h2>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
                >
                    {servicesData.map((service, index) => (
                        <motion.div 
                            key={index}
                            variants={cardVariants}
                            className='group relative h-[550px] bg-[#111] border border-white/10 rounded-3xl overflow-hidden transition-all duration-700 hover:border-[rgb(254,154,0)]/50 shadow-2xl'
                        >
                            <div className="absolute inset-0 z-0">
                                <img 
                                    src={service.img} 
                                    alt={service.title}
                                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
                            </div>

                            <div className="relative z-10 h-full p-10 flex flex-col justify-end">
                                <span className="text-white/40 text-4xl font-black mb-2 block group-hover:text-[rgb(254,154,0)] transition-colors">
                                    {service.id}
                                </span>
                                
                                <h3 className='text-white font-bold text-2xl mb-4'>
                                    {service.title}
                                </h3>
                                
                                <p className='text-gray-200 text-sm leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500'>
                                    {service.desc}
                                </p>

                                <div className="flex items-center gap-4">
                                    <div style={{ backgroundColor: accentColor }} className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                                        </svg>
                                    </div>
                                    <span className="text-white text-[10px] uppercase tracking-[0.2em] font-bold">{t("Details")}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mt-24 flex flex-col items-center"
                >
                    <Link to="/services" className="group relative overflow-hidden px-14 py-5 rounded-full border border-[rgb(254,154,0)] transition-all duration-500">
                        <div className="absolute inset-0 bg-[rgb(254,154,0)] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500"></div>
                        <span className="relative z-10 text-[rgb(254,154,0)] group-hover:text-black font-bold tracking-[0.3em] text-[11px] uppercase transition-colors duration-500">
                            {t("View All Services")}
                        </span>
                    </Link>
                </motion.div>
            </div>

            <style jsx>{`
                .stroke-text {
                    color: transparent;
                    -webkit-text-stroke: 1px rgba(255,255,255,0.4);
                }
            `}</style>
        </section>
    );
}

export default Services;