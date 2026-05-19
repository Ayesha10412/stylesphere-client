"use client";

import { useState } from "react";
import api from "@/config/api";
import ProductForm from "./ProductForm";
import { handleApiError } from "@/helper/handleApiError";
import { CreateProductFormData } from "@/lib/schema";
import { UseFormSetError } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function AddProduct({ onSuccess }: { onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleCreate = async (
    data: CreateProductFormData,
    setError: UseFormSetError<CreateProductFormData>,
  ) => {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);

      // ✅ FIX HERE
      formData.append("price", String(Number(data.price)));

      // ✅ FIX VARIANTS
      const cleanedVariants = data.variants?.map((v) => ({
        ...v,
        stock: Number(v.stock),
      }));

      formData.append("variants", JSON.stringify(cleanedVariants));

      data.images?.forEach((file) => {
        formData.append("images", file);
      });

      await api.post("/product", formData);
      router.push("/admin-layout/product");
    } catch (error) {
      handleApiError(error, setError);
    } finally {
      setLoading(false);
    }
  };

  return <ProductForm onSubmit={handleCreate} loading={loading} />;
}
