import React from 'react';
import Footer from '../components/Footer';
import { useTranslation } from "react-i18next";

const ContactUs = () => {
    const { t } = useTranslation();

    return (
        <main className="bg-[#050505] text-[#e0e0e0] min-h-screen font-sans selection:bg-[#FE9A00] selection:text-black">
            
            {/* --- Atmospheric Background --- */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FE9A00]/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[40%] bg-[#FE9A00]/5 blur-[120px] rounded-full"></div>
            </div>

            {/* --- New Premium Hero Section --- */}
            <section className="relative pt-40 pb-24 px-6 overflow-hidden">
                <div className="max-w-6xl mx-auto relative">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-[#FE9A00]"></div>
                    
                    <div className="flex flex-col items-center">
                        <div className="overflow-hidden mb-4">
                            <span className="text-[#FE9A00] text-[10px] md:text-xs font-black uppercase tracking-[0.8em] block animate-reveal-up">
                                Connect With Us
                            </span>
                        </div>

                        <h1 className="relative text-center">
                            <span className="block text-5xl md:text-9xl font-extralight tracking-tighter text-white leading-none opacity-90">
                                Let's start a
                            </span>
                            <span className="relative block text-6xl md:text-[10rem] font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#FE9A00] via-[#ffbd58] to-[#FE9A00] leading-tight md:-mt-4">
                                New Journey
                                <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FE9A00]/50 to-transparent"></div>
                            </span>
                        </h1>
                        
                        <div className="mt-12 flex items-center gap-4 group cursor-default">
                            <div className="w-12 h-px bg-white/20 group-hover:w-20 group-hover:bg-[#FE9A00] transition-all duration-500"></div>
                            <p className="text-gray-500 text-sm uppercase tracking-widest font-light">{t("Scroll to explore")}</p>
                            <div className="w-12 h-px bg-white/20 group-hover:w-20 group-hover:bg-[#FE9A00] transition-all duration-500"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Interactive Contact Grid --- */}
            <section className="max-w-[1300px] mx-auto px-6 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Side: Photo & Details */}
                    <div className="lg:col-span-5 relative group">
                        <div className="sticky top-32 space-y-8">
                            <div className="relative h-[400px] rounded-[40px] overflow-hidden border border-white/10">
                                <img 
                                    src="/contact-us-icons-virtual-screen.jpg" 
                                    alt="Contact Us" 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                                <ContactDetail label={t("Inquiries")} value="info@novaride.ge" link="mailto:info@novaride.ge" />
                                <ContactDetail label={t("Support")} value="+995 555 123 456" link="tel:+995555123456" />
                                <div className="md:col-span-2">
                                    <ContactDetail label={t("Studio")} value={t("123 Rustaveli Ave, Tbilisi, Georgia")} link="#" />
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/10 flex gap-8 px-4">
                                {['instagram', 'facebook', 'whatsapp'].map((soc) => (
                                    <a key={soc} href="#" className="text-gray-500 hover:text-[#FE9A00] transition-colors duration-300 capitalize text-sm font-medium tracking-widest">
                                        {soc}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="lg:col-span-7 bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[40px] p-8 md:p-16 h-full">
                        <div className="mb-12">
                            <h3 className="text-2xl font-light text-white mb-2">{t("Send us a message")}</h3>
                            <p className="text-gray-400">{t("We'll get back to you within 24 hours.")}</p>
                        </div>
                        
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                            <FloatingInput label={t("Your Name")} type="text" placeholder={t("John Doe")} />
                            <FloatingInput label={t("Email Address")} type="email" placeholder="john@example.com" />
                            <div className="md:col-span-2">
                                <FloatingInput label={t("Subject")} type="text" placeholder={t("How can we help?")} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-[10px] uppercase tracking-[0.3em] text-[#FE9A00] font-bold mb-4 block">{t("Message")}</label>
                                <textarea 
                                    rows="5" 
                                    className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#FE9A00] transition-all text-white text-lg font-light resize-none placeholder:text-white/30"
                                    placeholder={t("Tell us about your project...")}
                                />
                            </div>
                            
                            <div className="md:col-span-2 pt-6">
                                <button className="w-full md:w-auto group flex items-center justify-center gap-6 bg-white/5 hover:bg-[#FE9A00] border border-white/10 hover:border-[#FE9A00] px-10 py-5 rounded-full transition-all duration-500">
                                    <span className="text-sm font-bold uppercase tracking-[0.3em] text-white group-hover:text-black">{t("Send Message")}</span>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-[#FE9A00] group-hover:text-black group-hover:translate-x-2 transition-all">
                                        <path d="M1 9H17M17 9L9 1M17 9L9 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* --- Map Section --- */}
            <div className="w-full h-[500px] px-6 pb-24">
                <div className="w-full h-full rounded-[40px] overflow-hidden border border-white/5 grayscale invert opacity-30 hover:opacity-60 transition-opacity duration-700">
                    <iframe 
                        title="map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.826224167522!2d44.79633647656687!3d41.70271787123953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cf611682787%3A0x6a05988599426f8d!2sRustaveli%20Ave%2C%20T'bilisi!5e0!3m2!1sen!2sge!4v1710000000000!5m2!1sen!2sge" 
                        className="w-full h-full border-0"
                        allowFullScreen="" 
                        loading="lazy"
                    ></iframe>
                </div>
            </div>

            <Footer />
        </main>
    );
};

const ContactDetail = ({ label, value, link }) => (
    <div className="group cursor-pointer">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#FE9A00] font-bold mb-3">{label}</p>
        <a href={link} className="text-lg md:text-xl text-white font-light group-hover:translate-x-2 block transition-transform duration-300">
            {value}
        </a>
    </div>
);

const FloatingInput = ({ label, type, placeholder }) => (
    <div className="relative group">
        <label className="text-[10px] uppercase tracking-[0.3em] text-[#FE9A00] font-bold mb-2 block">
            {label}
        </label>
        <input 
            type={type} 
            placeholder={placeholder}
            className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#FE9A00] transition-all text-white text-lg font-light placeholder:text-white/30"
        />
    </div>
);

export default ContactUs;