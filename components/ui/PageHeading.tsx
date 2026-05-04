"use client";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useHeading } from "@/context/HeadingContext";

const PageHeading = ({
  children,
  className,
  back,
}: {
  children: ReactNode;
  className?: string;
  back?: boolean | string;
}) => {
  const router = useRouter();
  const { setHeading } = useHeading();

  const handleBack = () => {
    if (typeof back === "string") {
      router.push(back);
    } else {
      router.push("/admin-layout");
    }
  };

  const headingUI = (
    <h1
      className={`${className} text-xl text-[#008080] flex items-center gap-2`}
    >
      {back && (
        <button onClick={handleBack}>
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}
      {children}
    </h1>
  );

  useEffect(() => {
    setHeading(headingUI);

    return () => setHeading(""); // cleanup when leaving page
  }, [children]);

  return null; // ❗ no longer renders inside page
};

export default PageHeading;
