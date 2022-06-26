import useAuth from "../hooks/useAuth";
import { useLocation, Navigate, Outlet } from "react-router-dom";

export default function ProtectedLayout({ allowedRole }) {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.role === allowedRole ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
