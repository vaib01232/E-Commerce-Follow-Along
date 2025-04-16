import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children }) {
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);
  const loginSuccessful = useSelector((state) => state.auth.loginSuccessful);

  const isAuthenticated = token && loginSuccessful;

  return isAuthenticated
    ? children
    : <Navigate to={`/login?redirect=${location.pathname}`} />;
}

export default PrivateRoute;
