import React from "react";
import useAdmin from "../Hooks/Admin/useAdmin";
import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaUsersCog } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import Loading from "../component/Loading/Loading";
import { UserCog } from "lucide-react";
import useSellerRole from "../Hooks/Seller/useSellerRole";

const Dashboard = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  console.log("isAdmin:", { isAdmin }, "loading:", isAdminLoading);

  const { user, loading } = useAuth();
  const { isSeller, isLoading } = useSellerRole();
  console.log(isSeller);
  if (isAdminLoading || isLoading || loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="flex mt-14 ">
      {/* Dashboard Sidebar */}
      <div className="w-72 min-h-screen text-[#ffffffe2]  font-semibold bg-[#0f162a75] mt-14">
        <ul className="menu p-4 ">
          {/* Admin Dashboard */}
          {isAdmin && (
            <>
              <li className="mb-2 mt-2.5">
                <NavLink
                  to="/dashboard/adminProfile"
                  className="flex items-center gap-2"
                >
                  <UserCog className="text-lg" />
                  Manage Profile
                </NavLink>
              </li>
              <li className="mb-2 mt-2.5">
                <NavLink to="users" className="flex items-center gap-2">
                  <FaUsersCog className="text-lg" />
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="manageSeller" className="flex items-center gap-2">
                  <FaUsersCog className="text-lg" /> Manage Seller
                </NavLink>
              </li>
            </>
          )}

          {/* Seller Dashboard (only if NOT Admin) */}
          {isSeller && !isAdmin && (
            <>
              <li className="mb-2 mt-2.5">
                <NavLink
                  to="/dashboard/sellerProfile"
                  className="flex items-center gap-2"
                >
                  <UserCog className="text-lg" />
                  Manage Profile
                </NavLink>
              </li>
            </>
          )}

          {/* Regular User Dashboard (if NOT Admin and NOT Seller) */}
          {!isAdmin && !isSeller && user && <></>}

          {/* Shared Links for All Users */}
          <div className="divider"></div>
          <li>
            <NavLink to="/" className="flex items-center gap-2">
              <FaHome className="text-lg"></FaHome>
              Home
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
