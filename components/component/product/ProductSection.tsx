"use client";

import { useEffect, useState } from "react";
import api from "@/config/api";
import ProductCard from "./ProductCard";

export default function ProductsSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const res = await api.get("/product");
      setProducts(res?.data?.data || []);
    };

    fetchAll();
  }, []);

  return (
    <div className="container mx-auto py-10 mt-12">
      <h1 className="text-2xl font-bold mb-6 text-[#008080] text-center">All Products</h1>

      <div className="grid grid-cols-4 gap-4">
        {products.map((p: any) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
