"use client";

import { Button } from "@/components/ui/button";
import api from "@/config/api";
import { useCart } from "@/context/CartProvider";
import { useSession } from "@/context/SessionProvider";
import { ShoppingCart } from "lucide-react";

interface Props {
  productId: string;
  selectedVariant?: {
    size?: string;
      color?: string;
    stock?: string;
  };
  onError?:(msg:string)=>void
}
export default function AddToCartButton({ productId, selectedVariant,onError }: Props) {
  const { session } = useSession();
  const { addToGuestCart, refreshCart } = useCart();

  // const handleAddToCart = async () => {
  //   if (!session) {
     
  //     addToGuestCart({
  //       product: productId,
  //       quantity: 1,
  //       variant: selectedVariant, // ✅ ADD THIS
  //     });
  //     await refreshCart();

  //     return;
  //   }

  //   await api.post("/cart/add-to-cart", {
  //     items: [
  //       {
  //         product: productId,
  //         quantity: 1,
  //         variant: selectedVariant, // ✅ ADD THIS
  //       },
  //     ],
  //   });

  //   await refreshCart();
  // };
const handleAddToCart = async () => {
  if (!selectedVariant?.size || !selectedVariant?.color) {
    onError?.("Please select size and color");
    return;
  }

  onError?.(""); // clear error

  if (!session) {
    addToGuestCart({
      product: productId,
      quantity: 1,
      variant: selectedVariant,
    });

    await refreshCart();
    return;
  }

  await api.post("/cart/add-to-cart", {
    items: [
      {
        product: productId,
        quantity: 1,
        variant: selectedVariant,
      },
    ],
  });

  await refreshCart();
};
  return (
    <>
      <Button
        onClick={handleAddToCart}
        className="flex-1 bg-[#008080] hover:bg-[#006666]"
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        Cart
      </Button>
    </>
  );
}
