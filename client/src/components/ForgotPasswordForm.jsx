import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowLeft } from 'react-icons/fi'; // დააინსტალირე react-icons თუ არ გაქვს

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const { forgotPasswordAction } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        forgotPasswordAction(email);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#050505] p-6">
            <div className="w-full max-w-md bg-[#111111] border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                
                {/* დეკორატიული ელემენტი (ნარინჯისფერი ნათება ბექგრაუნდზე) */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#fe9a00] opacity-10 blur-[80px] rounded-full"></div>

                {/* უკან დაბრუნების ღილაკი */}
                <Link 
                    to="/authentication" 
                    className="flex items-center text-gray-500 hover:text-[#fe9a00] transition-colors mb-8 text-sm group"
                >
                    <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Login
                </Link>

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-white mb-3">
                        Forgot <span className="text-[#fe9a00]">Password?</span>
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1 mb-2 block">
                            Email Address
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#fe9a00] transition-colors">
                                <FiMail size={18} />
                            </div>
                            <input 
                                type="email" 
                                placeholder="name@example.com" 
                                className="w-full bg-[#0a0a0a] border border-white/10 p-4 pl-11 rounded-xl text-white focus:border-[#fe9a00] focus:ring-1 focus:ring-[#fe9a00] outline-none transition-all placeholder:text-gray-700"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-[#fe9a00] text-black font-bold py-4 rounded-xl hover:bg-[#e68a00] active:scale-[0.98] transition-all shadow-[0_4px_15px_rgba(254,154,0,0.2)]"
                    >
                        Send Reset Link
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-xs">
                        Don't have an account? 
                        <Link to="/authentication" className="text-[#fe9a00] ml-2 hover:underline font-semibold">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;