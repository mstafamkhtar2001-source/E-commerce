import React from 'react';
import ReactDOM from 'react-dom/client';
 // 1. استدعي الـ BrowserRouter
import App from './App.jsx';
import './index.css';
import { CartProvider } from './contexxt/CartContext.jsx';
import { BrowserRouter } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <React.StrictMode>
   
      <CartProvider>
        <App />
      </CartProvider>
    
  </React.StrictMode>
  </BrowserRouter>
);
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker registered!'))
      .catch(err => console.log('Service Worker registration failed', err));
  });
}
 