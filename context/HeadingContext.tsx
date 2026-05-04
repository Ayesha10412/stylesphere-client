"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface HeadingContextType {
  heading: ReactNode;
  setHeading: (heading: ReactNode) => void;
}

const HeadingContext = createContext<HeadingContextType | null>(null);

export const HeadingProvider = ({ children }: { children: ReactNode }) => {
  const [heading, setHeading] = useState<ReactNode>("");

  return (
    <HeadingContext.Provider value={{ heading, setHeading }}>
      {children}
    </HeadingContext.Provider>
  );
};

export const useHeading = () => {
  const context = useContext(HeadingContext);
  if (!context) throw new Error("useHeading must be used within HeadingProvider");
  return context;
};