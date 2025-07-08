import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<App />);
}
