// App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import ServicesPage from './ServicesPage'; // Import the ServicesPage component
import ScrollNavbar from './ScrollNavbar';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Dashboard from './Dashboard';
import SuperAdmin from './SuperAdmin';
import Shipments from './Shipments';
import OrderTracking from './OrderTracking';
import Library from './Library';
import Products from './Products';


const App: React.FC = () => {
    return (

            <Router>
                <div>
                    <ScrollNavbar />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/services" element={<ServicesPage />} /> {/* Add the ServicesPage route */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/superadmin" element={<SuperAdmin />} />
                        <Route path="/library" element={<Library />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/ordertracking" element={<OrderTracking />} />
                        <Route path="/shipments" element={<Shipments />} />
                    </Routes>
                </div>
            </Router>

    );
}

export default App;
