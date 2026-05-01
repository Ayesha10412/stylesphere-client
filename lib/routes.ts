import { LayoutDashboard } from "lucide-react";


export const adminRoutes = () => [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin-layout",
    active: true,
    permissions:[ "all"],
    roles: ["all"],
  },
 
];