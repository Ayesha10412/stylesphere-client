"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const IndexPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("common-layout");
  }, [router]);
};

export default IndexPage;
