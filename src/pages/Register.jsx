import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
     const navigate =useNavigate();

   const handleRegister = async (e) => {
        e.preventDefault();
        try {
           const response = await fetch('https://backend-ecommerce-production-0cc8.up.railway.app/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
              localStorage.setItem('token', data.token);
               localStorage.setItem('userEmail', data.email);
                 localStorage.setItem('isLoggedIn', 'true');
                toast.success('تم انشاء حساب بنجاح ! تقدر تسجل دلوقتي ');
                setTimeout(() => {
                    navigate('/login');
                }, 1300);
            } else {
                alert(data.message || "خطأ في التسجيل");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("مشكلة في الاتصال بالسيرفر");
        }
    };

    return (
      
      <div className="register-page-container">
        <div className="register-card-wrapper">
          <h2>Register</h2>
          
          <form onSubmit={handleRegister}>
            <div className="register-form-group">
              <label>البريد الإلكتروني</label>
              <input
                type="email" placeholder='البريد الالكترونى'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="register-form-group">
              <label>كلمة المرور</label>
              <input
                type="password" placeholder='كلمة المرور'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
           <Toaster />
            <button type="submit" className="register-submit-btn">
              
              دخول
            </button>
          </form>
        </div>
      </div> 

);
};


export default Register;