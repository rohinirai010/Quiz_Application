import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; 

const LoginPage = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            setToken(response.data.token);
            navigate('/quiz');
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };


    const handleRegister = () => {
        localStorage.removeItem('token');
        navigate('/register');
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="login-input" placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" placeholder="Password" required />
                <div className='btns'>
                    <button type="submit" className="login-button">Login</button>
                    <button type="submit" className="login-button" onClick={handleRegister}>New User? Register</button>
                </div>
            </form>
            <p className="error-message">{message}</p>
        </div>
    );
};

export default LoginPage;
