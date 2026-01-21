import { useEffect, useState } from "react";
import { useCars } from "../contexts/CarsContext";
import { useTranslation } from "react-i18next"; // იმპორტი

const CarFilter = () => {
    // შემოაქვს მანქანების სია და მონაცემების წამოღების ფუნქცია Custom ჰუკიდან
    const { cars, getCars } = useCars();

    // ენის თარგმნის ფუნქციის ინიციალიზაცია
    const { t } = useTranslation();

    // ფილტრების ობიექტის სთეითი საწყისი ცარიელი მნიშვნელობებით
    const [filters, setFilters] = useState({
        brand: "",
        model: "",
        carType: "",
        minYear: "",
        maxYear: "",
        minPrice: "",
        maxPrice: "",
    });

    // ბრენდის მიხედვით გაფილტრული ტიპების (SUV, Sedan...) სთეითი
    const [filteredCarTypes, setFilteredCarTypes] = useState([]);

    // ხელმისაწვდომი წლების სიის სთეითი
    const [years, setYears] = useState([]);

    // ხელმისაწვდომი ფასების სიის სთეითი
    const [prices, setPrices] = useState([]);

    // ბრენდის მიხედვით გაფილტრული მოდელების სთეითი
    const [filteredModels, setFilteredModels] = useState([]);

    // ეფექტი, რომელიც ბრენდის შეცვლისას აახლებს მანქანის ტიპების სიას
    useEffect(() => {
        if (filters.brand) {
            // თუ ბრენდი არჩეულია, პოულობს ამ ბრენდის შესაბამის ტიპებს
            const types = cars
                .filter(car => car.brand === filters.brand)
                .map(car => car.carType);
            // ინახავს უნიკალურ ტიპებს (დუბლიკატების გარეშე)
            setFilteredCarTypes([...new Set(types)]);
        } else {
            // თუ ბრენდი არაა არჩეული, იღებს ყველა არსებულ ტიპს
            const types = cars.map(car => car.carType);
            setFilteredCarTypes([...new Set(types)]);
        }
    }, [filters.brand, cars]); // ეშვება ბრენდის ან მანქანების სიის შეცვლისას

    // ეფექტი, რომელიც ამზადებს წლების და ფასების სიას სელექტორებისთვის
    useEffect(() => {
        // იღებს უნიკალურ წლებს და ალაგებს კლებადობით
        const uniqueYears = [...new Set(cars.map(car => car.year))].sort((a, b) => b - a);
        setYears(uniqueYears);

        // იღებს უნიკალურ ფასებს და ალაგებს ზრდადობით
        const uniquePrices = [...new Set(cars.map(car => car.pricePerDay))].sort((a, b) => a - b);
        setPrices(uniquePrices);
    }, [cars]); // ეშვება მანქანების სიის ჩატვირთვისას

    // ფუნქცია, რომელიც ააქტიურებს ფილტრაციას არჩეული პარამეტრებით
    const handleFilter = () => {
        getCars(filters);
    };

    // ფუნქცია, რომელიც ასუფთავებს ყველა ფილტრს და აბრუნებს საწყის სიას
    const handleRefresh = () => {
        setFilters({
            brand: "",
            model: "",
            carType: "",
            minYear: "",
            maxYear: "",
            minPrice: "",
            maxPrice: "",
        });
        getCars({}); // ითხოვს ყველა მანქანას ფილტრების გარეშე
    };

    const selectStyles = "w-full bg-white/5 border border-white/10 text-white/80 text-sm rounded-2xl h-[50px] px-4 outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all appearance-none cursor-pointer hover:border-white/20";

    return (
        <div className="w-full flex flex-col space-y-5">
            {/* Brands */}
            <div className="relative">
                <select
                    className={selectStyles}
                    value={filters.brand}
                    onChange={(e) => {
                        const brand = e.target.value;
                        setFilters({ ...filters, brand, model: "" });
                        const models = cars
                            .filter(car => car.brand === brand)
                            .map(car => car.model);
                        setFilteredModels([...new Set(models)]);
                    }}
                >
                    <option className="bg-[#1a1a1a]" value="">{t("Select Brand")}</option>
                    {[...new Set(cars.map(car => car.brand))].map(b => (
                        <option className="bg-[#1a1a1a]" key={b} value={b}>{b}</option>
                    ))}
                </select>
            </div>

            {/* Models */}
            <select
                className={selectStyles}
                value={filters.model}
                onChange={(e) => setFilters({ ...filters, model: e.target.value })}
            >
                <option className="bg-[#1a1a1a]" value="">{t("Select Model")}</option>
                {filteredModels.map(m => (
                    <option className="bg-[#1a1a1a]" key={m} value={m}>{m}</option>
                ))}
            </select>

            {/* Car Type */}
            <select
                className={selectStyles}
                value={filters.carType}
                onChange={(e) => setFilters({ ...filters, carType: e.target.value })}
            >
                <option className="bg-[#1a1a1a]" value="">{t("Body Type")}</option>
                {filteredCarTypes.map(type => (
                    <option className="bg-[#1a1a1a]" key={type} value={type}>{t(type)}</option>
                ))}
            </select>

            {/* Divider */}
            <div className="py-2 flex items-center gap-4">
                <div className="h-px bg-white/5 flex-1"></div>
                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{t("Range")}</span>
                <div className="h-px bg-white/5 flex-1"></div>
            </div>

            {/* Year Range */}
            <div className="flex gap-3">
                <select
                    value={filters.minYear}
                    onChange={(e) => setFilters({ ...filters, minYear: e.target.value })}
                    className={`${selectStyles} !h-[45px] text-xs`}
                >
                    <option className="bg-[#1a1a1a]" value="">{t("Min Year")}</option>
                    {years.map(year => (
                        <option className="bg-[#1a1a1a]" key={year} value={year}>{year}</option>
                    ))}
                </select>
                <select
                    value={filters.maxYear}
                    onChange={(e) => setFilters({ ...filters, maxYear: e.target.value })}
                    className={`${selectStyles} !h-[45px] text-xs`}
                >
                    <option className="bg-[#1a1a1a]" value="">{t("Max Year")}</option>
                    {years.filter(y => !filters.minYear || y >= filters.minYear).map(year => (
                        <option className="bg-[#1a1a1a]" key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>

            {/* Price Range */}
            <div className="flex gap-3">
                <select
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    className={`${selectStyles} !h-[45px] text-xs`}
                >
                    <option className="bg-[#1a1a1a]" value="">{t("Min $")}</option>
                    {prices.map(price => (
                        <option className="bg-[#1a1a1a]" key={price} value={price}>${price}</option>
                    ))}
                </select>
                <select
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    className={`${selectStyles} !h-[45px] text-xs`}
                >
                    <option className="bg-[#1a1a1a]" value="">{t("Max $")}</option>
                    {prices.filter(p => !filters.minPrice || p >= filters.minPrice).map(price => (
                        <option className="bg-[#1a1a1a]" key={price} value={price}>${price}</option>
                    ))}
                </select>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col gap-3">
                <button
                    className="w-full h-[55px] bg-amber-500 hover:bg-white text-black font-black uppercase tracking-widest text-sm rounded-2xl transition-all duration-300 shadow-lg shadow-amber-500/10 active:scale-95"
                    onClick={handleFilter}
                >
                    {t("Apply Filters")}
                </button>
                <button
                    className="w-full h-[55px] bg-white/5 hover:bg-white/10 text-white/60 font-bold uppercase tracking-widest text-[10px] rounded-2xl transition-all duration-300 border border-white/5 active:scale-95"
                    onClick={handleRefresh}
                >
                    {t("Reset All")}
                </button>
            </div>
        </div>
    );
};

export default CarFilter;