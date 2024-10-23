import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { registerUser, loginUser } from '../api';
import './Auth.css'; 

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        role: 'Student',
        password: '',
    });

    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await loginUser({ email: formData.email, password: formData.password });
                alert('Logged in successfully');
                navigate('/users'); 
            } else {
                await registerUser(formData);
                alert('Registered successfully');
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-title">{isLogin ? 'Login' : 'Register'}</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                {!isLogin && (
                    <>
                        <input className="auth-input" type="text" name="name" placeholder="Name" onChange={handleChange} required />
                        <input className="auth-input" type="tel" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
                        <select className="auth-select" name="role" onChange={handleChange} required>
                            <option value="Student">Student</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Institute">Institute</option>
                        </select>
                    </>
                )}
                <input className="auth-input" type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input className="auth-input" type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button className="auth-button" type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            <button className="auth-switch-button" onClick={() => setIsLogin(!isLogin)}>
                Switch to {isLogin ? 'Register' : 'Login'}
            </button>
        </div>
    );
};

export default Auth;
