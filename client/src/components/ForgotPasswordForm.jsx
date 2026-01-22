import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const { forgotPasswordAction } = useAuth(); 

    const handleSubmit = (e) => {
        e.preventDefault();
        forgotPasswordAction(email);
    };

    return (
        <div className="forgot-password-container">
            <h2>პაროლის აღდგენა</h2>
            <p>შეიყვანეთ თქვენი ელ-ფოსტა და გამოგიგზავნით აღდგენის ლინკს.</p>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="თქვენი იმეილი" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                <button type="submit">ლინკის გაგზავნა</button>
            </form>
        </div>
    );
};

export default ForgotPassword;