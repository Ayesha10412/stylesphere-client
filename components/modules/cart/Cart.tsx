"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/config/api";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation";

interface CartItem {
  product: {
    _id: string;
    title: string;
    price: number;
    images: string[];
  };
  quantity: number;
  variant?: {
    size?: string;
    color?: string;
    stock?: string;
  };
}

export default function CartPage() {
  const router = useRouter();

  const [items, setItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart/my-cart");

      setItems(res.data.data.items || []);
      setTotalPrice(res.data.data.totalPrice || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (
    productId: string,
    quantity: number,
    variant?: { size?: string; color?: string },
  ) => {
    if (quantity < 1) return;

    try {
      const item = items.find(
        (i) =>
          i.product._id === productId &&
          i.variant?.size === variant?.size &&
          i.variant?.color === variant?.color,
      );

      if (!item) {
        console.warn("Cart item not found for update");
        return;
      }

      await api.patch(
        "/cart/update-cart-item",
        {
          productId,
          quantity,
          variant: item.variant, // safe now
        },
        { headers: { "Content-Type": "application/json" } },
      );

      await fetchCart(); // refresh UI after update
    } catch (err) {
      console.error("Failed to update cart quantity:", err);
    }
  };

  const removeItem = async (
    productId: string,
    variant?: { size?: string; color?: string },
  ) => {
    try {
      await api.delete("/cart/remove-cart-item", {
        data: {
          productId,
          variant,
        },
      });

      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-20 text-center">Loading cart...</div>
    );
  }

  if (!items.length) {
    return (
      <div className="container mx-auto py-24 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>

        <Button onClick={() => router.push("/products")}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Shopping Cart</h1>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* LEFT: CART ITEMS (3 per row) */}
        <div className="lg:col-span-3 grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.product._id}
              className="bg-white border rounded-xl p-4 flex flex-col"
            >
              {/* IMAGE */}
              <div className="relative h-40 w-full mb-3">
                <Image
                  src={
                    item.product.images?.[0]?.startsWith("http")
                      ? item.product.images[0]
                      : "/placeholder.jpg"
                  }
                  alt={item.product.title}
                  fill
                  className="object-cover rounded-lg"
                />

                {/* PRICE OVERLAY (top-right) */}
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded-md">
                  ৳ {item.product.price}
                </div>
              </div>

              {/* TITLE */}
              <h3 className="font-semibold text-lg">{item.product.title}</h3>
              {/* Colors */}
              {item.variant?.color && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-500">Color:</span>

                  <div className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full border"
                      style={{
                        backgroundColor: item.variant.color.toLowerCase(),
                      }}
                    />
                    <span className="text-xs">{item.variant.color}</span>
                  </div>
                </div>
              )}
              {item.variant?.size && (
                <div className="mt-1 text-xs text-gray-600">
                  Size: <span className="font-medium">{item.variant.size}</span>
                </div>
              )}
              {/* QUANTITY */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="bg-gray-100 text-gray-500 hover:bg-gray-200 border-none"
                    onClick={() =>
                      updateQuantity(item.product._id, item.quantity - 1)
                    }
                  >
                    <Minus size={16} />
                  </Button>

                  <span className="font-medium">{item.quantity}</span>

                  <Button
                    size="icon"
                    variant="outline"
                    className="bg-[#008080]/10 text-[#008080] border-none hover:bg-[#008080]/20"
                    onClick={() =>
                      updateQuantity(
                        item.product._id,
                        item.quantity + 1,
                        item.variant,
                      )
                    }
                  >
                    <Plus size={16} />
                  </Button>
                </div>

                {/* DELETE */}
                <Button
                  onClick={() => removeItem(item.product._id, item.variant)}
                  className="text-red-500 bg-red-100 hover:bg-red-200 border-none"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: SUMMARY */}
        <div className="lg:col-span-1">
          <div className="bg-white border rounded-xl p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-5">Order Summary</h2>

            <div className="flex justify-between mb-3">
              <span>Items</span>
              <span>{items.length}</span>
            </div>

            <div className="flex justify-between mb-3">
              <span>Subtotal</span>
              <span>৳ {totalPrice}</span>
            </div>

            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>৳ {totalPrice}</span>
            </div>

            <Button
              className="w-full mt-6 bg-[#008080] hover:bg-[#006666]"
              onClick={() => router.push("/checkout")}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
