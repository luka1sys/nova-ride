import { useState } from "react";
import { useTranslation } from "react-i18next"; // იმპორტი

const Work = () => {
    const { t } = useTranslation(); // ინიციალიზაცია
    const [active, setActive] = useState(1);
    const accentColor = "rgb(254, 154, 0)";

    const steps = [
        {
            id: 1,
            title: t("Browse and Select"),
            desc: t("Explore our diverse selection of high-end vehicles, choose your preferred pickup and return dates, and select a location."),
            icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        },
        {
            id: 2,
            title: t("Book and Confirm"),
            desc: t("Secure your reservation with a few simple clicks. Receive instant confirmation and all the details for your upcoming journey."),
            icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        },
        {
            id: 3,
            title: t("Pick Up and Enjoy"),
            desc: t("Meet your car at the chosen location. Our quick check-in process gets you behind the wheel and on the road in no time."),
            icon: "M13 10V3L4 14h7v7l9-11h-7z"
        }
    ];

    return (
        <section className="bg-[#080808] py-32 px-6 relative overflow-hidden">
            {/* Background Typography */}
            <div className="absolute top-0 right-0 text-[20vw] font-black text-white/[0.02] leading-none select-none pointer-events-none">
                {t("PROCESS")}
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    
                    {/* Left: Content & Navigation */}
                    <div className="lg:col-span-5">
                        <div className="mb-12">
                            <span style={{ color: accentColor }} className="font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
                                // {t("System Flow")}
                            </span>
                            <h2 className="text-5xl md:text-7xl font-black text-white leading-tight uppercase tracking-tighter">
                                {t("How we")} <br />
                                <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>{t("operate.")}</span>
                            </h2>
                        </div>

                        <div className="flex flex-col gap-2">
                            {steps.map((step) => (
                                <button
                                    key={step.id}
                                    onMouseEnter={() => setActive(step.id)}
                                    className={`group relative text-left p-8 transition-all duration-500 border-l-2 ${
                                        active === step.id 
                                        ? "bg-white/[0.03]" 
                                        : "border-white/10 hover:border-white/30"
                                    }`}
                                    style={active === step.id ? { borderLeftColor: accentColor } : {}}
                                >
                                    <div className="flex items-center gap-6">
                                        <span 
                                            className="text-4xl font-black transition-colors duration-500"
                                            style={{ color: active === step.id ? accentColor : "rgba(255,255,255,0.1)" }}
                                        >
                                            0{step.id}
                                        </span>
                                        <div>
                                            <h3 className={`text-xl font-bold uppercase tracking-tight transition-colors ${
                                                active === step.id ? "text-white" : "text-gray-500"
                                            }`}>
                                                {step.title}
                                            </h3>
                                            {active === step.id && (
                                                <p className="text-gray-400 mt-4 text-sm leading-relaxed max-w-sm animate-in fade-in slide-in-from-left-4 duration-500">
                                                    {step.desc}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Visual Showcase */}
                    <div className="lg:col-span-7 relative h-[500px] md:h-[700px] w-full">
                        <div className="absolute inset-0 bg-[#111] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                            <img 
                                src="https://demo.awaikenthemes.com/novaride/wp-content/uploads/2024/08/about-img-1.jpg" 
                                className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
                                alt="Process"
                            />
                            
                            {/* Floating Glass UI Element */}
                            <div className="absolute top-12 left-12 p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl max-w-[240px]">
                                <div className="flex gap-2 mb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }}></div>
                                </div>
                                <p style={{ color: accentColor }} className="text-[10px] font-mono mb-2 uppercase tracking-widest">{t("Active Status")}</p>
                                <p className="text-white text-sm font-bold leading-tight uppercase">
                                    {t("System optimized for premium delivery")}
                                </p>
                            </div>

                            {/* Center Icon Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-48 h-48 border rounded-full animate-pulse flex items-center justify-center" style={{ borderColor: `${accentColor}33` }}>
                                    <div className="w-32 h-32 border rounded-full flex items-center justify-center" style={{ borderColor: `${accentColor}66` }}>
                                        <svg 
                                            width="40" height="40" viewBox="0 0 24 24" 
                                            fill="none" stroke={accentColor} strokeWidth="1.5"
                                            className="animate-spin-slow"
                                        >
                                            <path d={steps.find(s => s.id === active).icon} strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Floating Badge */}
                        <div 
                            style={{ backgroundColor: accentColor }} 
                            className="absolute -bottom-6 -right-6 p-10 rounded-tr-[80px] shadow-[20px_20px_60px_rgba(0,0,0,0.5)]"
                        >
                            <span className="text-black text-6xl font-black block leading-none tracking-tighter">5M+</span>
                            <span className="text-black/70 text-xs font-bold uppercase tracking-[0.2em]">{t("Verified Users")}</span>
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
                .animate-spin-slow {
                    animation: spin 8s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
};

export default Work;