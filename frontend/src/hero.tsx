import React from 'react';
import './heroStyles.css';

const Hero: React.FC = () => {
    return (
        <div className="hero-image">
            <div className="hero-text">
                <h1>Optimize Your Supply Chain for Efficiency and Growth</h1>
                <p>Streamline operations, track shipments, and manage inventory with ease.</p>
                <button className="ghost-button">Learn More</button>
            </div>
        </div>
    );
}

export default Hero;
