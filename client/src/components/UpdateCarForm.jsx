import { createPortal } from "react-dom";
import { useCars } from "../contexts/CarsContext";
import { useState, useEffect } from "react";
import {
    IconX, IconSettings, IconUpload, IconCheck,
    IconRefresh, IconLoader2 // დამატებულია IconLoader2
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

const UpdateCarForm = ({ car, onClose }) => {
    const { updateCar } = useCars();
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false); // ახალი სტეიტი
    const accentColor = "rgb(254, 154, 0)";

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    const [features, setFeatures] = useState(() => {
        let initialFeatures = car.features;
        if (typeof car.features === 'string') {
            try {
                initialFeatures = JSON.parse(car.features);
            } catch (e) {
                initialFeatures = {};
            }
        }
        return {
            airCondition: initialFeatures?.airCondition || false,
            musicSystem: initialFeatures?.musicSystem || false,
            toolkit: initialFeatures?.toolkit || false,
            absSystem: initialFeatures?.absSystem || false,
            bluetooth: initialFeatures?.bluetooth || false,
            fullBootSpace: initialFeatures?.fullBootSpace || false,
            usbCharger: initialFeatures?.usbCharger || false,
            auxInput: initialFeatures?.auxInput || false,
            spareTyre: initialFeatures?.spareTyre || false,
            powerSteering: initialFeatures?.powerSteering || false,
            powerWindows: initialFeatures?.powerWindows || false
        };
    });

    const handleFeatureChange = (e) => {
        const { name, checked } = e.target;
        setFeatures(prev => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // იწყება პროცესი
        const formData = new FormData(e.target);

        const imageInput = e.target.images;
        if (imageInput && imageInput.files.length === 0) {
            formData.delete("images");
        }

        formData.set("features", JSON.stringify(features));

        try {
            const result = await updateCar(car._id, formData);
            if (result) {
                onClose();
            }
        } finally {
            setIsLoading(false); // სრულდება პროცესი
        }
    };

    const inputStyle = "w-full bg-white/[0.03] border border-white/10 p-4 rounded-2xl text-sm text-white focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-700";
    const labelStyle = "text-xs font-semibold text-gray-500 ml-1 mb-2 block group-focus-within:text-orange-500 transition-colors";

    return createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

            <div className="bg-[#0A0A0A] p-8 md:p-10 rounded-[40px] relative overflow-hidden border border-white/5 shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar">

                <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full" />

                <button onClick={onClose} className="absolute top-6 right-6 p-2.5 bg-white/5 hover:bg-orange-500 hover:text-white rounded-xl transition-all text-gray-500 active:scale-90 z-10">
                    <IconX size={20} />
                </button>

                <div className="mb-10 relative">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1.5 h-6 bg-orange-500 rounded-full" />
                        <h2 className="text-2xl font-bold tracking-tight text-white leading-none">
                            {t("Update")} <span style={{ color: accentColor }}>{t("Vehicle")}</span>
                        </h2>
                    </div>
                    <p className="text-[10px] text-gray-500 font-medium tracking-wide ml-4 uppercase">
                        {t("System ID")}: {car._id.slice(-6)} — {car.brand} {car.model}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                        <div className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="group">
                                    <label className={labelStyle}>{t("Brand")}</label>
                                    <input type="text" name="brand" defaultValue={car.brand} required className={inputStyle} />
                                </div>
                                <div className="group">
                                    <label className={labelStyle}>{t("Model")}</label>
                                    <input type="text" name="model" defaultValue={car.model} required className={inputStyle} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="group">
                                    <label className={labelStyle}>{t("Release Year")}</label>
                                    <input type="number" name="year" defaultValue={car.year} required className={inputStyle} />
                                </div>
                                <div className="group">
                                    <label className={labelStyle}>{t("Price / Day ($)")}</label>
                                    <input type="number" name="pricePerDay" defaultValue={car.pricePerDay} required className={inputStyle} />
                                </div>
                            </div>

                            <div className="group">
                                <label className={labelStyle}>{t("Update Gallery (Optional)")}</label>
                                <div className="relative group/upload">
                                    <input type="file" name="images" multiple className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                    <div className="border-2 border-dashed border-white/10 rounded-2xl py-8 flex flex-col items-center justify-center group-hover/upload:border-orange-500/50 group-hover/upload:bg-white/[0.02] transition-all">
                                        <IconUpload className="text-gray-600 mb-2 group-hover/upload:text-orange-500" size={24} />
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("Click to Replace Images")}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="group">
                                    <label className={labelStyle}>{t("Car Type")}</label>
                                    <input type="text" name="carType" defaultValue={car.carType} className={inputStyle} />
                                </div>
                                <div className="group">
                                    <label className={labelStyle}>{t("Engine")}</label>
                                    <input type="text" name="engine" defaultValue={car.engine} className={inputStyle} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="group">
                                    <label className={labelStyle}>{t("Transmission")}</label>
                                    <input type="text" name="transmission" defaultValue={car.transmission} className={inputStyle} />
                                </div>
                                <div className="group">
                                    <label className={labelStyle}>{t("Condition")}</label>
                                    <input type="text" name="condition" defaultValue={car.condition} className={inputStyle} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="group">
                                    <label className={labelStyle}>{t("Mileage (km)")}</label>
                                    <input type="number" name="mileage" defaultValue={car.mileage} className={inputStyle} />
                                </div>
                                <div className="group">
                                    <label className={labelStyle}>{t("Fuel Type")}</label>
                                    <input type="text" name="fueltype" defaultValue={car.fueltype} className={inputStyle} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="group">
                                    <label className={labelStyle}>{t("Country of Origin")}</label>
                                    <input type="text" name="countryoforigin" defaultValue={car.countryoforigin} className={inputStyle} />
                                </div>
                                <div className="group">
                                    <label className={labelStyle}>{t("Location")}</label>
                                    <input type="text" name="location" defaultValue={car.location} className={inputStyle} />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div className="group">
                                    <label className={labelStyle}>{t("Doors")}</label>
                                    <input type="number" name="doors" defaultValue={car.doors} className={inputStyle} />
                                </div>
                                <div className="group">
                                    <label className={labelStyle}>{t("Seats")}</label>
                                    <input type="number" name="seats" defaultValue={car.seats} className={inputStyle} />
                                </div>
                                <div className="group">
                                    <label className={labelStyle}>{t("Passenger")}</label>
                                    <input type="number" name="pasenger" defaultValue={car.pasenger} className={inputStyle} />
                                </div>
                            </div>

                            <div className="group">
                                <label className={labelStyle}>{t("Contact Phone")}</label>
                                <input type="text" name="phone" defaultValue={car.phone} className={inputStyle} />
                            </div>

                            <div className="group">
                                <label className={labelStyle}>{t("Vehicle Description")}</label>
                                <textarea name="description" defaultValue={car.description} className={`${inputStyle} h-[116px] resize-none`} />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                        <div className="flex items-center gap-2 mb-6">
                            <IconSettings size={18} className="text-orange-500" />
                            <h3 className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">{t("Equipment & Systems")}</h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {Object.keys(features).map(key => (
                                <label key={key} className="flex items-center gap-3 cursor-pointer group/feat">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            name={key}
                                            checked={features[key]}
                                            onChange={handleFeatureChange}
                                            className="peer hidden"
                                        />
                                        <div className="w-5 h-5 border border-white/10 rounded-lg peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all flex items-center justify-center">
                                            <IconCheck className="text-black hidden peer-checked:block" size={14} stroke={4} />
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-500 group-hover/feat:text-white uppercase tracking-tight transition-colors">
                                        {t(key)}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="flex-1 px-8 py-5 rounded-2xl border border-white/10 text-xs font-bold text-gray-400 hover:bg-white/5 hover:text-white transition-all active:scale-95 disabled:opacity-50"
                        >
                            {t("Cancel")}
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-[2] bg-white text-black py-5 rounded-2xl font-bold tracking-widest hover:bg-orange-500 hover:text-white transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 disabled:bg-white/50"
                        >
                            {isLoading ? (
                                <>
                                    <IconLoader2 className="animate-spin" size={20} />
                                    {t("Processing...")}
                                </>
                            ) : (
                                t("Update")
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default UpdateCarForm;