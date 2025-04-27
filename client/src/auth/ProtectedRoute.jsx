import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const alertShown = useRef(false); // Prevent multiple toasts

  useEffect(() => {
    if (!token && !alertShown.current) {
      alertShown.current = true;
      toast.error("You need to log-in to access this page!");
    }
  }, [token]);

  if (!token) return <Navigate to="/signin" />;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      if (!alertShown.current) {
        alertShown.current = true;
        toast.error("Session expired. Please log in again.");
      }
      localStorage.removeItem("token");
      return <Navigate to="/signin" />;
    }

    return <Outlet />;
  } catch (error) {
    if (!alertShown.current) {
      alertShown.current = true;
      toast.error("Invalid session. Please log in again.");
    }
    localStorage.removeItem("token");
    return <Navigate to="/signin" />;
  }
};

export default ProtectedRoute;