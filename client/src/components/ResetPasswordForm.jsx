import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LockKeyhole, ShieldCheck } from 'lucide-react'; // ვიზუალური აქცენტისთვის

const ResetPassword = () => {
    const { token } = useParams();
    const { resetPasswordAction } = useAuth();
    
    const [passwords, setPasswords] = useState({
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (passwords.password !== passwords.confirmPassword) {
            alert("პაროლები არ ემთხვევა!");
            return;
        }
        resetPasswordAction(token, passwords.password);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-lg border border-gray-100">
                
                {/* სათაური */}
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mb-4">
                        <LockKeyhole className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                        პაროლის განახლება
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        გთხოვთ შეიყვანოთ ახალი, უსაფრთხო პაროლი
                    </p>
                </div>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* ახალი პაროლი */}
                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                placeholder="ახალი პაროლი"
                                value={passwords.password}
                                onChange={handleChange}
                                required
                                minLength="8"
                                className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-gray-900 placeholder-gray-400 bg-gray-50/50"
                            />
                        </div>

                        {/* პაროლის გამეორება */}
                        <div className="relative">
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="გაიმეორეთ პაროლი"
                                value={passwords.confirmPassword}
                                onChange={handleChange}
                                required
                                className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-gray-900 placeholder-gray-400 bg-gray-50/50"
                            />
                        </div>
                    </div>

                    {/* ინფორმაცია ვალიდაციაზე */}
                    <div className="flex items-center gap-2 text-xs text-gray-400 px-1">
                        <ShieldCheck size={14} />
                        <span>მინიმუმ 8 სიმბოლო</span>
                    </div>

                    {/* ღილაკი */}
                    <button
                        type="submit"
                        className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md shadow-indigo-200 transition-all duration-200 transform active:scale-[0.98]"
                    >
                        პაროლის შეცვლა
                    </button>
                </form>

                {/* უკან დაბრუნების ბმული */}
                <div className="text-center">
                    <a href="/login" className="text-sm font-medium text-gray-400 hover:text-indigo-600 transition-colors">
                        გაუქმება და დაბრუნება
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;