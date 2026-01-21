import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const Service = () => {
    const { t } = useTranslation();

    const services = [
        {
            id: '01',
            title: t("Car Rental With Driver"),
            img: "/serviceimg1.jpg",
            desc: t("Travel with ultimate peace of mind. Our professional chauffeurs are expert navigators, dedicated to providing a secure, punctual, and highly comfortable journey while you relax or focus on your business.")
        },
        {
            id: '02',
            title: t("Business Car Rental"),
            img: "/serviceimg2.jpg",
            desc: t("Elevate your corporate identity with our exclusive business fleet. We provide sophisticated vehicle solutions tailored for high-level meetings, corporate events, and professional excellence.")
        },
        {
            id: '03',
            title: t("Airport Transfer"),
            img: "/serviceimg3.jpg",
            desc: t("Experience seamless transitions from the runway to your destination. We provide 24/7 flight monitoring and meet-and-greet services to ensure you never have to wait after a long flight.")
        },
        {
            id: '04',
            title: t("Chauffeur Services"),
            img: "/serviceimg4.jpg",
            desc: t("Experience seamless transitions from the runway to your destination. We provide 24/7 flight monitoring and meet-and-greet services to ensure you never have to wait after a long flight.")
        }
    ];

    const benefits = [
        t("24/7 Roadside Assistance"),
        t("Free Cancellation & Return"),
        t("Rent Now, Pay on Arrival")
    ];

    const faqs = [
        { q: t("What are the driver's license requirements?"), a: t("To rent a vehicle, you must present a valid national or international driving license held for at least two years, along with a valid ID or passport.") },
        { q: t("Is insurance included in the rental?"), a: t("Yes, all our rentals include comprehensive insurance coverage. We also offer additional premium protection packages for extra security and peace of mind.") },
        { q: t("What payment methods do you accept?"), a: t("We accept all major credit/debit cards, bank transfers, and secure cash payments upon vehicle arrival or pick-up.") },
        { q: t("What is your cancellation policy?"), a: t("Enjoy maximum flexibility with free cancellation and modifications up to 24 hours before your scheduled reservation time.") }
    ];

    return (
        <section className="bg-[#050505] text-white selection:bg-amber-500 selection:text-black font-sans">

            {/* --- HERO SECTION --- */}
            <div className="relative min-h-[90vh] flex items-center px-6 md:px-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full z-0">
                    <motion.img
                        initial={{ scale: 1.05 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
                        src="/serviceimg5.jpg"
                        className="w-full h-full object-cover opacity-40"
                        alt="Luxury Hero"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]"></div>
                </div>

                <div className="relative z-10 w-full max-w-6xl">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-amber-500 font-medium tracking-[0.3em] uppercase text-xs mb-6 block"
                    >
                        {t("Precision • Comfort • Reliability")}
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-[90px] font-bold leading-[1.1] tracking-tight mb-12"
                    >
                        {t("Redefining the")} <br />
                        <span className="text-transparent stroke-white font-light italic">{t("Standard of Travel")}</span>
                    </motion.h1>

                    <div className="flex flex-wrap gap-6 md:gap-16 border-t border-white/10 pt-10">
                        {benefits.map((text, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 + (i * 0.1) }}
                                className="flex items-center gap-4"
                            >
                                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                                <span className="text-xs md:text-sm font-medium uppercase tracking-widest text-gray-300">{text}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- SERVICES SECTION --- */}
            <div className="py-24">
                <div className="px-6 md:px-16 mb-24 text-center md:text-left">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase">
                        {t("Our Exclusive")} <span className="text-amber-500">{t("Services")}</span>
                    </h2>
                    <p className="text-gray-500 mt-6 max-w-2xl text-lg">
                        {t("We provide high-end transportation solutions designed for those who value time, safety, and uncompromising quality.")}
                    </p>
                </div>

                {services.map((item, index) => (
                    <div
                        key={item.id}
                        className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-32 mb-40 px-6 md:px-16`}
                    >
                        <motion.div
                            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="w-full md:w-1/2"
                        >
                            <div className="relative group overflow-hidden rounded-2xl aspect-[16/10] shadow-2xl">
                                <img
                                    src={item.img}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    alt={item.title}
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="w-full md:w-1/2 space-y-6"
                        >
                            <span className="text-amber-500 font-bold text-sm tracking-widest uppercase">{t("Service")} {item.id}</span>
                            <h3 className="text-3xl md:text-5xl font-bold leading-tight uppercase">
                                {item.title}
                            </h3>
                            <p className="text-gray-400 text-lg leading-relaxed font-light">
                                {item.desc}
                            </p>

                            <div className="pt-4 space-y-3">
                                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-amber-500/90">
                                    <span className="w-8 h-[1px] bg-amber-500" /> {t("Professional Grade Fleet")}
                                </div>
                                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-amber-500/90">
                                    <span className="w-8 h-[1px] bg-amber-500" /> {t("Multilingual Support")}
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ gap: '24px' }}
                                className="mt-10 flex items-center gap-4 text-white font-bold uppercase tracking-widest text-sm group"
                            >
                                {t("Book This Service")}
                                <span className="flex items-center justify-center w-12 h-12 bg-amber-500 text-black rounded-full transition-transform group-hover:rotate-[-45deg]">
                                    →
                                </span>
                            </motion.button>
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* --- FAQ SECTION --- */}
            <div className="py-32 bg-[#080808] border-t border-white/5 px-6 md:px-16">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24">
                    <div>
                        <span className="text-amber-500 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">{t("Help Center")}</span>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-12 uppercase">{t("Frequently Asked")} <br /> {t("Questions")}</h2>

                        <div className="space-y-4">
                            {faqs.map((f, i) => (
                                <details key={i} className="group border-b border-white/10 pb-4">
                                    <summary className="py-6 cursor-pointer list-none flex justify-between items-center text-lg font-semibold uppercase tracking-wide group-hover:text-amber-500 transition-colors">
                                        {f.q}
                                        <span className="text-2xl transition-transform group-open:rotate-45 text-amber-500">+</span>
                                    </summary>
                                    <p className="text-gray-400 leading-relaxed pb-6 font-light">
                                        {f.a}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>

                    <div className="lg:pt-20">
                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            className="bg-white/5 p-10 md:p-14 rounded-3xl border border-white/10 relative overflow-hidden sticky top-20"
                        >
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500 opacity-10 blur-[100px]" />
                            <h3 className="text-3xl font-bold mb-6 uppercase tracking-tight">{t("Need a custom quote?")}</h3>
                            <p className="text-gray-400 text-lg mb-12 font-light">
                                {t("For long-term rentals, special events, or complex itineraries, our concierge team is available 24/7 to assist you.")}
                            </p>
                            <button className="w-full py-5 bg-amber-500 text-black font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-all duration-300">
                                <Link to="/contactus">{t("Contact Our Concierge")}</Link>
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .stroke-white {
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
                }
                summary::-webkit-details-marker {
                    display: none;
                }
            `}</style>
            <Footer />
        </section>
    );
};

export default Service;