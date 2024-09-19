import React from 'react';
import ScrollNavbar from './ScrollNavbar'; // Import your ScrollNavbar component
import Hero from './hero'; // Import the Hero component
import Footer from './Footer'; // Import the Footer component
import './HomePage.css'; // Import any additional styles for the homepage
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    return (
        <div className='homeMain'>
            <ScrollNavbar /> {/* Include the scrollable navbar */}
            <Hero /> {/* Include the hero section */}
            <div className="intro-section">
                <h2>Welcome to Our Supply Chain Management System</h2>
                <p>Our system helps you streamline operations, track shipments, manage inventory, and much more.</p>
            </div>
            <div className="features-section">
                <h2>Features</h2>
                <div className="feature-cards">
                    <div className="feature-card">
                        <h3>Inventory Management</h3>
                        <p>Keep track of your stock levels and manage inventory in real-time.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Order Tracking</h3>
                        <p>Monitor the status of orders and ensure timely delivery.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Supplier Management</h3>
                        <p>Maintain strong relationships with your suppliers and streamline communications.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Products</h3>
                        <p>Maintain a list of all products available.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Shipments</h3>
                        <p>Get all the shipment details for various orders.</p>
                    </div>
                    <div className="feature-card">
                        <h3>RFQ</h3>
                        <p>Request for Quotations to get the pricing details.</p>
                    </div>
                </div>
            </div>
            <div className="testimonials-section">
                <h2>Testimonials</h2>
                <div className="testimonial-card">
                    <blockquote>"This system has transformed our supply chain operations!"</blockquote>
                    <p>- Happy Customer</p>
                </div>
                <div className="testimonial-card">
                    <blockquote>"A must-have for any business looking to optimize their supply chain."</blockquote>
                    <p>- Satisfied Client</p>
                </div>
                <div className="testimonial-card">
                    <blockquote>"Our efficiency has improved significantly since we started using this system."</blockquote>
                    <p>- Grateful User</p>
                </div>
            </div>
            <div className="cta-section">
                <h2>Get Started Today</h2>
                <p>Sign up for a free trial or contact us for a personalized demo.</p>
                <button className="cta-button"><Link to="/signup">Signup</Link></button>
                <button className="cta-button"><Link to="/about">Contact Us</Link></button>
            </div>
            {/* You can add more sections or components here as needed */}
            <Footer /> {/* Include the footer */}
        </div>
    );
}


export default HomePage;

