import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useCars } from "../contexts/CarsContext";
import Footer from "../components/Footer";
import CarFilter from "../components/carFilter";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CarsPage = () => {
    const { cars, getCars } = useCars();
    const [currentPage, setCurrentPage] = useState(0);
    const location = useLocation();
    const { t } = useTranslation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const typeFilter = queryParams.get('type');

        if (typeFilter) {
            getCars({ carType: typeFilter });
        } else {
            getCars({});
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location.search]);

    const itemsPerPage = 6;
    const offset = currentPage * itemsPerPage;
    const currentItems = cars.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(cars.length / itemsPerPage);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    return (
        <main className="min-h-screen bg-black text-white flex flex-col items-center w-full overflow-x-hidden">
            {/* Header Section with Smooth Gradient Transition */}
            <div
                className="relative w-full h-[350px] md:h-[500px] flex items-center justify-center overflow-hidden"
                style={{
                    backgroundImage: "url('/075130517030.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* ეს ნაწილი ქმნის რბილ გადასვლას ფოტოდან შავ ფონზე */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black"></div>

                <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-start text-left">
                    {/* ზედა ხაზი და პატარა ტექსტი */}
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-[1px] bg-amber-500"></div>
                        <p className="text-amber-500 text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase">
                            {t("Experience Excellence")}
                        </p>
                    </div>

                    {/* მთავარი სათაური და აღწერა - Flex Layout-ით */}
                    <div className="w-full flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

                        {/* სათაური */}
                        <div className="max-w-2xl">
                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter uppercase leading-[0.9]">
                                <span className="block text-white">{t("Our")}</span>
                                <span className="block text-amber-500  drop-shadow-[0_10px_20px_rgba(245,158,11,0.2)]">
                                    {t("Fleet")}
                                </span>
                            </h1>
                        </div>

                        {/* მარჯვენა მხარე: აღწერა და ნავიგაცია */}
                        <div className="max-w-md lg:text-right flex flex-col lg:items-end">
                            <p className="text-white/50 text-sm md:text-base font-medium mb-8 leading-relaxed">
                                {t("Discover our curated collection of world-class automobiles, where luxury meets performance in every detail.")}
                            </p>

                            {/* ნავიგაცია - უფრო მინიმალისტური */}
                            <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase">
                                <Link
                                    to="/"
                                    className="text-white/40 hover:text-white transition-colors border-b border-white/10 pb-1"
                                >
                                    {t("Home")}
                                </Link>
                                <span className="text-amber-500">/</span>
                                <span className="text-amber-500 border-b border-amber-500/50 pb-1">
                                    {t("Premium Selection")}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 py-16 md:py-24 flex flex-col lg:flex-row gap-12">
                <aside className="w-full lg:w-[320px] flex-shrink-0">
                    <div className="sticky top-28 space-y-8">
                        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[32px] border border-white/10 shadow-2xl">
                            <h3 className="text-xl font-black mb-8 flex items-center gap-3 uppercase tracking-widest">
                                <span className="w-2 h-6 bg-amber-500 rounded-full"></span>
                                {t("Filter")}
                            </h3>
                            <div className="dark-filter-wrapper">
                                <CarFilter />
                            </div>
                        </div>
                    </div>
                </aside>

                <section className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {currentItems.length > 0 ? (
                            currentItems.map((car) => (
                                <div
                                    key={car._id}
                                    className="group bg-white/5 backdrop-blur-sm rounded-[32px] overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col h-full"
                                >
                                    <div className="relative h-52 w-full overflow-hidden">
                                        <img
                                            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                                            src={car.images[0] || ""}
                                            alt={car.brand}
                                        />
                                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full z-10">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-amber-500">
                                                {t(car.carType)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="mb-4">
                                            <h3 className="text-xl font-black text-white group-hover:text-amber-500 transition-colors uppercase tracking-tight italic line-clamp-1">
                                                {car.brand} {car.model}
                                            </h3>
                                            <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mt-0.5">
                                                {car.fueltype} {t("Tech")}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 py-4 border-y border-white/5 mb-5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                                                    <img className="w-4 invert opacity-60" src="./810008.png" alt="Doors" />
                                                </div>
                                                <span className="text-[10px] font-bold text-white/70 uppercase tracking-tighter">{car.doors} {t("Doors")}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                                                    <img className="w-4 invert opacity-60" src="/Screenshot_2025-10-24_213042-removebg-preview.png" alt="Pax" />
                                                </div>
                                                <span className="text-[10px] font-bold text-white/70 uppercase tracking-tighter">{car.pasenger} {t("Pax")}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-auto pt-2">
                                            <div>
                                                <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-0.5">{t("Daily Rate")}</p>
                                                <p className="text-2xl font-black text-white tracking-tighter">
                                                    ${car.pricePerDay}<span className="text-xs text-amber-500 font-medium ml-0.5">/{t("d")}</span>
                                                </p>
                                            </div>
                                            <Link
                                                to={`/car/${car._id}`}
                                                className="w-11 h-11 bg-amber-500 text-black rounded-xl flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg active:scale-90"
                                            >
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="7" y1="17" x2="17" y2="7"></line>
                                                    <polyline points="7 7 17 7 17 17"></polyline>
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-32 bg-white/5 rounded-[40px] border border-dashed border-white/10">
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                    <span className="text-4xl">🏎️</span>
                                </div>
                                <p className="text-xl text-white/40 font-bold uppercase tracking-widest">{t("No matching rides found")}</p>
                            </div>
                        )}
                    </div>

                    {pageCount > 1 && (
                        <div className="mt-24 flex justify-center">
                            <ReactPaginate
                                previousLabel={<span className="flex items-center justify-center w-14 h-14 bg-white/5 border border-white/10 rounded-2xl hover:bg-amber-500 hover:text-black transition-all group">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                                </span>}
                                nextLabel={<span className="flex items-center justify-center w-14 h-14 bg-white/5 border border-white/10 rounded-2xl hover:bg-amber-500 hover:text-black transition-all">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14m-7 7 7-7-7-7" /></svg>
                                </span>}
                                pageCount={pageCount}
                                onPageChange={handlePageClick}
                                containerClassName={"flex items-center gap-4"}
                                pageClassName={"w-14 h-14 flex items-center justify-center font-black text-white/40 rounded-2xl border border-white/5 bg-white/5 transition-all cursor-pointer hover:border-amber-500/50 hover:text-white"}
                                activeClassName={"!text-black !bg-amber-500 !border-amber-500 shadow-[0_10px_30px_rgba(245,158,11,0.3)]"}
                                breakLabel={"..."}
                                disabledClassName={"opacity-20 cursor-not-allowed"}
                            />
                        </div>
                    )}
                </section>
            </div>
            <Footer />
        </main>
    );
};

export default CarsPage;