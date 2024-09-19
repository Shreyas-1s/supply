import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage1.css'; // Import the CSS file

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let validationErrors = {
            email: '',
            password: ''
        };

        if (!email) {
            validationErrors.email = 'Email is required.';
        } else if (!validateEmail(email)) {
            validationErrors.email = 'Invalid email format.';
        }

        if (!password) {
            validationErrors.password = 'Password is required.';
        }

        setErrors(validationErrors);

        if (!validationErrors.email && !validationErrors.password) {
            try {
                const response = await axios.post('http://127.0.0.1:5000/login', {
                    email,
                    password
                });
                console.log('Form submitted', response.data);
                setErrorMessage(null); // Clear any previous errors
                window.location.href = '/dashboard';
            } catch (error: any) {
                console.error('There was an error!', error);
                setErrorMessage('Login failed. Please check your email and password and try again.');
            }
        } else {
            setErrorMessage(null); // Clear any previous general error
        }
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <h1>Welcome Back!</h1>
                <p>Login to access your account and continue where you left off.</p>
            </div>
            <div className="login-right">
                <div className="login-box">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (errors.email) setErrors({ ...errors, email: '' });
                            }}
                            required
                        />
                        {errors.email && <span className="error">{errors.email}</span>}

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (errors.password) setErrors({ ...errors, password: '' });
                            }}
                            required
                        />
                        {errors.password && <span className="error">{errors.password}</span>}

                        {/* Display the general error message if present */}
                        {errorMessage && <div className="error-message">{errorMessage}</div>}

                        <button type="submit">Log In</button>
                    </form>

                    <a href="#" className="forgot-password">Forgotten your password?</a>
                </div>
                <div className="signup-box">
                    <p>Don't have an account? <a href="/signup">Sign up</a></p>
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

export default LoginPage;
