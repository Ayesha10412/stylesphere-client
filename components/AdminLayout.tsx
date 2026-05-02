"use client";

import { useMediaQuery } from "@/hooks/useMobile";
import type React from "react";
import { useState } from "react";
import { adminRoutes } from "@/lib/routes";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import Sidebar from "./ui/Sidebar";
import Header from "./Header";
import { useSession } from "@/context/SessionProvider";
interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminCustomLayout = ({ children }: AdminLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const toggleMobileSidebar = () => setMobileOpen(!mobileOpen);
  const pathname = usePathname();
  const noLayoutRoutes = ["/not-found"];

  const isNoLayout = noLayoutRoutes.includes(pathname);
const {session}=useSession()
console.log(session)
  if (isNoLayout) {
    return (
      <div className="flex min-h-screen">
        <div className="flex flex-1 flex-col">
          <main className="flex-1 p-2 lg:p-6 bg-white">{children}</main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex overflow-hidden">
      <Toaster richColors />
      {/* Sidebar */}
      <Sidebar
        routes={adminRoutes()}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Fixed Header */}
        <Header
          onMenuClick={toggleMobileSidebar}
          showMenuButton={isMobile}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />

        {/* Scrollable Content */}
        <main className="h-[calc(100vh-64px)] overflow-y-auto p-2 lg:p-5 bg-gray-200">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminCustomLayout;