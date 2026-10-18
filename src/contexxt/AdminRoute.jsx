// AdminRoute.jsx
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const userEmail = localStorage.getItem('userEmail');
  const isAuthorized = userEmail && userEmail.endsWith('hm@gmail.com');
// هنا بتحمى الصفحة  ذات نفسها لو حد كتبها فى المتصفح
  return isAuthorized ? children : <Navigate to="/" />; // لو مش هو، رجعه للرئيسية
};
export default AdminRoute;