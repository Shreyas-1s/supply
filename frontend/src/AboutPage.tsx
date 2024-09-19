import React from 'react';
import Navbar from './Navbar';
import './AboutPage.css';

const AboutPage: React.FC = () => {
    return (
        <div className="about-page">
            <Navbar />
            <div className="about-content">
                <h1>About Us</h1>
                <p>Welcome to our supply chain management system. Our platform is designed to help you streamline operations, track shipments, manage inventory, and much more. We are committed to providing top-notch solutions to help businesses optimize their supply chains.</p>
                <p>Founded in 2020, our company has rapidly grown to become a leader in the supply chain management industry. Our team of experts brings decades of experience and a deep understanding of the challenges and opportunities in the field.</p>
                <p>Our mission is to empower businesses with innovative tools and insights to make smarter, faster, and more efficient decisions. We believe in the power of technology to transform supply chain management, and we are dedicated to continuous improvement and customer satisfaction.</p>

                <h2>Our Team</h2>
                <div className="about-cards">
                    <div className="about-card">
                        <h3>John Doe</h3>
                        <p>CEO</p>
                        <p>John brings over 20 years of experience in the supply chain industry. His vision and leadership have been instrumental in driving the company's growth and success.</p>
                    </div>
                    <div className="about-card">
                        <h3>Jane Smith</h3>
                        <p>CTO</p>
                        <p>Jane is the tech genius behind our platform. With a background in software development and a passion for innovation, she leads our tech team to deliver cutting-edge solutions.</p>
                    </div>
                    <div className="about-card">
                        <h3>Mike Johnson</h3>
                        <p>COO</p>
                        <p>Mike oversees our operations, ensuring everything runs smoothly. His expertise in logistics and operations management is crucial to our success.</p>
                    </div>
                </div>

                <h2>Our Values</h2>
                <p>We are guided by our core values:</p>
                <ul>
                    <li>Innovation: We strive to be at the forefront of technology, constantly improving our platform to meet the evolving needs of our customers.</li>
                    <li>Customer Focus: Our customers are at the heart of everything we do. We are dedicated to providing exceptional service and support.</li>
                    <li>Integrity: We conduct our business with honesty and transparency. We build trust with our customers, partners, and team members.</li>
                    <li>Collaboration: We believe in the power of teamwork. By working together, we can achieve great things.</li>
                </ul>
            </div>
            <footer>
                <p>&copy; 2024 Your Company. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default AboutPage;
