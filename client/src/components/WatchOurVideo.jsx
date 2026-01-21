import React from 'react';
import { useTranslation } from 'react-i18next';

const WatchOurVideo = () => {
    const { t } = useTranslation();

    return (
        <section className="bg-[#050505] py-24 px-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl text-left">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-8 h-[1px] bg-amber-500"></span>
                            <span className="text-amber-500 font-black uppercase tracking-[0.3em] text-xs">
                                {t("Exclusive Insight")}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] uppercase italic tracking-tighter">
                            {t("Experience the")} <span className="text-amber-500">{t("Gold Standard")}</span> {t("of Car Rental")}
                        </h2>
                    </div>
                    <p className="text-white/40 text-lg max-w-sm font-light leading-relaxed border-l border-white/10 pl-6">
                        {t("Take a deep dive into our fleet and see why thousands of travelers choose our premium service every month.")}
                    </p>
                </div>

                {/* Media Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    
                    {/* Left Stats Card */}
                    <div className="md:col-span-4 group relative h-[500px] rounded-[40px] overflow-hidden border border-white/10">
                        <img
                            src="/imgi_39_video-counter-img-1.jpg"
                            alt="Experience"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-10 flex flex-col justify-end">
                            <div className="space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-white text-6xl font-black italic tracking-tighter">
                                    {t("3.1k+")}
                                </h3>
                                <p className="text-amber-500 font-bold uppercase tracking-widest text-xs">
                                    {t("Verified Happy Clients")}
                                </p>
                                
                                <div className="flex items-center gap-3 pt-6">
                                    <div className="flex -space-x-3">
                                        {[1,2,3,4].map((i) => (
                                            <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-neutral-800 flex items-center justify-center overflow-hidden">
                                                <img src={`/imgi_12_satisfied-customer-img.png`} alt="Client" />
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-white/60 text-sm font-medium">
                                        {t("+ Many more")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Video Card */}
                    <div className="md:col-span-8 group relative h-[500px] rounded-[40px] overflow-hidden border border-white/10">
                        <img
                            src="/imgi_13_video-counter-img-2.jpg"
                            alt="Showcase"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500" />
                        
                        {/* Play Button Container */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <button className="relative w-32 h-32 flex items-center justify-center group/btn">
                                <div className="absolute inset-0 bg-amber-500 rounded-full scale-100 group-hover/btn:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-amber-500 rounded-full animate-ping opacity-30" />
                                <div className="absolute -inset-4 border border-white/10 rounded-full group-hover/btn:scale-110 transition-transform duration-700" />
                                
                                <svg 
                                    className="w-10 h-10 text-black fill-current relative z-10 translate-x-1 group-hover/btn:scale-110 transition-transform" 
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>

                                <div className="absolute -inset-8 animate-[spin_10s_linear_infinite] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500">
                                    <svg viewBox="0 0 100 100" className="w-full h-full">
                                        <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                                        <text className="text-[10px] uppercase font-bold fill-white tracking-[0.2em]">
                                            <textPath href="#circlePath"> • {t("Play Showreel")} • {t("Play Showreel")} </textPath>
                                        </text>
                                    </svg>
                                </div>
                            </button>
                        </div>

                        {/* Bottom Label */}
                        <div className="absolute bottom-10 left-10 overflow-hidden">
                            <p className="text-white font-black uppercase tracking-widest text-sm translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                <span className="text-amber-500 mr-2">●</span> {t("Live Showcase 2024")}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WatchOurVideo;