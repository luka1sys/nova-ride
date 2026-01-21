import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next"; // იმპორტი

const Categories = () => {
    const { t } = useTranslation(); // ინიციალიზაცია
    const navigate = useNavigate();
    const accentColor = "rgb(254, 154, 0)";

    const categoryData = [
        { title: t('Coupe'), subtitle: t('High Performance'), img: '/luxury-collection-img-1.jpg', type: 'Coupe' },
        { title: t('Convertible'), subtitle: t('Open Top Freedom'), img: '/luxury-collection-img-2.webp', type: 'convertible' },
        { title: t('Sedan'), subtitle: t('Business Class'), img: '/luxury-collection-img-3.webp', type: 'Sedan' },
        { title: t('Minivan'), subtitle: t('Family Travel'), img:'/minivan2.png', type: 'Minivan' },
    ];

    return (
        <section className='w-full bg-[#050505] py-32 overflow-hidden border-t border-white/5'>
            <div className='max-w-[1400px] mx-auto px-6'>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="relative">
                        <div className="flex items-center gap-3 mb-6">
                            <div style={{ backgroundColor: accentColor }} className="w-10 h-[1px]"></div>
                            <span style={{ color: accentColor }} className="text-[10px] font-black tracking-[0.5em] uppercase">
                                Fleet Categories
                            </span>
                        </div>
                        <h2 className="text-white text-5xl md:text-7xl font-bold tracking-tighter leading-none">
                            SELECT YOUR <br />
                            <span className="italic font-light opacity-50">Premium</span> CLASS
                        </h2>
                    </div>
                    <p className="text-gray-500 max-w-xs text-sm leading-relaxed border-l border-white/10 pl-6">
                        {t("Discover our meticulously curated collection of world-class automobiles, tailored for every occasion.")}
                    </p>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {categoryData.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/carspage?type=${item.type}`)}
                            className="group relative overflow-hidden cursor-pointer h-[500px] bg-[#080808] rounded-2xl transition-all duration-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-all duration-[1.5s] ease-out group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                style={{ backgroundImage: `url(${item.img})` }}
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 transition-opacity duration-700' />
                            <div className='absolute inset-0 p-8 flex flex-col justify-between z-10'>
                                <div className="flex justify-between items-start">
                                    <span className="text-white/20 text-3xl font-black group-hover:text-[rgb(254,154,0)] transition-colors duration-500">
                                        0{index + 1}
                                    </span>
                                    <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                                        <span style={{ color: accentColor }} className="text-[8px] font-bold uppercase tracking-[0.4em] bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                            {item.subtitle}
                                        </span>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-5'>
                                    <div>
                                        <h3 className='text-white text-3xl font-bold tracking-tighter mb-2'>
                                            {item.title}
                                        </h3>
                                        <div style={{ backgroundColor: accentColor }} className="w-0 group-hover:w-16 h-[2px] transition-all duration-500"></div>
                                    </div>
                                    <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                                        <span className="text-white/50 text-[9px] uppercase tracking-[0.3em] font-bold">
                                            {t("View Models")}
                                        </span>
                                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[rgb(254,154,0)] group-hover:border-transparent transition-all duration-500">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="transition-all duration-500 group-hover:stroke-black stroke-white">
                                                <path d="M7 17L17 7M17 7H7M17 7V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-0 border border-white/5 group-hover:border-[rgb(254,154,0)]/30 rounded-2xl transition-colors duration-700"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Categories;