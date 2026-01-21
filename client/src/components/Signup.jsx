import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Mail, Eye, EyeOff, User } from 'react-feather';
import { IconLock, IconArrowRight, IconBrandGoogle, IconBrandApple, IconBrandFacebook } from '@tabler/icons-react';
import { googleAuth } from "../services/authservice";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next'; // იმპორტი

const Signup = () => {
    const { signup } = useAuth();
    const { t } = useTranslation(); // ინიციალიზაცია
    const [showPassword, setShowPassword] = useState(false);
    
    const accentColor = "rgb(254, 154, 0)";

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            fullname: e.target.fullName.value,
            email: e.target.email.value,
            password: e.target.password.value,
        };
        signup(data);
    };

    const inputWrapperStyle = "group relative mb-4";
    const inputStyle = `
        w-full bg-white/[0.02] border border-white/5 px-4 py-4 pl-12 
        text-white placeholder:text-gray-500 outline-none transition-all duration-500
        focus:border-[rgb(254,154,0)]/40 focus:bg-white/[0.05] rounded-2xl
        group-hover:border-white/10 text-base
    `;

    return (
        <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit} 
            className="w-full max-w-md"
        >
            {/* Full Name Input */}
            <div className={inputWrapperStyle}>
                <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder={t("Full Name")}
                    required
                    className={inputStyle}
                />
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[rgb(254,154,0)] transition-colors duration-500" />
            </div>

            {/* Email Input */}
            <div className={inputWrapperStyle}>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder={t("Email Address")}
                    required
                    className={inputStyle}
                />
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[rgb(254,154,0)] transition-colors duration-500" />
            </div>

            {/* Password Input */}
            <div className={inputWrapperStyle}>
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder={t("Password")}
                    required
                    className={inputStyle}
                />
                <IconLock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[rgb(254,154,0)] transition-colors duration-500" />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-center gap-3 py-3 mb-4">
                <div className="relative flex items-center">
                    <input
                        type="checkbox"
                        id="terms"
                        required
                        className="peer appearance-none w-4 h-4 rounded border border-white/20 bg-transparent checked:bg-[rgb(254,154,0)] checked:border-[rgb(254,154,0)] cursor-pointer transition-all"
                    />
                    <div className="absolute text-black opacity-0 peer-checked:opacity-100 pointer-events-none left-[3px] top-[1px]">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                </div>
                <label htmlFor="terms" className="text-sm text-gray-400 cursor-pointer hover:text-gray-300 transition-colors">
                    {t("I accept the")} <span className="text-white font-medium">{t("membership protocols")}</span>
                </label>
            </div>

            {/* Submit Button */}
            <motion.button
                whileHover={{ scale: 1.01, boxShadow: "0 0 30px rgba(254,154,0,0.2)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                style={{ backgroundColor: accentColor }}
                className="w-full text-black font-semibold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 text-base"
            >
                {t("Create Account")}
                <IconArrowRight size={20} />
            </motion.button>

            {/* Divider */}
            <div className="relative py-10">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/[0.05]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-[#030303] text-gray-500">{t("Or continue with")}</span>
                </div>
            </div>

            {/* Social Connects */}
            <div className="flex gap-4 justify-center">
                {[
                    { icon: <IconBrandGoogle size={22} stroke={1.5} />, action: googleAuth },
                    { icon: <IconBrandApple size={22} stroke={1.5} />, action: null },
                    { icon: <IconBrandFacebook size={22} stroke={1.5} />, action: null }
                ].map((social, idx) => (
                    <motion.button
                        key={idx}
                        whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(254,154,0,0.3)" }}
                        onClick={social.action}
                        type="button"
                        className="flex-1 flex items-center justify-center py-4 border border-white/5 bg-white/[0.01] rounded-2xl text-gray-400 hover:text-white transition-all"
                    >
                        {social.icon}
                    </motion.button>
                ))}
            </div>
        </motion.form>
    );
};

export default Signup;