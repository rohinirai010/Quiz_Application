import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css'; // Import the CSS file

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register', { email, password });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="register-input" placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="register-input" placeholder="Password" required />
                <button type="submit" className="register-button">Register</button>
            </form>
            <p className="register-message">{message}</p>
        </div>
    );
};

export default RegisterPage;
