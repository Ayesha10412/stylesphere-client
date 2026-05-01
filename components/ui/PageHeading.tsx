"use client";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const PageHeading = ({
  children,
  className,
  back,
}: {
  children: ReactNode;
  className?: string;
  /** Pass `true` to go back to /sena-admin, or pass a specific route string */
  back?: boolean | string;
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (typeof back === "string") {
      router.push(back);
    } else {
      router.push("/sena-admin");
    }
  };

  return (
    <h1
      className={`${className} text-xl tracking-wide text-[#1B5B34] font-medium mb-4 flex items-center gap-2`}
    >
      {back && (
        <button
          onClick={handleBack}
          aria-label="Go back"
          className="inline-flex items-center justify-center text-[#1B5B34] hover:text-[#14452a] hover:bg-[#1B5B34]/10 rounded-md p-0.5 transition-colors duration-150"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
        </button>
      )}
      {children}
    </h1>
  );
};

export default PageHeading;