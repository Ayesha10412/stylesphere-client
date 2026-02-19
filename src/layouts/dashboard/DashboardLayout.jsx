import React from "react";
import { Outlet } from "react-router-dom";
import useAdmin from "../../Hooks/Admin/useAdmin";

import Loading from "../../component/Loading/Loading";
import useSellerRole from "../../Hooks/Seller/useSellerRole";
import DashboardHeader from "./DashboardHeader";
import useAuth from "../../Hooks/useAuth";
import Sidebar from "../../routes/Sidebar";
import logo from "../../assets/logo.png";
const DashboardLayout = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const { isSeller, isLoading } = useSellerRole();
  const { loading } = useAuth();

  if (isAdminLoading || isLoading || loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex bg-[#F9FAFB]">
      {" "}
      {/* Main background */}
      {/* Sidebar */}
      <div className="w-64 bg-[#111827] text-white">
        <div className="flex justify-center items-center gap-4">
          <img src={logo} alt="Logo" className="w-16 h-16" />
          <h2 className="text-2xl">
            <span className="text-white">Style</span>
            <span className="text-[#7C3AED]">Sphere</span>
          </h2>
        </div>
        <Sidebar /> {/* Sidebar links already have active & hover colors */}
      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <DashboardHeader />{" "}
        {/* You can style header bg as #F9FAFB and text #111827 */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
