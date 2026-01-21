import React from 'react';
import { useTranslation } from "react-i18next"; // იმპორტი

const ChooseUs = () => {
    const { t } = useTranslation(); // ინიციალიზაცია
    const accentColor = "rgb(254, 154, 0)";

    const features = [
        {
            title: t("Extensive Fleet Options"),
            desc: t("Explore our diverse selection of high-end vehicles, maintained to the highest standards of luxury and performance."),
            icon: "M12 4.5v15m7.5-7.5h-15",
        },
        {
            title: t("Exceptional Service"),
            desc: t("Experience 24/7 premium concierge support tailored to your unique travel requirements."),
            icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
        },
        {
            title: t("Convenient Locations"),
            desc: t("Multiple pickup and drop-off points at major hubs to ensure your journey starts seamlessly."),
            icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
        },
        {
            title: t("Reliability And Safety"),
            desc: t("Rigorous safety inspections and full insurance coverage for your absolute peace of mind."),
            icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
        }
    ];

    return (
        <section className='w-full bg-[#050505] py-32 px-6 relative overflow-hidden'>
            {/* დეკორატიული ელემენტები ფონისთვის */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[rgb(254,154,0)]/5 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[rgb(254,154,0)]/5 blur-[120px] rounded-full"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* სათაურის ბლოკი */}
                <div className='flex flex-col items-center mb-24'>
                    <div className="flex items-center gap-3 mb-6">
                        <span style={{ backgroundColor: accentColor }} className="w-12 h-[1px]"></span>
                        <span style={{ color: accentColor }} className="text-xs font-black tracking-[0.4em] uppercase">
                            Why Choose Us
                        </span>
                        <span style={{ backgroundColor: accentColor }} className="w-12 h-[1px]"></span>
                    </div>

                    <h2 className='text-5xl md:text-7xl font-bold text-white tracking-tighter text-center uppercase leading-none'>
                        Unmatched Quality <br />
                        <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}>
                            & Elite Service
                        </span>
                    </h2>
                </div>

                {/* კონტენტის ბადე */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-center'>

                    {/* მარცხენა სვეტი */}
                    <div className='space-y-6 order-2 lg:order-1'>
                        {features.slice(0, 2).map((feature, index) => (
                            <div key={index} className="group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[rgb(254,154,0)]/30 transition-all duration-500 hover:bg-white/[0.04]">
                                <div style={{ color: accentColor }} className="mb-6 opacity-80 group-hover:scale-110 transition-transform duration-500">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d={feature.icon} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-tight group-hover:text-[rgb(254,154,0)] transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* ცენტრალური ვიზუალი */}
                    <div className='relative flex justify-center order-1 lg:order-2 py-12 lg:py-0'>
                        <div className='relative w-[280px] h-[400px] md:w-[350px] md:h-[500px]'>
                            <div className="absolute inset-0 border border-[rgb(254,154,0)]/20 rounded-[40px] animate-[spin_20s_linear_infinite]"></div>

                            <div className="w-full h-full rounded-[40px] overflow-hidden border border-white/10 p-2 bg-white/5">
                                <img
                                    className='w-full h-full object-cover rounded-[32px] opacity-80 grayscale hover:grayscale-0 transition-all duration-1000'
                                    src="https://demo.awaikenthemes.com/novaride/wp-content/uploads/2024/08/why-choose-img.jpg"
                                    alt="Luxury Car"
                                />
                            </div>

                            <div className="absolute -right-8 top-1/4 bg-[rgb(254,154,0)] p-6 rounded-2xl shadow-2xl rotate-12 hidden md:block">
                                <span className="text-black font-black text-2xl block italic leading-none">{t("PREMIUM")}</span>
                                <span className="text-black/70 text-[10px] font-bold uppercase tracking-widest">{t("Experience")}</span>
                            </div>
                        </div>
                    </div>

                    {/* მარჯვენა სვეტი */}
                    <div className='space-y-6 order-3'>
                        {features.slice(2, 4).map((feature, index) => (
                            <div key={index} className="group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[rgb(254,154,0)]/30 transition-all duration-500 hover:bg-white/[0.04]">
                                <div style={{ color: accentColor }} className="mb-6 opacity-80 group-hover:scale-110 transition-transform duration-500">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d={feature.icon} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-tight group-hover:text-[rgb(254,154,0)] transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}

export default ChooseUs;