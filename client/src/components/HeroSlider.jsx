import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const SliderData = () => {
    const heroRef = useRef(null);
    const { t } = useTranslation();

    useEffect(() => {
        const handleParallax = () => {
            if (heroRef.current) {
                const scrolled = window.scrollY;
                const background = heroRef.current.querySelector('.hero-background');
                if (background) {
                    background.style.transform = `scale(${1 + scrolled * 0.0003}) translateY(${scrolled * 0.05}px)`;
                }
            }
        };

        window.addEventListener('scroll', handleParallax);
        return () => window.removeEventListener('scroll', handleParallax);
    }, []);

    return (
        <section ref={heroRef} className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#05070a]">

            <div className="absolute inset-0 z-0">
                <div className="hero-background absolute inset-0 transition-transform duration-1000 ease-out">
                    <img
                        src="/imgi_57_hero-bg.jpg"
                        className="w-full h-full object-cover opacity-40 scale-105"
                        alt="Luxury Fleet"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#05070a] via-[#05070a]/80 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent z-10"></div>
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-30 pt-20">
                <div className="max-w-4xl">

                    <div className="inline-flex items-center gap-3 mb-6 animate-fadeInUp opacity-0" style={{ animationFillMode: 'forwards' }}>
                        <span className="w-8 h-[2px] bg-amber-500"></span>
                        <span className="text-amber-500 text-xs font-bold tracking-[0.4em] uppercase">
                           {t("Premium Mobility Service")} 
                        </span>
                    </div>

                    <h1 className="text-white mb-8 leading-[1.1]">
                        <span className="block text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight animate-fadeInUp opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                            {t("Elevate Your Journey")}
                        </span>
                        <span className="block text-5xl md:text-8xl lg:text-4xl mt-[2%] mb-[2%] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-amber-500/50 italic animate-fadeInUp opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                            {t("BEYOND LUXURY.")}
                        </span>
                    </h1>

                    <p className="text-slate-400 text-lg md:text-xl font-light max-w-2xl mb-12 leading-relaxed animate-fadeInUp opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                        {t("Experience the pinnacle of automotive excellence. From executive transfers to self-drive luxury, we redefine what it means to travel in style.")}
                    </p>

                    <div className="flex flex-wrap gap-6 items-center animate-fadeInUp opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
                        <Link
                            to="/carspage"
                            className="px-10 py-4 bg-amber-500 text-slate-950 font-semibold text-base rounded-full hover:bg-white transition-all duration-500 hover:shadow-[0_20px_40px_rgba(245,158,11,0.3)] hover:-translate-y-1"
                        >
                            {t("Explore Fleet")}
                        </Link>

                        <Link
                            to="/aboutus"
                            className="group flex items-center gap-4 text-white text-xs font-bold tracking-widest uppercase"
                        >
                            <span className="group-hover:text-amber-500 transition-colors font-normal tracking-normal text-base">{t("Discover More")}</span>
                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-amber-500 group-hover:scale-110 transition-all">
                                <span className="text-xl">→</span>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Statistics */}
                <div className="hidden xl:flex flex-col absolute right-20 top-1/2 -translate-y-1/2 gap-12 border-l border-white/10 pl-10 animate-fadeIn opacity-0" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
                    {[
                        { label: t('Luxury Cars'), val: '50+' },
                        { label: t('VIP Clients'), val: '2.5k' },
                        { label: t('Global Hubs'), val: '12' }
                    ].map((stat, i) => (
                        <div key={i} className="relative group">
                            <p className="text-white text-4xl font-light mb-1">{stat.val}</p>
                            <p className="text-amber-500/60 text-[10px] uppercase tracking-[0.3em] font-bold group-hover:text-amber-500 transition-colors">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-10 left-0 w-full px-12 flex justify-between items-end z-20">
                <div className="flex items-center gap-6">
                    <div className="space-y-1">
                        <div className="w-1 h-1 bg-amber-500 rounded-full animate-pulse"></div>
                        <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-transparent"></div>
                    </div>
                    <span className="text-slate-500 text-[10px] tracking-[0.4em] uppercase vertical-text font-medium">
                        {t("Scroll to discover")}
                    </span>
                </div>
                <div className="flex gap-4 opacity-20 hover:opacity-100 transition-opacity duration-500">
                    <span className="text-white text-[10px] tracking-widest uppercase font-bold">EST. 2024</span>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fadeInUp { animation: fadeInUp 1s cubic-bezier(0.22, 1, 0.36, 1); }
                .animate-fadeIn { animation: fadeIn 1.5s ease-out; }
                .vertical-text { writing-mode: vertical-rl; }
            `}} />
        </section>
    );
}

export default SliderData;