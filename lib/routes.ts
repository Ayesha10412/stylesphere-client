import { LayoutDashboard, Users } from "lucide-react";


export const adminRoutes = () => [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin-layout",
    active: true,
    permissions:[ "all"],
    roles: ["all"],
  },
  {
    icon: Users,
    label: "Users",
    href: "/admin-layout/user",
    permissions:[ "all"],
    roles: ["all"],
  },
  
 
];