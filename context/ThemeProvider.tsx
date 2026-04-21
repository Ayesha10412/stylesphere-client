"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type ThemeContextType = {
  sidebarWidth: number;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarWidth: (width: number) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarWidth, setSidebarWidth] = useState<number>(240); // default width
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
    setSidebarWidth((prev) => (prev === 240 ? 80 : 240)); // adjust width on collapse
  };

  return (
    <ThemeContext.Provider
      value={{
        sidebarWidth,
        isSidebarCollapsed,
        toggleSidebar,
        setSidebarWidth,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// ✅ Custom hook for consuming theme context
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
