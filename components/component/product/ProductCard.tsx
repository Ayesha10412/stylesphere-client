"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import OrderButton from "./OrderButton";
import AddToCartButton from "@/components/modules/cart/AddToCartButton";

type Product = {
  _id: string;
  title: string;
  price: number;
  images: string[];
  category?: { name: string };
};

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  return (
    <div className="border rounded-xl overflow-hidden bg-white hover:shadow-md transition">
      {/* Image */}
      <img
        src={product.images?.[0] || "/placeholder.jpg"}
        className="h-52 w-full object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold line-clamp-1">{product.title}</h3>

        <p className="text-sm text-gray-500">{product.category?.name}</p>

        <p className="font-bold mt-2">৳ {product.price}</p>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          {/* Details */}
          <Button
            onClick={() => router.push(`/products/${product._id}`)}
            className="flex-1 hover:bg-gray-[#008080]/10"
          >
            Details
          </Button>
          {/* Order */}
          <div className="grid grid-cols-2 gap-2">
            <AddToCartButton productId={product._id} />
            <OrderButton productId={product._id} />
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
