import { useRef } from "react";
import { useCars } from "../contexts/CarsContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // დავამატეთ იმპორტი

const Fleets = () => {
    const { t } = useTranslation(); // ინიციალიზაცია
    const scrollRef = useRef(null);
    const { cars } = useCars();

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <section className="bg-[#050505] text-white py-16 md:py-24 overflow-hidden border-t border-white/5">
            <div className="max-w-[1400px] mx-auto px-4 md:px-6">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6">
                    <div className="max-w-2xl w-full">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-[1px] bg-[#FE9A00]"></div>
                            <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-gray-400 font-bold">
                                Premium Fleet
                            </span>
                        </div>
                        <h2 className="text-5xl xs:text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase">
                            Elite <br />
                            <span className="stroke-text">Machines</span>
                        </h2>
                    </div>

                    {/* Desktop Controls */}
                    <div className="hidden md:flex gap-4 pb-2">
                        <button onClick={() => scroll('left')} className="p-4 border border-white/10 hover:bg-[#FE9A00] hover:text-black transition-all duration-500 rounded-full">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M5 12L12 19M5 12L12 5" /></svg>
                        </button>
                        <button onClick={() => scroll('right')} className="p-4 border border-white/10 hover:bg-[#FE9A00] hover:text-black transition-all duration-500 rounded-full">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12H19M19 12L12 5M19 12L12 19" /></svg>
                        </button>
                    </div>
                </div>

                {/* Horizontal Car List */}
                <div
                    ref={scrollRef}
                    className="flex gap-5 md:gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8 -mx-4 px-4 md:mx-0 md:px-0"
                >
                    {cars.map((car, index) => (
                        <div key={car._id} className="snap-center flex-shrink-0 w-[85vw] sm:w-[450px] md:w-[600px] relative group">

                            {/* Number Indicator */}
                            <span className="absolute -top-4 md:-top-6 -left-1 text-5xl md:text-7xl font-black opacity-10 text-white z-0 pointer-events-none">
                                0{index + 1}
                            </span>

                            {/* Image Container */}
                            <div className="relative overflow-hidden aspect-[4/3] md:aspect-[16/10] rounded-lg bg-[#111] z-10">
                                <img
                                    src={car.images[0]}
                                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                                    alt={car.brand}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 md:p-8 flex justify-between items-end">
                                    <div className="pr-2">
                                        <p className="text-[#FE9A00] font-bold text-[10px] md:text-xs tracking-widest uppercase mb-1">{car.brand}</p>
                                        <h3 className="text-lg xs:text-xl md:text-3xl font-bold uppercase tracking-tighter leading-tight truncate max-w-[150px] xs:max-w-full">{car.model}</h3>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <span className="block text-lg md:text-2xl font-black">${car.pricePerDay}</span>
                                        <span className="text-[9px] text-gray-400 uppercase tracking-tighter">{t("Day Rate")}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tech Specs Section */}
                            <div className="mt-5 flex flex-wrap items-center justify-between border-b border-white/5 pb-6 gap-y-4">
                                <div className="flex gap-4 xs:gap-6 md:gap-12">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] md:text-[10px] uppercase text-gray-500 font-bold mb-1">{t("Power")}</span>
                                        <span className="text-[11px] md:text-sm font-medium uppercase">{car.fueltype}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] md:text-[10px] uppercase text-gray-500 font-bold mb-1">{t("Capacity")}</span>
                                        <span className="text-[11px] md:text-sm font-medium uppercase">{car.pasenger} {t("Seats")}</span>
                                    </div>
                                </div>

                                <Link
                                    to={`/car/${car._id}`}
                                    className="flex items-center gap-2 md:gap-3 group/link ml-auto xs:ml-0"
                                >
                                    <span className="text-[10px] font-bold uppercase tracking-widest group-hover:text-[#FE9A00] transition-colors">{t("Details")}</span>
                                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#FE9A00] group-hover:bg-[#FE9A00]/10 transition-all">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform"><path d="M5 12H19M19 12L12 5M19 12L12 19" /></svg>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                .stroke-text {
                    color: transparent;
                    -webkit-text-stroke: 1px rgba(255,255,255,0.3);
                }
                @media (max-width: 768px) {
                    .stroke-text { -webkit-text-stroke: 0.5px rgba(255,255,255,0.4); }
                }
            `}</style>
        </section>
    );
};

export default Fleets;