import React, { useState } from 'react';
import axios from 'axios';
import './SignupPage.css';
 //import { useNavigate } from 'react-router-dom';

const SignupPage: React.FC = () => {
     //const navigate = useNavigate(); // Move this inside the component

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        password: '',
        reEnterPassword: ''
    });

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password: string) => {
        const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return re.test(String(password));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let validationErrors = {
            fullName: '',
            email: '',
            password: '',
            reEnterPassword: ''
        };

        if (!fullName) {
            validationErrors.fullName = 'Full name is required.';
        }

        if (!email) {
            validationErrors.email = 'Email is required.';
        } else if (!validateEmail(email)) {
            validationErrors.email = 'Invalid email format.';
        }

        if (!password) {
            validationErrors.password = 'Password is required.';
        } else if (!validatePassword(password)) {
            validationErrors.password = 'Password must be at least 8 characters long and contain at least one number, one uppercase letter, and one special character.';
        }

        if (!reEnterPassword) {
            validationErrors.reEnterPassword = 'Please re-enter your password.';
        } else if (reEnterPassword !== password) {
            validationErrors.reEnterPassword = 'Passwords do not match.';
        }

        setErrors(validationErrors);

        if (!validationErrors.fullName && !validationErrors.email && !validationErrors.password && !validationErrors.reEnterPassword) {
            try {
                const response = await axios.post('http://127.0.0.1:5000/signup', {
                    name: fullName,
                    email: email,
                    password: password
                });
                console.log('Form submitted', response.data);
                 //navigate('/dashboard'); // Use navigate to redirect
                window.location.href = '/dashboard';
            } catch (error) {
                console.error('There was an error!', error);
            }
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-left">
                <h1>Join Our Platform</h1>
                <p>Sign up to create a new account.</p>
            </div>
            <div className="signup-right">
                <div className="signup-box">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            placeholder="Full Name" 
                            value={fullName} 
                            onChange={(e) => setFullName(e.target.value)} 
                        />
                        {errors.fullName && <span className="error">{errors.fullName}</span>}
                        
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                        
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        {errors.password && <span className="error">{errors.password}</span>}
                        
                        <input 
                            type="password" 
                            placeholder="Re-enter Password" 
                            value={reEnterPassword} 
                            onChange={(e) => setReEnterPassword(e.target.value)} 
                        />
                        {errors.reEnterPassword && <span className="error">{errors.reEnterPassword}</span>}
                        
                        <button type="submit">Sign Up</button>
                    </form>
                    <a href="#" className="forgot-password">Forgot password?</a>
                </div>
                <div className="login-box">
                    <p>Already have an account? <a href="/login">Log in</a></p>
                </div>
                <div className="app-links">
                    <p>Get the app.</p>
                    <div className="app-buttons">
                        <a href="#"><img src="/src/images/appstore.png" alt="App Store" /></a>
                        <a href="#"><img src="/src/images/playstore.png" alt="Google Play" /></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
