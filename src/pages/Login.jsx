import React, { useState } from 'react';

import { toast, Toaster } from 'react-hot-toast';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    // Login.jsx
const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://backend-ecommerce-production-0cc8.up.railway.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('isLoggedIn', 'true');
        toast.success( ' تم تسجيل الدخول بنجاح!');
          setTimeout(() => {
                    
           window.location.href='/'; },1000);
       
      } else {
        alert(data.message || "خطأ في تسجيل الدخول");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("حدث خطأ في الاتصال بالسيرفر");
    }
  };
    return (
       
    <div className="home-page-container"> {/* استخدمنا نفس كلاس أو ستايل الصفحة الرئيسية */}
      <div className="login-card-wrapper">
        <h2>Login</h2>
        
        <form onSubmit={handleLogin}>
          <div className="login-form-group">
            <label>البريد الإلكتروني</label>
            <input
              type="email" placeholder='البريد الالكترونى' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-form-group">
            <label>كلمة المرور</label>
            <input
              type="password" placeholder='كلمة المرور' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
           <Toaster />
          <button type="submit" className="login-submit-btn">
            دخول
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login