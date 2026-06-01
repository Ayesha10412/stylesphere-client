"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "@/context/SessionProvider";
import { useRouter } from "next/navigation";

type Props = {
  productId: string;
};

export default function OrderButton({ productId }: Props) {
  const router = useRouter();

const { session, loading } = useSession();

const handleOrder = () => {
  // 🚨 wait until session is ready
  if (loading) return;

  if (!session) {
    router.push(`/auth/signin?redirect=/admin-layout/order/${productId}`);
    return;
  }

  router.push(`/admin-layout/order/${productId}`);
};
  return (
    <Button
      onClick={handleOrder}
      className="flex-1 bg-[#008080] hover:bg-[#006666] text-white"
    >
      Order Now
    </Button>
  );
}
