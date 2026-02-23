import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useUserEmail = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: userEmail, isLoading ,refetch} = useQuery({
    queryKey: ["userEmail", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiosSecure.get(`/user/${user.email}`);
      return result.data;
    },
  });

  return [userEmail, isLoading,refetch];
};

export default useUserEmail;
