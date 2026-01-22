import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Mail, ArrowLeft } from 'lucide-react'; // სურვილისამებრ, ხატულებისთვის

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const { forgotPasswordAction } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        forgotPasswordAction(email);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                {/* სათაური და ტექსტი */}
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        პაროლის აღდგენა
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        შეიყვანეთ თქვენი ელ-ფოსტა და გამოგიგზავნით აღდგენის ლინკს.
                    </p>
                </div>

                {/* ფორმა */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="relative">
                            <label htmlFor="email-address" className="sr-only">
                                ელ-ფოსტა
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="თქვენი იმეილი"
                            />
                        </div>
                    </div>

                    {/* ღილაკი */}
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                        >
                            ლინკის გაგზავნა
                        </button>
                    </div>

                    {/* უკან დაბრუნება */}
                    <div className="text-center mt-4">
                        <a href="/login" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                            <span className="mr-2">←</span>
                            უკან დაბრუნება
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;