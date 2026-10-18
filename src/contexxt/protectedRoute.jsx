import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    // لو مش مسجل دخول، رجعه لصفحة الـ Login
    return isLoggedIn ? children : <Navigate to="/Register" />;
};

export default ProtectedRoute;