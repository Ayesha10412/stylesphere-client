"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useState } from "react";

interface Props {
  productId: string;
}

export default function AddToWishlist({ productId }: Props) {
  const [liked, setLiked] = useState(false);

  const toggleWishlist = async () => {
    try {
      setLiked(!liked);

      // TODO: backend API
      // await api.post("/wishlist/toggle", { productId });

      console.log("wishlist:", productId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      size="icon"
      onClick={toggleWishlist}
      className={`
        rounded-full shadow-md bg-white hover:bg-white
      `}
    >
      <Heart
        size={18}
        className={liked ? "text-red-500 fill-red-500" : "text-gray-500"}
      />
    </Button>
  );
}
