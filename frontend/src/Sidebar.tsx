import React from 'react';
import './Sidebar.css'; // Optional: Create a CSS file for sidebar styling

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li><a href="#">Super Admin</a></li>
        <li><a href="#">Order Tracking</a></li>
        <li><a href="#">RFQ</a></li>
        <li><a href="#">Products</a></li>
        <li><a href="#">Shipment</a></li>
        <li><a href="#">Library</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
