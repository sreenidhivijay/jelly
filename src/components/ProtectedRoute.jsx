import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUser } from '../providers/UserContext';

function ProtectedRoute({ allowedRoles }) {
  const { user } = useUser();
  const location = useLocation();

  if (!user.isLoggedIn) {
    return <Navigate to="/login" state={{ redirectTo: location.pathname }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
