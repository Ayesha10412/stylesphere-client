import { NavLink } from "react-router-dom";
import { dashboardRoutes } from "./dashboardRoute";
import useSellerRole from "../Hooks/Seller/useSellerRole";
import useAdmin from "../Hooks/Admin/useAdmin";
import useAuth from "../Hooks/useAuth";
import { Logout } from "../lib/Logout";
import { HomeIcon } from "lucide-react";

const Sidebar = () => {
  const [isAdmin] = useAdmin();
  const { isSeller } = useSellerRole();
  const { user } = useAuth();

  let role = "user";
  if (isAdmin) role = "admin";
  else if (isSeller) role = "seller";

  const filteredRoutes = dashboardRoutes.filter(
    (route) => route.showInSidebar && route.roles.includes(role),
  );

  return (

    <div className="p-4 space-y-2" style={{ backgroundColor: "#111827" }}>
      {/* DASHBOARD ROUTE */}
      <NavLink
        to="/dashboard/home"
        end
        className={({ isActive }) =>
          `flex items-center gap-2 p-2 rounded transition border-b border-gray-700 ${
            isActive
              ? "bg-[#7C3AED] text-white"
              : "text-white hover:bg-[#C084FC]"
          }`
        }
      >
        {({ isActive }) => (
          <>
            {/* <DashboardIcon size={18} color={isActive ? "#FFFFFF" : "#C084FC"} /> */}
            <span>Dashboard</span>
          </>
        )}
      </NavLink>

      {/* OTHER DASHBOARD ROUTES */}
      {filteredRoutes.map((route) => {
        const Icon = route.icon;

        return (
          <NavLink
            key={route.path}
            to={`/dashboard/${route.path}`}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded transition border-b border-gray-700 ${
                isActive
                  ? "bg-[#7C3AED] text-white"
                  : "text-white hover:bg-[#C084FC]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {Icon && (
                  <Icon size={18} color={isActive ? "#FFFFFF" : "#C084FC"} />
                )}
                <span>{route.label}</span>
              </>
            )}
          </NavLink>
        );
      })}

      {/* Divider */}
      <div className="border-t border-gray-600 my-3"></div>

      {/* HOME (separate route) */}
      <NavLink
        to="/home"
        className={({ isActive }) =>
          `flex items-center gap-2 p-2 rounded transition-colors duration-200 ${
            isActive
              ? "bg-purple-600 text-white"
              : "text-purple-400 hover:bg-purple-100 hover:text-purple-600"
          }`
        }
      >
        <HomeIcon size={18} className="text-current" />
        <span>Home</span>
      </NavLink>

      <Logout className="flex items-center gap-2 p-2 w-full text-white hover:bg-red-500 rounded transition" />
    </div>
  );
};

export default Sidebar;
