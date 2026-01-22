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
            <div className="max-w-md w-full space-y-8 bg-black p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-zinc-800">
                
                {/* Icon & Title Section */}
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-3xl bg-zinc-900 border border-zinc-800 rotate-3 mb-6 transition-transform hover:rotate-0 duration-300">
                        <Mail className="h-10 w-10" style={{ color: 'rgb(254, 154, 0)' }} />
                    </div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-[0.2em]">
                        Reset <span style={{ color: 'rgb(254, 154, 0)' }}>Password</span>
                    </h2>
                    <p className="mt-4 text-sm text-zinc-500 font-medium leading-relaxed">
                        Enter your secure email address. We'll send a recovery link to your inbox.
                    </p>
                </div>

                <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label htmlFor="email-address" className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">
                            Identification Email
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
                                className="appearance-none rounded-2xl relative block w-full px-5 py-4 border border-zinc-800 bg-zinc-900/50 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-[rgb(254,154,0)] focus:border-transparent transition-all duration-300"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            style={{ backgroundColor: 'rgb(254, 154, 0)' }}
                            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-xs font-black rounded-2xl text-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_10px_20px_rgba(254,154,0,0.2)] uppercase tracking-[0.15em]"
                        >
                            Request Reset Link
                        </button>
                    </div>

                    {/* Footer Section */}
                    <div className="flex flex-col items-center space-y-6 mt-8">
                        <button 
                            type="button"
                            onClick={() => navigate('/authentication')}
                            className="inline-flex items-center text-[11px] font-black text-zinc-500 hover:text-[rgb(254,154,0)] uppercase tracking-widest transition-colors duration-300 group"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Secure Login
                        </button>
                        
                        <div className="flex items-center gap-2 text-[10px] text-zinc-700 font-bold uppercase tracking-tighter italic">
                            <ShieldCheck size={12} />
                            End-to-end encrypted recovery
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;