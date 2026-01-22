import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const { forgotPasswordAction } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgotPasswordAction(email);
            
            // Redirect to authentication page after 2 seconds
            setTimeout(() => {
                navigate('/authentication');
            }, 2000);
            
        } catch (err) {
            console.error("Failed to send link", err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-2xl border border-gray-200">
                {/* Header Section */}
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-900 mb-4">
                        <Mail className="h-8 w-8" style={{ color: 'rgb(254, 154, 0)' }} />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
                        Reset Password
                    </h2>
                    <p className="mt-3 text-sm text-gray-500 font-medium">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                {/* Form Section */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label htmlFor="email-address" className="block text-xs font-bold text-gray-700 uppercase ml-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded-xl relative block w-full px-4 py-3.5 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-gray-50"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            style={{ backgroundColor: 'rgb(254, 154, 0)' }}
                            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black rounded-xl text-black hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300 shadow-lg uppercase tracking-wider"
                        >
                            Send Reset Link
                        </button>
                    </div>

                    {/* Back to Login */}
                    <div className="text-center mt-6">
                        <button 
                            type="button"
                            onClick={() => navigate('/authentication')}
                            className="inline-flex items-center text-sm font-bold text-gray-600 hover:text-black transition-colors duration-200 group"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;