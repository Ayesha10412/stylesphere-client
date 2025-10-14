import React from "react";
import useAllSeller from "./useAllSeller";
import useAuth from "../useAuth";

const useSellerRole = () => {
  const [sellers, , isSellerLoading] = useAllSeller();
  const { user, loading } = useAuth();
  const isLoading = loading || isSellerLoading;
  const isSeller =
    !isLoading && user
      ? sellers?.some((seller) => seller.email === user.email)
      : false;
  console.log("isSeller", isSeller);
  return { isSeller, isLoading };
};

export default useSellerRole;
