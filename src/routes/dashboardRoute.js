import { LayoutDashboard, User, Users } from "lucide-react";
import ManageSellers from "../pages/AdminDashboard/ManageSellers";
import ManageUsers from "../pages/AdminDashboard/ManageUsers";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import Profile from "../pages/component/Profile";

export const dashboardRoutes = [
  {
    icon: LayoutDashboard,
    path: "home",
    component: AdminDashboard,
    roles: ["admin"],
    label: "Dashboard",
    showInSidebar: true,   
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
    icon: Users,
    path: "profile",
    component: Profile,
    roles: ["admin", "seller", "user"],
    label: "Profile",
    showInSidebar: false,
  },
  
];