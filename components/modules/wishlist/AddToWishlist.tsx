"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface Props {
  productId: string;
}

export default function WishlistButton({ productId }: Props) {
  const handleWishlist = async () => {
    console.log("wishlist:", productId);

    // API call later
    // await api.post("/wishlist", { productId });
  };

  return (
    <Button
      size="icon"
      variant="secondary"
      onClick={handleWishlist}
      className="rounded-full bg-white shadow-md"
    >
      <Heart size={18} />
    </Button>
  );
}
