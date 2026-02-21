import { LayoutDashboard, User, Users } from "lucide-react";
import AdminProfile from "../pages/AdminDashboard/AdminProfile";
import ManageSellers from "../pages/AdminDashboard/ManageSellers";
import ManageUsers from "../pages/AdminDashboard/ManageUsers";
import ManageSellerProfile from "../pages/SellerDashboard/ManageSellerProfile";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";

export const dashboardRoutes = [
  {
    icon: LayoutDashboard,
    path: "",
    component: AdminDashboard,
    roles: ["admin"],
    label: "Dashboard",
    showInSidebar: true,   
  },
  {
    icon: User,
    path: "profile",
    component: AdminProfile,
    roles: ["admin"],
    label: "Admin Profile",
    showInSidebar: false,   
  },
  {
    icon: User,
    path: "users",
    component: ManageUsers,
    roles: ["admin"],
    label: "Manage Users",
    showInSidebar: true,
  },
  {
    icon: Users,
    path: "manageSeller",
    component: ManageSellers,
    roles: ["admin"],
    label: "Manage Seller",
    showInSidebar: true,
  },
  {
    icon: User,
    path: "sellerProfile",
    component: ManageSellerProfile,
    roles: ["seller"],
    label: "Seller Profile",
    showInSidebar: false,   // 👈 ADD THIS
  },
];