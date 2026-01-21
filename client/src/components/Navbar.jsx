import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next"; // დავამატეთ ჰუკი
import LanguageSwitcher from "./LanguageSwitcher"; 

const Navbar = () => {
    const { t } = useTranslation(); // ინიციალიზაცია
    const { user } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // ნავიგაციის ლინკები ახლა იყენებენ t() ფუნქციას
    const navLinks = [
        { name: t('Home'), path: '/' },
        { name: t('Cars'), path: '/carspage' },
        { name: t('About'), path: '/about' },
        { name: t('Services'), path: '/service' },
        { name: t('Contact'), path: '/contactus' },
    ];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
    }, [isMobileMenuOpen]);

    const getDashboardLink = () => {
        if (!user) return "/authentication";
        return user.role === 'admin' ? "/admin" : "/panel";
    };

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-500 ${
                isScrolled
                    ? "bg-black/90 backdrop-blur-xl py-3 border-b border-white/5"
                    : "bg-transparent py-5 md:py-7"
            }`}>
                <div className="max-w-[1800px] mx-auto px-5 md:px-12 flex justify-between items-center">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 md:gap-3 group z-[110]">
                        <div className="w-9 h-9 md:w-10 md:h-10 bg-amber-500 rounded-lg flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                            <span className="text-black font-bold text-lg">N</span>
                        </div>
                        <span className="text-white text-xl md:text-2xl font-bold tracking-tight">
                            Nova<span className="text-amber-500">Ride</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-10">
                        <ul className="flex items-center gap-8">
                            {navLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-[15px] font-medium text-white/80 hover:text-amber-500 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="h-5 w-[1px] bg-white/10 mx-2"></div>

                        <div className="flex items-center gap-6">
                            <div className="text-white">
                                <LanguageSwitcher />
                            </div>

                            <Link
                                to={getDashboardLink()}
                                className="text-[15px] font-semibold text-white hover:text-amber-500 transition-colors"
                            >
                                {user ? 
                                    (user.role === 'admin' ? t('Admin Panel') : t('Dashboard')) : 
                                    t('Sign In')
                                }
                            </Link>

                            <Link to='/carspage'>
                                <button className="bg-amber-500 hover:bg-amber-400 text-black px-7 py-3 rounded-full text-sm font-bold transition-all shadow-lg shadow-amber-500/20">
                                    {t('Book Now')}
                                </button>
                            </Link>
                        </div>
                    </nav>

                    {/* Burger Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden z-[110] p-2 text-white"
                    >
                        <div className="flex flex-col gap-1.5 items-end">
                            <div className={`h-[2px] bg-white transition-all ${isMobileMenuOpen ? 'w-7 rotate-45 translate-y-[8px]' : 'w-8'}`}></div>
                            <div className={`h-[2px] bg-amber-500 transition-all ${isMobileMenuOpen ? 'opacity-0' : 'w-5'}`}></div>
                            <div className={`h-[2px] bg-white transition-all ${isMobileMenuOpen ? 'w-7 -rotate-45 -translate-y-[8px]' : 'w-8'}`}></div>
                        </div>
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 z-[105] lg:hidden transition-all duration-500 ${
                isMobileMenuOpen ? "visible" : "invisible pointer-events-none"
            }`}>
                <div
                    className={`absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-500 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>

                <div className={`absolute top-0 right-0 w-[75%] h-full bg-[#0a0a0a] p-10 pt-32 flex flex-col transition-transform duration-500 ${
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}>
                    <div className="flex flex-col gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-2xl font-semibold text-white hover:text-amber-500"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-auto flex flex-col gap-5 pb-10">
                        <div className="bg-white/5 p-4 rounded-xl text-white">
                           <LanguageSwitcher />
                        </div>

                        <div className="h-[1px] w-full bg-white/5"></div>
                        <Link
                            to={getDashboardLink()}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-lg font-medium text-white/90"
                        >
                            {user ? 
                                (user.role === 'admin' ? t('Admin Panel') : t('Dashboard')) : 
                                t('Account Sign In')
                            }
                        </Link>
                        <Link 
                            to="/carspage"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-full bg-amber-500 text-black py-4 rounded-xl font-bold text-center text-base shadow-lg shadow-amber-500/20"
                        >
                            {t('Book Your Ride')}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;