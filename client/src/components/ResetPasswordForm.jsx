import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LockKeyhole, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useTranslation } from "react-i18next"; // დავამატეთ ჰუკი
import { motion } from "framer-motion";

const ResetPassword = () => {
    const { t } = useTranslation(); // ინიციალიზაცია
    const { token } = useParams();
    const navigate = useNavigate();
    const { resetPasswordAction } = useAuth();
    
    const [passwords, setPasswords] = useState({
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwords.password !== passwords.confirmPassword) {
            alert(t("Passwords do not match!"));
            return;
        }
        
        try {
            await resetPasswordAction(token, passwords.password);
            // წარმატების შემთხვევაში გადამისამართება ხდება AuthContext-იდან ან აქედან
        } catch (err) {
            console.error("Reset failed", err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-md w-full space-y-6 bg-black p-8 rounded-[2rem] shadow-2xl border border-zinc-800"
            >
                
                {/* Header Section */}
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-2xl bg-zinc-900 border border-zinc-800 mb-4 transition-transform hover:scale-105 duration-300">
                        <LockKeyhole className="h-8 w-8" style={{ color: 'rgb(254, 154, 0)' }} />
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight uppercase">
                        {t("New")} <span style={{ color: 'rgb(254, 154, 0)' }}>{t("Password")}</span>
                    </h2>
                    <p className="mt-2 text-sm text-zinc-500 leading-snug">
                        {t("Please enter your new secure password below.")}
                    </p>
                </div>

                <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* New Password */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-medium text-zinc-400 ml-1 uppercase tracking-wider">
                                {t("New Password")}
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder={t("Min. 8 characters")}
                                value={passwords.password}
                                onChange={handleChange}
                                required
                                minLength="8"
                                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-zinc-800 bg-zinc-900/40 text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[rgb(254, 154, 0)] transition-all duration-300"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-medium text-zinc-400 ml-1 uppercase tracking-wider">
                                {t("Confirm Password")}
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder={t("Repeat new password")}
                                value={passwords.confirmPassword}
                                onChange={handleChange}
                                required
                                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-zinc-800 bg-zinc-900/40 text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[rgb(254, 154, 0)] transition-all duration-300"
                            />
                        </div>
                    </div>

                    {/* Validation Hint */}
                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-600 px-1 uppercase tracking-tighter">
                        <ShieldCheck size={12} />
                        <span>{t("At least 8 characters required")}</span>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-1">
                        <button
                            type="submit"
                            style={{ backgroundColor: 'rgb(254, 154, 0)' }}
                            className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-black hover:opacity-90 active:scale-[0.98] transition-all duration-300 shadow-lg uppercase tracking-wide"
                        >
                            {t("Update Password")}
                        </button>
                    </div>

                    {/* Footer / Back */}
                    <div className="text-center pt-2">
                        <button 
                            type="button"
                            onClick={() => navigate('/authentication')}
                            className="inline-flex items-center text-sm text-zinc-400 hover:text-[rgb(254, 154, 0)] transition-colors duration-300 group"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            {t("Back to Login")}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default ResetPassword;