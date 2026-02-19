import { useLocation } from "react-router-dom";

const DashboardHeader = () => {
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.includes("adminProfile")) return "Admin Profile";
    if (location.pathname.includes("users")) return "Manage Users";
    if (location.pathname.includes("manageSeller")) return "Manage Sellers";
    if (location.pathname.includes("sellerProfile")) return "Seller Profile";
    return "Dashboard";
  };

  return (
      <div className="bg-[#F9FAFB] shadow-md px-6 py-3 flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-[#111827]">{getTitle()}</h1>
    </div>
  );
};

export default DashboardHeader;
