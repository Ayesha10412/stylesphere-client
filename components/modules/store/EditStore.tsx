"use client";

import { useState } from "react";
import { useForm, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import api from "@/config/api";

import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/ui/CustomInput";
import { UpdateStoreFormData, updateStoreSchema } from "@/lib/schema";
import { Store } from "@/types/data";




type Props = {
  store: Store;
  refetch: () => void;
};

export default function EditStore({ store, refetch }: Props) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateStoreFormData>({
    resolver: zodResolver(updateStoreSchema),

    defaultValues: {
      storeName: store.storeName,
      storeDescription: store.storeDescription,
    },
  });

  const onSubmit = async (data: UpdateStoreFormData) => {
    setLoading(true);

    try {
      const formData = new FormData();

      if (data.storeName) {
        formData.append("storeName", data.storeName);
      }

      if (data.storeDescription) {
        formData.append(
          "storeDescription",
          data.storeDescription,
        );
      }

      if (data.storeBanner?.[0]) {
        formData.append("storeBanner", data.storeBanner[0]);
      }

      await api.patch(`/store/${store._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      refetch();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <CustomInput
        label="Store Name"
        name="storeName"
        type="text"
        register={register}
        control={control}
        error={errors.storeName}
      />

      <CustomInput
        label="Store Description"
        name="storeDescription"
        type="textarea"
        register={register}
        control={control}
        error={errors.storeDescription}
      />

      <CustomInput
        label="Store Banner"
        name="storeBanner"
        type="file"
        accept="image/*"
        register={register}
        control={control}
        error={errors.storeBanner as FieldError}
      />

      <Button
        type="submit"
        disabled={loading}
        className="bg-[#008080]"
      >
        {loading ? "Updating..." : "Update Store"}
      </Button>
    </form>
  );
}