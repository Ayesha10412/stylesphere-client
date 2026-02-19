import { Navigate } from "react-router-dom";
import useAdmin from "../Hooks/Admin/useAdmin";
import useSellerRole from "../Hooks/Seller/useSellerRole";
import Loading from "../component/Loading/Loading";
import useAuth from "../Hooks/useAuth";


const RoleRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const { isSeller, isSellerLoading } = useSellerRole();

  if (loading || isAdminLoading || isSellerLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Detect role
  let role = "user";
  if (isAdmin) role = "admin";
  else if (isSeller) role = "seller";

  // Check permission
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
};

export default RoleRoute;
