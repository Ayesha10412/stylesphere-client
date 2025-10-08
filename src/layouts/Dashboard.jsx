import React from "react";
import useAdmin from "../Hooks/Admin/useAdmin";

const Dashboard = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  console.log("isAdmin:", isAdmin, "loading:", isAdminLoading);
  return <div>Dashboard</div>;
};

export default Dashboard;
