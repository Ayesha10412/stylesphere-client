"use client";

import { useState } from "react";

import api from "@/config/api";

import ProductForm from "./ProductForm";
import { Product } from "@/types/data";
import { CreateProductFormData } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { handleApiError } from "@/helper/handleApiError";

type Props = {
  product: Product;

  refetch: () => void;

  onClose: () => void;
};

export default function EditProduct({ product, refetch, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const { setError } = useForm();
  const handleUpdate = async (data: CreateProductFormData) => {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", data.title);

      formData.append("description", data.description);

      formData.append("price", String(data.price));

      formData.append("category", data.category);

      formData.append("variants", JSON.stringify(data.variants));

      if (data.images?.length) {
        data.images.forEach((file: File) => {
          formData.append("images", file);
        });
      }

      await api.patch(`/product/${product._id}`, formData);

      refetch();

      onClose();
    } catch (error) {
      handleApiError(error, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductForm
      defaultValues={{
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        variants: product.variants,
      }}
      onSubmit={handleUpdate}
      loading={loading}
    />
  );
}
