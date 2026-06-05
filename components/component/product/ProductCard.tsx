"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import AddToCartButton from "@/components/modules/cart/AddToCartButton";
import AddToWishlist from "@/components/modules/wishlist/AddToWishlist";
import { useState } from "react";

type Product = {
  _id: string;
  title: string;
  price: number;
  images: string[];
  category?: { name: string };
  variants?: { size?: string; color?: string }[];
};

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState<string>();
    const [selectedSize, setSelectedSize] = useState<string>();
    const selectedVariant =
      selectedColor && selectedSize
        ? {
            color: selectedColor,
            size: selectedSize,
          }
        : undefined;
  return (
    <div className="border rounded-xl overflow-hidden bg-white hover:shadow-md transition">
      {/* IMAGE WRAPPER (IMPORTANT) */}
      <div className="relative">
        <img
          src={product.images?.[0] || "/placeholder.jpg"}
          className="h-52 w-full object-cover"
        />

        {/* WISHLIST BUTTON GOES HERE */}
        <div className="absolute top-2 right-2">
          <AddToWishlist productId={product._id} />
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold line-clamp-1">{product.title}</h3>

        <p className="text-sm text-gray-500">{product.category?.name}</p>

        <p className="font-bold mt-2">৳ {product.price}</p>
        <div className="mt-2">
          <p className="text-xs text-gray-500">Color</p>

          <div className="flex gap-2 mt-1">
            {product.variants?.map((v, i) => (
              <button
                key={i}
                onClick={() => setSelectedColor(v.color)}
                className={`w-5 h-5 rounded-full border ${
                  selectedColor === v.color ? "border-black scale-110" : ""
                }`}
                style={{ backgroundColor: v.color?.toLowerCase() }}
              />
            ))}
          </div>
        </div>
        <div className="mt-2">
          <p className="text-xs text-gray-500">Size</p>

          <div className="flex gap-2 mt-1">
            {product.variants?.map((v, i) => (
              <button
                key={i}
                onClick={() => setSelectedSize(v.size)}
                className={`px-2 py-1 text-xs border rounded ${
                  selectedSize === v.size ? "bg-black text-white" : "bg-white"
                }`}
              >
                {v.size}
              </button>
            ))}
          </div>
        </div>
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
          <AddToCartButton
            productId={product._id}
            selectedVariant={selectedVariant}
          />{" "}
        </div>
      </div>
    </div>
  );
}
