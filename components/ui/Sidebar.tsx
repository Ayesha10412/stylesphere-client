"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";
import brandLogo from "@/assets/icons/logo.png";
import Image from "next/image";
import { useSession } from "@/context/SessionProvider";
import { useMediaQuery } from "@/hooks/useMobile";

/* --------------------------
   🔹 Types
-------------------------- */
interface SidebarRoute {
  icon: React.ElementType;
  label: string;
  href?: string;
  active?: boolean;
  permissions?: string[];
  roles?: string[];
  subItems?: SidebarRoute[];
}

interface SidebarProps {
  routes: SidebarRoute[];
  user?: {
    name: string;
    email: string;
    image?: string;
    fallback?: string;
  };
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
  collapsed?: boolean;
  setCollapsed?: (collapsed: boolean) => void;
}

/* --------------------------
   🔹 Utils
-------------------------- */

// Check access by permissions & roles
function hasAccess(
  routePerms: string[] = [],
  routeRoles: string[] = [],
  userPerms: string[] = [],
  userRoles: string[] = [],
): boolean {
  // ✅ Permissions check
  const hasPerms =
    routePerms.length === 0 ||
    routePerms.includes("all") ||
    routePerms.every((perm) => userPerms.includes(perm));

  // ✅ Roles check
  const hasRoles =
    routeRoles.length === 0 ||
    routeRoles.includes("all") ||
    routeRoles.some((role) => userRoles.includes(role));

  return hasPerms && hasRoles;
}

// Process routes & subroutes
function processRoutes(
  routes: SidebarRoute[],
  userPermissions: string[],
  userRoles: string[],
  pathname: string,
): SidebarRoute[] {
  return routes
    .filter((route) =>
      hasAccess(route.permissions, route.roles, userPermissions, userRoles),
    )
    .map((route) => {
      const isRouteActive = pathname === route.href;
      let hasActiveChild = false;

      const processedSubItems = route.subItems
        ?.filter((sub) =>
          hasAccess(sub.permissions, sub.roles, userPermissions, userRoles),
        )
        .map((sub) => {
          const isActive = pathname === sub.href;
          if (isActive) hasActiveChild = true;
          return { ...sub, active: isActive };
        });

      return {
        ...route,
        active: isRouteActive || hasActiveChild,
        subItems: processedSubItems,
      };
    });
}

/* --------------------------
   🔹 Sidebar Component
-------------------------- */
const Sidebar = ({
  routes,
  user = {
    name: "Admin User",
    email: "admin@example.com",
    fallback: "AU",
  },
  mobileOpen = false,
  setMobileOpen,
  collapsed = false,
}: SidebarProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const pathname = usePathname();

  const { session } = useSession();
  const userPermissions = session?.permission_names || [];
  // Map userRoles to an array of role names (strings)
  const userRoles = Array.isArray(session?.role)
    ? session.role.map((role: { id: number; name: string }) => role.name)
    : [];

  const toggleMobile = () => setMobileOpen?.(!mobileOpen);
  const isCollapsed = collapsed;
  const processedRoutes = processRoutes(
    routes,
    userPermissions,
    userRoles,
    pathname,
  );

  return (
    <TooltipProvider>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-white text-black transition-all duration-300 ease-in-out md:relative md:translate-x-0 shadow",
          isMobile && !mobileOpen ? "-translate-x-full" : "translate-x-0",
          isCollapsed ? "w-16" : "w-[224px]",
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center h-[63px] border-b justify-center border-gray-200">
          {!isCollapsed &&  (
            <div className="flex flex-row justify-center items-center">
              <Image
                src={brandLogo}
                alt="logo"
                className="object-contain"
                height={40}
                width={50}
                priority
              />
            </div>
          )}
          {isCollapsed && (
            <Image
              src={brandLogo}
              alt="logo"
              className="px-2 object-contain"
              height={50}
              width={50}
              priority
            />
          )}
          {isMobile && !isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobile}
              className="md:hidden"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Scrollable Nav */}
        <ScrollArea className="h-[calc(100vh-63px)]">
          <div className={cn("py-4", isCollapsed ? "px-1" : "px-3")}>
            <div className="space-y-1 text-gray-900">
              {processedRoutes.map((route, index) => (
                <SidebarItem
                  key={index}
                  icon={route.icon}
                  label={route.label}
                  active={route.active}
                  collapsed={isCollapsed}
                  href={route.href}
                  subItems={route.subItems}
                />
              ))}
            </div>
          </div>
        </ScrollArea>

        {/* User Profile */}
        {user && (
          <div
            className={cn(
              "absolute bottom-0 w-full border-t border-slate-700",
              isCollapsed ? "p-2 flex justify-center" : "p-4",
            )}
          >
            {isCollapsed ? (
              <Avatar>
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{user.fallback}</AvatarFallback>
              </Avatar>
            ) : (
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>{user.fallback}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-slate-400">{user.email}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </aside>
    </TooltipProvider>
  );
};

export default Sidebar;
