// ScrollNavbar.tsx

import React, { useState, useEffect } from 'react';
import './ScrollNavbar.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';

const ScrollNavbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;

            if (scrollTop > 50) { // Adjust as needed
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`navbar${scrolled ? ' scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-logo">Logo</div>
                <ul className="navbar-menu">
                    <li className="navbar-item"><Link to="/">Home</Link></li>
                    <li className="navbar-item"><Link to="/about">About</Link></li>
                    <li className="navbar-item"><Link to="/services">Services</Link></li>
                    <li className="navbar-item"><Link to="/login">Login</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default ScrollNavbar;
