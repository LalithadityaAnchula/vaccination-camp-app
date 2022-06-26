import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Loader from "./shared/Loader";

const PrivateRoute = ({ allowedRole }) => {
  const { auth, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Loader />;
  }
  console.log("hello protected", auth);

  return auth?.role === allowedRole ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
