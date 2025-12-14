import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import AuthContext from "../contexts/AuthContext";
import { Loader } from "lucide-react";
import LoaderSpinner from "../components/shared/LoaderSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <LoaderSpinner></LoaderSpinner>;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
