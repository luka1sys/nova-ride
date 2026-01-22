import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, ShieldCheck } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const { forgotPasswordAction } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgotPasswordAction(email);
            setTimeout(() => {
                navigate('/authentication');
            }, 2000);
        } catch (err) {
            console.error("Failed to send link", err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
            {/* პედინგი p-10-დან p-8-მდე შევამცირე სიმაღლის დასაკლებად */}
            <div className="max-w-md w-full space-y-6 bg-black p-8 rounded-[2rem] shadow-2xl border border-zinc-800">
                
                {/* Icon & Title Section */}
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-2xl bg-zinc-900 border border-zinc-800 mb-4 transition-transform hover:scale-105 duration-300">
                        <Mail className="h-8 w-8" style={{ color: 'rgb(254, 154, 0)' }} />
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                        Reset <span style={{ color: 'rgb(254, 154, 0)' }}>Password</span>
                    </h2>
                    <p className="mt-2 text-sm text-zinc-500 leading-snug">
                        Enter your email address and we'll send a recovery link to your inbox.
                    </p>
                </div>

                <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-1.5">
                        <label htmlFor="email-address" className="block text-xs font-medium text-zinc-400 ml-1">
                            Email Address
                        </label>
                        <div className="relative group">
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-zinc-800 bg-zinc-900/40 text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[rgb(254, 154, 0)] transition-all duration-300"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-1">
                        <button
                            type="submit"
                            style={{ backgroundColor: 'rgb(254, 154, 0)' }}
                            className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-black hover:opacity-90 active:scale-[0.98] transition-all duration-300 shadow-lg"
                        >
                            Send Reset Link
                        </button>
                    </div>

                    {/* Footer Section */}
                    <div className="flex flex-col items-center space-y-4 pt-2">
                        <button 
                            type="button"
                            onClick={() => navigate('/authentication')}
                            className="inline-flex items-center text-sm text-zinc-400 hover:text-[rgb(254, 154, 0)] transition-colors duration-300 group"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Login
                        </button>
                        
                        <div className="flex items-center gap-1.5 text-[10px] text-zinc-600">
                            <ShieldCheck size={12} />
                            <span>Secure recovery process</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;