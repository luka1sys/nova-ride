import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // ტოკენის ამოსაღებად
import { useAuth } from '../contexts/AuthContext';


const ResetPassword = () => {
    const { token } = useParams(); // იღებს ტოკენს URL-იდან (:token)
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

        // ვალიდაცია: ემთხვევა თუ არა პაროლები ერთმანეთს
        if (passwords.password !== passwords.confirmPassword) {
            alert("პაროლები არ ემთხვევა!");
            return;
        }

        // ვაგზავნით ტოკენს და ახალ პაროლს
        resetPasswordAction(token, passwords.password);
    };

    return (
        <div className="reset-password-container">
            <h2>ახალი პაროლის დაყენება</h2>
            <p>გთხოვთ შეიყვანოთ თქვენი ახალი პაროლი.</p>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input 
                        type="password" 
                        name="password"
                        placeholder="ახალი პაროლი" 
                        value={passwords.password}
                        onChange={handleChange}
                        required 
                        minLength="8"
                    />
                </div>
                
                <div className="form-group">
                    <input 
                        type="password" 
                        name="confirmPassword"
                        placeholder="გაიმეორეთ პაროლი" 
                        value={passwords.confirmPassword}
                        onChange={handleChange}
                        required 
                    />
                </div>
                
                <button type="submit">პაროლის განახლება</button>
            </form>
        </div>
    );
};

export default ResetPassword;