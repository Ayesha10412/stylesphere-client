"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {   ChevronLeft, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMobile";
import ProfileDropdown from "./component/ProfileDropdown";



interface HeaderProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;

  className?: string;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
  collapsed?: boolean;
  setCollapsed?: (collapsed: boolean) => void;
}

const Header = ({
  onMenuClick,
  className,

  collapsed = false,
  setCollapsed,
}: HeaderProps) => {
  const [internalCollapsed, setInternalCollapsed] = useState(collapsed);
  const isMobile = useMediaQuery("(max-width: 768px)");


  useEffect(() => {
    setInternalCollapsed(collapsed);
  }, [collapsed]);

  const toggleCollapse = () => {
    if (setCollapsed) {
      setCollapsed(!collapsed);
    } else {
      setInternalCollapsed(!internalCollapsed);
    }
  };

  //   const toggleTheme = () => {
  //     setTheme(theme === "dark" ? "light" : "dark");
  //   };

  return (
    <header
      className={cn(
        "flex h-[64px] items-center justify-between border-b border-gray-200 bg-white px-6",
        className
      )}
    >
      <div className="flex items-center gap-4">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleCollapse}
          className={cn(
            "h-8 w-8 bg-gray-100 text-slate-700 p-0 hidden md:flex cursor-pointer",
            collapsed ? "rotate-180" : ""
          )}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* <div>
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={`${crumb.label}-${index}`}>
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {index === breadcrumbs.length - 1 || crumb.active ? (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={crumb.href || crumb.path || "#"}>
                        {crumb.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div> */}
      </div>

      <div className="flex items-center gap-4">
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative bg-gray-100 cursor-pointer"
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white">
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-white">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[...Array(3)].map((_, i) => (
              <DropdownMenuItem
                key={i}
                className="flex flex-col items-start py-2"
              >
                <div className="font-medium">New order received</div>
                <div className="text-xs text-muted-foreground">
                  Order #{1000 + i} has been placed
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {i + 1} hour{i !== 0 ? "s" : ""} ago
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center font-medium">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}

        {/* Theme Toggle */}
        {/* <Button
          variant="ghost"
          size="icon"
            onClick={toggleTheme}
          className=" bg-gray-100 cursor-pointer"
        >
          <Sun className="h-5 w-5" />
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button> */}

        {/* Profile Dropdown */}
        <ProfileDropdown/>
      </div>
    </header>
  );
};

export default Header;