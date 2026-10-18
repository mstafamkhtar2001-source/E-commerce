// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { logo } from './AppRoutes';
import Home from './pages/Home';
import Men from './pages/Men';
import Women from './pages/Women';
import './index.css';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { InvoiceProvider } from './contexxt/InvoiceContext';
import Accounting from './pages/Accounting';
import ManageInvoices from './pages/ManageInvoices';
import Login from './pages/Login';
import ProtectedRoute from './contexxt/protectedRoute';
import Register from './pages/Register';
import AdminRoute from './contexxt/AdminRoute';
import { CartProvider } from './contexxt/CartContext';
import Admindashboard from './pages/Admindashboard';
import AiAssistant from './pages/AiAssistant';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    window.location.href = '/Register';
  };
  const userEmail = localStorage.getItem('userEmail');
  const isAuthorized = userEmail && userEmail.endsWith('hm@gmail.com');


  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  

  
  return (
    <InvoiceProvider>
      <CartProvider>
        {/* الهيدر لوحده تماماً */}
        <header className="main-header">
          <img src={logo} alt="Logo" className="logo-img" />

          <div className="nav-links">
            <Link to="/">HOME</Link>
            <Link to="/Cart">CART</Link>
            <Link to="/checkout">CHECKOUT</Link>
          </div>

          <div className="custom-dropdown-container">
            <button
              className="dropdown-toggle-btn"
              onClick={() => setIsOpen(!isOpen)}
            >
              القائمة الرئيسية ▾
            </button>

            {isOpen && (
              <div className="custom-dropdown-menu">
                <div onClick={() => { window.location.href = '/men'; setIsOpen(false); }}>MEN'S</div>
                <div onClick={() => { window.location.href = '/women'; setIsOpen(false); }}>WOMEN'S</div>
                
                {isAuthorized && (
                  <>
                    <div onClick={() => { window.location.href = '/Accounting'; setIsOpen(false); }}>Accounting</div>
                    <div onClick={() => { window.location.href = '/ManageInvoices'; setIsOpen(false); }}>ManageInvoices</div>
                     <div onClick={() => { window.location.href = '/Admindashboard'; setIsOpen(false); }}>Admindashboard</div>
                      <div onClick={() => { window.location.href = '/AiAssistant'; setIsOpen(false); }}>AiAssistant</div>
                  </>
                )}

                <div onClick={() => { window.location.href = '/Login'; setIsOpen(false); }}>Login</div>
                <div onClick={() => { window.location.href = '/Register'; setIsOpen(false); }}>Register</div>
                
                <div
                  onClick={() => { setIsOpen(false); handleLogout(); }}
                  style={{ color: '#ff4d4d', fontWeight: 'bold', borderTop: '1px solid #eee', cursor: 'pointer' }}
                >
                  تسجيل خروج
                </div>
              </div>
            )}
          </div>
        </header>

        {/* كونتنت الصفحات والروتر في ديف منفصل تحته مباشرة */}
        <div className="home-container">
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/men" element={<ProtectedRoute><Men /></ProtectedRoute>} />
            <Route path="/women" element={<ProtectedRoute><Women /></ProtectedRoute>} />
            <Route path="/product/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/Accounting" element={<AdminRoute><Accounting /></AdminRoute>} />
            <Route path="/ManageInvoices" element={<AdminRoute><ManageInvoices /></AdminRoute>} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Admindashboard" element={<AdminRoute><Admindashboard /></AdminRoute>} />
            <Route path="/AiAssistant" element={<AiAssistant />} />
          </Routes>
        </div>

      </CartProvider>
    </InvoiceProvider>
  );
}