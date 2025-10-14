import React from "react";
import useAxiosSecure from "../useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";

const useSellerEmail = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: seller = {}, refetch } = useQuery({
    queryKey: [user?.email, "seller"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/seller/profile/${user.email}`);
      console.log(res);
      return res.data;
    },
  });
  return [seller, refetch];
};

export default useSellerEmail;
