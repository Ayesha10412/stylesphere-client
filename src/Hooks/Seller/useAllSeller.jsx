import React from "react";
import useAxiosSecure from "../useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAllSeller = () => {
  const axiosSecure = useAxiosSecure();
  const { data: sellers = [], refetch } = useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/sellers");
      return res.data;
    },
  });
  return [sellers, refetch];
};

export default useAllSeller;
