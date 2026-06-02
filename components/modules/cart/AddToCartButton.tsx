"use client";

import { Button } from "@/components/ui/button";
import api from "@/config/api";
import { ShoppingCart } from "lucide-react";

interface Props {
  productId: string;
}

export default function AddToCartButton({ productId }: Props) {
  const handleAddToCart = async () => {
    try {
      await api.post("/cart/add-to-cart", {
        items: [
          {
            product: productId,
            quantity: 1,
          },
        ],
      });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      className="bg-[#008080] hover:bg-[#006666]"
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      Cart
    </Button>
  );
}
