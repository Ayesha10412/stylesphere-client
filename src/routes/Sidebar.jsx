import { NavLink } from "react-router-dom";
import { dashboardRoutes } from "./dashboardRoute";
import useSellerRole from "../Hooks/Seller/useSellerRole";
import useAdmin from "../Hooks/Admin/useAdmin";
import useAuth from "../Hooks/useAuth";

const Sidebar = () => {
  const [isAdmin] = useAdmin();
  const { isSeller } = useSellerRole();
  const { user } = useAuth();

  let role = "user";
  if (isAdmin) role = "admin";
  else if (isSeller) role = "seller";

  const filteredRoutes = dashboardRoutes.filter((route) => route.showInSidebar &&
    route.roles.includes(role),
  );

  return (
    <div
      className="p-4 space-y-2 border-t border-gray-700"
      style={{ backgroundColor: "#111827" }}
    >
      {filteredRoutes.map((route) => {
        const Icon = route.icon;
        return (
          <NavLink
            key={route.path}
            to={`/dashboard/${route.path}`}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded transition ${
                isActive
                  ? "bg-[#7C3AED] text-white"
                  : "text-white hover:bg-[#C084FC]"
              }`
            }
          >
            {/* Icon color handled using isActive inside the same NavLink scope */}
            {Icon && (
              <Icon
                size={18}
                color={route.isActive ? "#FFFFFF" : "#C084FC"} // ❌ This is wrong
              />
            )}
            <span>{route.label}</span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default Sidebar;
