import React from "react";
import useAxiosSecure from "../useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin, isPending = isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading,
    queryFn: async () => {
      const res = axiosSecure.get(`/user/admin/${user?.email}`);
      return res.data?.isAdmin;
    },
  });
  return [isAdmin, isPending];
};

export default useAdmin;
