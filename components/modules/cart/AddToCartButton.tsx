"use client";

import { Button } from "@/components/ui/button";
import api from "@/config/api";
import { useCart } from "@/context/CartProvider";
import { useSession } from "@/context/SessionProvider";
import { ShoppingCart } from "lucide-react";

interface Props {
  productId: string;
}

export default function AddToCartButton({ productId }: Props) {
  const { session } = useSession();
    const { addToGuestCart, refreshCart } = useCart();

  
  const handleAddToCart = async () => {
    if (!session) {
    //   const cart = JSON.parse(localStorage.getItem("guestCart") || "[]");

    //   cart.push({
    //     product: productId,
    //     quantity: 1,
    //   });

    //   localStorage.setItem("guestCart", JSON.stringify(cart));
  addToGuestCart({
    product: productId,
    quantity: 1,
  });
      await refreshCart();

      return;
    }

    await api.post("/cart/add-to-cart", {
      items: [
        {
          product: productId,
          quantity: 1,
        },
      ],
    });

    await refreshCart();
  };

  return (
    <Button
      onClick={handleAddToCart}
      className="flex-1 bg-[#008080] hover:bg-[#006666]"
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      Cart
    </Button>
  );
}
