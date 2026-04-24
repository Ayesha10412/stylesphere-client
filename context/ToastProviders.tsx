"use client";

import { subscribeToast } from "@/lib/toast";
import React, { useEffect } from "react";
import { toast, Toaster } from "sonner";

export default function ToastProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    return subscribeToast(({ type, message }) => {
      toast[type](message);
    });
  }, []);
  return (
    <>
      {children}
      <Toaster richColors />
    </>
  );
}
