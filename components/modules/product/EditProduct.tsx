"use client";

import { useEffect, useState } from "react";

import api from "@/config/api";

import ProductForm from "./ProductForm";
import { Product } from "@/types/data";
import { CreateProductFormData } from "@/lib/schema";
import { useForm, UseFormSetError } from "react-hook-form";
import { handleApiError } from "@/helper/handleApiError";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

export default function EditProduct({ id }: Props) {
  const [loading, setLoading] = useState(true);
  const { setError } = useForm();
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/product/${id}`);
        setProduct(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  const handleUpdate = async (
    data: CreateProductFormData,
    setError: UseFormSetError<CreateProductFormData>,
  ) => {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", String(data.price ?? 0));
      formData.append("category", data.category);
      formData.append("variants", JSON.stringify(data.variants));

      if (data.images?.length) {
        data.images.forEach((file: File) => {
          formData.append("images", file);
        });
      }
      await api.patch(`/product/${id}`, formData);
      router.push("/admin-layout/product");
    } catch (error) {
      handleApiError(error, setError);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ProductForm
      defaultValues={{
        title: product?.title || "",
        description: product?.description || "",
        price: Number(product?.price) ?? 0,
        category: product?.category?._id || "",
        variants: product?.variants || [],
      }}
      existingImages={product?.images || []}
      onSubmit={handleUpdate}
      loading={loading}
    />
  );
}
