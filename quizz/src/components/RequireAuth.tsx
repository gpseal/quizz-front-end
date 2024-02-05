import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

type Props = {
  allowedRoles: Array<string>;
};

const RequireAuth = ({allowedRoles}: Props ) => {
    const {auth} = useAuth();
    const location = useLocation();
    return allowedRoles?.includes(auth?.role) ? (
      <Outlet />
    ) : auth?.username ? (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth