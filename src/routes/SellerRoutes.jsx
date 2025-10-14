import React, { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../component/Loading/Loading";
import useAllSeller from "../Hooks/Seller/useAllSeller";
import useSellerRole from "../Hooks/Seller/useSellerRole";

const SellerRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const { isSeller, isLoading } = useSellerRole();
  if (loading || isLoading) {
    return <Loading></Loading>;
  }
  if (user && isSeller) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SellerRoutes;
