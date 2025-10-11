import React, { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../component/Loading/Loading";
import useAllSeller from "../Hooks/Seller/useAllSeller";

const SellerRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const [sellers, isSellerLoading] = useAllSeller();
  if (loading || isSellerLoading) {
    return <Loading></Loading>;
  }
  if (user && sellers) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SellerRoutes;
