"use client";

import { useState } from "react";

import api from "@/config/api";

import ProductForm from "./ProductForm";

type Props = {
  refetch: () => void;
  onClose: () => void;
};

export default function AddProduct({ refetch, onClose }: Props) {
  const [loading, setLoading] = useState(false);

  const handleCreate = async (data: any) => {
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

      await api.post("/product", formData);

      refetch();

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return <ProductForm onSubmit={handleCreate} loading={loading} />;
}
