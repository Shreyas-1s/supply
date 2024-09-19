import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // Assuming you have some global styles

const container = document.getElementById('root');
const root = createRoot(container!); // Use the createRoot method

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
