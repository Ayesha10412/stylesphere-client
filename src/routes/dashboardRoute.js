import { User, Users } from "lucide-react";
import AdminProfile from "../pages/AdminDashboard/AdminProfile";
import ManageSellers from "../pages/AdminDashboard/ManageSellers";
import ManageUsers from "../pages/AdminDashboard/ManageUsers";
import ManageSellerProfile from "../pages/SellerDashboard/ManageSellerProfile";

export const dashboardRoutes = [
  {
    icon: User,

    path: "adminProfile",
    component: AdminProfile,
    roles: ["admin"],
    label: "Admin Profile",
  },
  {
    icon: User,
    path: "users",
    component: ManageUsers,
    roles: ["admin"],
    label: "Manage Users",
  },
  {
    icon: Users,
    path: "manageSeller",
    component: ManageSellers,
    roles: ["admin"],
    label: "Manage Seller",
  },
  {
    icon: User,
    path: "sellerProfile",
    component: ManageSellerProfile,
    roles: ["seller"],
    label: "Seller Profile",
  },
];
