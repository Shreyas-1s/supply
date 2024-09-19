import React from 'react';
import { Link } from 'react-router-dom';
import './ServicesPage.css';

const ServicesPage: React.FC = () => {
    return (
        <div className="services-page">
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
            <div className="services-content">
                <h1>Our Services</h1>
                <p>We offer a comprehensive range of services designed to optimize your supply chain operations. Our solutions are tailored to meet the unique needs of each business, ensuring maximum efficiency and effectiveness.</p>

                <div className="service-cards">
                    <div className="service-card">
                        <h3>Inventory Management</h3>
                        <p>Our inventory management system allows you to track stock levels in real-time, manage warehouse operations, and reduce inventory costs.</p>
                    </div>
                    <div className="service-card">
                        <h3>Order Tracking</h3>
                        <p>Monitor the status of your orders from placement to delivery. Our system provides real-time updates and ensures timely and accurate fulfillment.</p>
                    </div>
                    <div className="service-card">
                        <h3>Supplier Management</h3>
                        <p>Streamline communications and build strong relationships with your suppliers. Our platform helps you manage supplier performance and collaboration.</p>
                    </div>
                    <div className="service-card">
                        <h3>Analytics and Reporting</h3>
                        <p>Gain valuable insights into your supply chain operations with our powerful analytics and reporting tools. Make data-driven decisions to improve performance.</p>
                    </div>
                    <div className="service-card">
                        <h3>Automated Notifications</h3>
                        <p>Stay informed with automated alerts and notifications. Our system keeps you updated on critical events and helps you respond quickly to any issues.</p>
                    </div>
                    <div className="service-card">
                        <h3>Demand Forecasting</h3>
                        <p>Accurately predict future demand with our advanced forecasting tools. Optimize inventory levels and reduce the risk of stockouts or overstocking.</p>
                    </div>
                    <div className="service-card">
                        <h3>Transportation Management</h3>
                        <p>Manage your transportation operations more efficiently. Our system helps you optimize routes, reduce costs, and improve delivery times.</p>
                    </div>
                    <div className="service-card">
                        <h3>Customer Relationship Management (CRM)</h3>
                        <p>Enhance your customer relationships with our integrated CRM tools. Track interactions, manage sales pipelines, and improve customer satisfaction.</p>
                    </div>
                </div>
            </div>
            <footer>
                <p>&copy; 2024 Your Company. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default ServicesPage;
