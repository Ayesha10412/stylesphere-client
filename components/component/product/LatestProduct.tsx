"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/config/api";
import ProductCard from "../product/ProductCard";
import { Button } from "@/components/ui/button";

type Product = {
  _id: string;
  title: string;
  price: number;
  images: string[];
  category?: { name: string };
};

export default function LatestProductsSection() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const res = await api.get("/product?limit=10");
        setProducts(res?.data?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-12 container mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Latest Products</h2>

        <Button
          onClick={() => router.push("/common-layout/product")}
          className="text-sm px-4 py-2 rounded bg-[#008080] text-white hover:bg-gray-800"
        >
          View All
        </Button>
      </div>

      {/* Loading */}
      {loading && <div className="grid grid-cols-4 gap-4">Loading...</div>}

      {/* Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
