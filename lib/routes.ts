import { LayoutDashboard, StopCircle, Store, StoreIcon, User2, Users } from "lucide-react";


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
  {
    icon: User2,
    label: "Sellers",
    href: "/admin-layout/seller",
    permissions:[ "all"],
    roles: ["all"],
  },
  {
    icon: Store,
    label: "Store",
    href: "/admin-layout/store",
    permissions:[ "all"],
    roles: ["all"],
  },
  {
    icon: StoreIcon,
    label: "My Store",
    href: "/admin-layout/store/mystore",
    permissions:[ "all"],
    roles: ["all"],
  },
  {
    icon: Users,
    label: "Product",
    href: "/admin-layout/product",
    permissions:[ "all"],
    roles: ["all"],
  },
  
 
];