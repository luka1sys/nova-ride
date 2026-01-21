import React, { useState } from 'react';
import { useTranslation } from "react-i18next";

const Testimonials = () => {
    const { t } = useTranslation();
    const brandAccent = 'rgb(254, 154, 0)';
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        { id: 1, name: "Leslie Alexander", role: "Project Manager", image: "/coment1.jpg", stars: 5 },
        { id: 2, name: "Alis White", role: "Project Manager", image: "/coment2.jpg", stars: 4 },
        { id: 3, name: "Floyd Miles", role: "Project Manager", image: "/coment3.jpg", stars: 5 },
        { id: 4, name: "Annette Black", role: "Project Manager", image: "/coment4.jpg", stars: 5 }
    ];

    // უსასრულო სქროლის ლოგიკა
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="py-24 px-4 md:px-10 bg-[#050505] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[rgb(254,154,0)] opacity-[0.03] blur-[120px] rounded-full"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-[2px]" style={{ backgroundColor: brandAccent }}></div>
                        <span className="font-bold uppercase tracking-[0.3em] text-xs" style={{ color: brandAccent }}>
                            {t("Testimonials")}
                        </span>
                    </div>
                </div>

                {/* სლაიდერის კონტეინერი */}
                <div className="relative overflow-hidden mb-16">
                    <div 
                        className="flex transition-transform duration-500 ease-in-out gap-6"
                        style={{ 
                            // თითო ქარდი იკავებს კონტეინერის 1/3-ს (მინუს gap)
                            transform: `translateX(-${currentIndex * (100 / (window.innerWidth < 768 ? 1 : 3))}%)` 
                        }}
                    >
                        {/* იმისათვის რომ სქროლი ვიზუალურად არ გაწყდეს, მასივს ვაორმაგებთ */}
                        {[...testimonials, ...testimonials].map((item, index) => (
                            <div 
                                key={index} 
                                className="min-w-[100%] md:min-w-[calc(33.333%-16px)] bg-[#111111] border border-white/5 rounded-[30px] p-8 flex flex-col h-full transition-all duration-500 hover:border-[rgb(254,154,0)]/30 group"
                            >
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className={`w-4 h-4 ${i < item.stars ? 'text-[rgb(254,154,0)]' : 'text-white/10'}`} fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed mb-10 flex-grow group-hover:text-gray-200 transition-colors">
                                    "{t("Renting a car from nova ride was a great decision. The vehicle was reliable and the pricing was incredibly competitive.")}"
                                </p>
                                <div className="w-full h-[1px] bg-white/5 mb-8"></div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10 bg-[#050505]">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm uppercase tracking-tight">{item.name}</h4>
                                        <p className="text-white/30 text-[10px] uppercase font-bold tracking-widest">
                                            {t(item.role)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex gap-3">
                        <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button onClick={nextSlide} className="w-12 h-12 rounded-full flex items-center justify-center text-black transition-all hover:scale-105 active:scale-95" style={{ backgroundColor: brandAccent }}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                    <div className="h-[1px] flex-grow bg-white/5"></div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;