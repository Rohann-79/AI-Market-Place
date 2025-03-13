import './polyfills';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css'; // If you have global styles

const container = document.getElementById('root');
if (!container) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);