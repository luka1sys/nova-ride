import { useRef, useEffect, useState } from "react";
import Footer from "../components/Footer";
import { useCars } from "../contexts/CarsContext";
import { useNavigate, useParams } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";
import { useReview } from "../contexts/ReviewContext";
import { useTranslation } from "react-i18next"; 
import CarMap from "../components/CarMap"; 

const Car = () => {
    const { cars } = useCars();
    const { id } = useParams();
    const { t } = useTranslation(); 
    const scrollRef = useRef(null);
    const reviewsListRef = useRef(null);
    const { reviews, loadReviews } = useReview();
    const navigate = useNavigate();
    
    const [showReviewsList, setShowReviewsList] = useState(false);

    const car = cars.find(c => c._id === id);

    const lat = car?.location?.coordinates?.coordinates[1];
    const lng = car?.location?.coordinates?.coordinates[0];

    useEffect(() => {
        if (id) loadReviews(id);
    }, [id]);

    useEffect(() => {
        if (showReviewsList && reviewsListRef.current) {
            reviewsListRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [showReviewsList]);

    if (!car) {
        return <div className="h-screen flex items-center justify-center text-white bg-[#050505] text-2xl font-medium">{t("Machine Not Found")}</div>;
    }

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <main className="bg-[#050505] text-[#e0e0e0] min-h-screen font-sans selection:bg-[#FE9A00] selection:text-black">

            {/* Hero Section */}
            <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
                <img src={car.images[0]} className="w-full h-full object-cover opacity-50" alt={car.brand} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/60 flex flex-col justify-end pb-16 px-6 md:px-12">
                    <div className="max-w-[1200px] mx-auto w-full">
                        <p className="text-[#FE9A00] font-medium text-lg mb-2">{t("Premium Vehicle Details")}</p>
                        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                            {car.brand} <span className="font-light text-gray-400">{car.model}</span>
                        </h1>
                    </div>
                </div>
            </div>

            {/* Main Content Grid - დავამატე items-start და relative */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">

                {/* Left Column (Content) */}
                <div className="lg:col-span-8 space-y-20">
                    {/* Image Slider */}
                    <div className="relative group overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                        <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4">
                            {car.images.map((img, i) => (
                                <div key={i} className="flex-shrink-0 w-full aspect-video snap-center">
                                    <img src={img} className="w-full h-full object-cover" alt="" />
                                </div>
                            ))}
                        </div>
                        <div className="absolute bottom-8 right-8 flex gap-4">
                            <button onClick={() => scroll('left')} className="p-4 bg-black/60 backdrop-blur-md border border-white/20 rounded-full hover:bg-[#FE9A00] hover:text-black transition-all">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                            </button>
                            <button onClick={() => scroll('right')} className="p-4 bg-black/60 backdrop-blur-md border border-white/20 rounded-full hover:bg-[#FE9A00] hover:text-black transition-all">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                            </button>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div>
                        <h3 className="text-2xl font-bold mb-10 text-white flex items-center gap-4">
                            {t("Equipment & Features")} <div className="h-[1px] flex-1 bg-white/10"></div>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Object.entries(car.features).map(([key, value]) => {
                                if (typeof value !== 'boolean') return null;
                                return (
                                    <div key={key} className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 transition-all hover:bg-white/[0.05]">
                                        <div className={`w-2 h-2 rounded-full ${value ? 'bg-[#FE9A00] shadow-[0_0_10px_#FE9A00]' : 'bg-white/10'}`}></div>
                                        <span className={`text-[15px] font-medium ${value ? 'text-gray-200' : 'text-gray-600'}`}>
                                            {t(key.replace(/([A-Z])/g, ' $1').trim())}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Map Section */}
                    <div>
                        <h3 className="text-2xl font-bold mb-10 text-white flex items-center gap-4">
                            {t("Vehicle Location")} <div className="h-[1px] flex-1 bg-white/10"></div>
                        </h3>
                        <div className="rounded-[30px] overflow-hidden border border-white/10 shadow-2xl relative z-0">
                            {lat && lng ? (
                                <CarMap lat={lat} lng={lng} address={car.location.address} />
                            ) : (
                                <div className="h-[400px] bg-white/5 flex items-center justify-center italic text-gray-500">
                                    {t("Location loading...")}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Review Section */}
                    <div className="pt-10 space-y-12">
                        <ReviewForm carId={car._id} />
                        <div className="space-y-8">
                            <h3 className="text-2xl font-bold text-white flex items-center gap-4">
                                {t("Experience Wall")} <div className="h-[1px] flex-1 bg-white/10"></div>
                            </h3>

                            {!showReviewsList ? (
                                <div className="flex justify-center py-4">
                                    <button 
                                        onClick={() => setShowReviewsList(true)}
                                        className="px-8 py-4 bg-white/[0.03] border border-white/10 rounded-2xl text-white font-bold uppercase tracking-widest text-sm hover:bg-[#FE9A00] hover:text-black transition-all duration-300"
                                    >
                                        {t("Read Customer Stories")} ({reviews.length})
                                    </button>
                                </div>
                            ) : (
                                <div ref={reviewsListRef} className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {reviews.length > 0 ? (
                                            reviews.map((rev) => (
                                                <div key={rev._id} className="bg-white/[0.02] border border-white/5 p-6 rounded-[25px]">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FE9A00] to-[#ffc368] flex items-center justify-center text-black font-black text-xs">
                                                                {rev.user?.fullname?.substring(0, 2).toUpperCase() || "GU"}
                                                            </div>
                                                            <div>
                                                                <h4 className="text-white font-bold text-sm">{rev.user?.fullname || t("Anonymous")}</h4>
                                                                <p className="text-[10px] text-gray-500 uppercase">{new Date(rev.createdAt).toLocaleDateString()}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex text-[#FE9A00] text-[10px]">
                                                            {"★".repeat(rev.rating)}
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-400 text-sm italic">"{rev.comment}"</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-600 text-center col-span-2">{t("No reviews found yet.")}</p>
                                        )}
                                    </div>
                                    <button onClick={() => setShowReviewsList(false)} className="mt-8 text-gray-500 text-xs uppercase font-bold hover:text-[#FE9A00] block mx-auto">
                                        {t("Close Wall")}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column (Sticky Booking Card) */}
                {/* sticky და top-24 უზრუნველყოფს გაყინვას */}
                <aside className="lg:col-span-4 sticky top-24 self-start">
                    <section className="w-full bg-[#0c0c0c] border border-white/10 overflow-hidden rounded-[40px] pb-10 shadow-2xl relative">
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FE9A00] opacity-5 blur-[100px]"></div>
                        
                        <div className="flex relative h-[100px] px-8 md:px-10 mt-8 items-center border-b border-white/5">
                            <p className="text-5xl md:text-6xl font-bold text-white tracking-tighter">${car.pricePerDay}</p>
                            <p className="text-lg text-gray-500 ml-3 self-end mb-3 font-medium">/ {t("per Day")}</p>
                        </div>

                        <div className="mt-8 flex flex-col gap-6 px-8 md:px-10">
                            {[
                                { icon: "/810008.png", label: t("Doors"), val: car.doors },
                                { icon: "/imgi_4_icon-passengers (1).svg", label: t("Passenger"), val: car.pasenger },
                                { icon: "/imgi_5_icon-transmission.svg", label: t("Transmission"), val: car.transmission?.split(' ')[0] },
                                { icon: "/imgi_6_icon-age.svg", label: t("Year"), val: car.year },
                                { icon: "/car-seat-with-seatbelt-svgrepo-com (2).svg", label: t("Seats"), val: car.pasenger },
                                { icon: "/imgi_8_icon-aircondition.svg", label: t("Air Condition"), val: car.features.airCondition ? t("Yes") : t("No") }
                            ].map((item, index) => (
                                <div key={index} className="flex relative items-center gap-4 group">
                                    <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl group-hover:bg-[#FE9A00]/10 transition-colors">
                                        <img className="w-6 h-6 object-contain brightness-200 opacity-70 group-hover:opacity-100" src={item.icon} alt={item.label} />
                                    </div>
                                    <p className="text-[17px] text-gray-400 font-medium">{item.label}</p>
                                    <p className="absolute right-0 text-[18px] font-bold text-white">{item.val}</p>
                                </div>
                            ))}
                        </div>

                        <hr className="w-[85%] border-white/5 mx-auto mt-10" />

                        <div className="mt-8 flex items-center justify-center gap-4 px-6 md:px-8">
                            <div className="group flex items-center">
                                <button onClick={() => navigate(`/bookingpage/${car._id}`)} className="w-[130px] md:w-[150px] h-[60px] cursor-pointer rounded-l-[30px] bg-[#FE9A00] flex justify-center items-center text-black font-black text-[17px] hover:bg-white transition-all duration-300">
                                    {t("Book Now")}
                                </button>
                                <button onClick={() => navigate(`/bookingpage/${car._id}`)} className="bg-[#FE9A00] w-[60px] h-[60px] rounded-r-[30px] border-l border-black/10 group-hover:bg-white cursor-pointer flex justify-center items-center transition-all duration-500">
                                    <svg className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-500" fill="none" height="30" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.0378 6.34317L13.6269 7.76069L16.8972 11.0157L3.29211 11.0293L3.29413 13.0293L16.8619 13.0157L13.6467 16.2459L15.0643 17.6568L20.7079 11.9868L15.0378 6.34317Z" fill="black" />
                                    </svg>
                                </button>
                            </div>
                            <button className="bg-[#25D366] hover:scale-110 flex justify-center items-center w-[60px] h-[60px] rounded-full cursor-pointer transition-all duration-300 group shadow-[0_0_15px_rgba(37,211,102,0.2)]">
                                <img className="w-8 h-8" src="/whatsapp-svgrepo-com (1).svg" alt="WhatsApp" />
                            </button>
                        </div>
                    </section>
                </aside>
            </div>

            <Footer />

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </main>
    );
};

export default Car;