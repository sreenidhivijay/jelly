import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../providers/UserContext";

function PublicOnlyRoute() {
  const { user } = useUser();

  if (user && ["brand@demo.com", "creator@demo.com"].includes(user.email))
    return <Outlet />;

  if (user.isLoggedIn) {
    if (user.role === "creator")
      return <Navigate to="/creator-dashboard" replace />;
    if (user.role === "brand") return <Navigate to="/brand-profile" replace />;
    if (user.role === "admin") return <Navigate to="/admin" replace />;
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default PublicOnlyRoute;
