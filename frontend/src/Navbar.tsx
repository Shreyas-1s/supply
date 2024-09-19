import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
    return (
        <div className="navbar-fixed">
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

export default Navbar;
