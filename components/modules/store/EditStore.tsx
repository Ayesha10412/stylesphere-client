"use client";

import { useState } from "react";
import { useForm, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import api from "@/config/api";

import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/ui/CustomInput";
import {
  CreateStoreFormData,
  UpdateStoreFormData,
  updateStoreSchema,
} from "@/lib/schema";
import { Store } from "@/types/data";
import { handleApiError } from "@/helper/handleApiError";

type Props = {
  store: Store;
  refetch: () => void;
  onClose: () => void;
};

export default function EditStore({ store, refetch, onClose }: Props) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setError,
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
        formData.append("storeDescription", data.storeDescription);
      }

      const file = data.storeBanner;

      if (file instanceof File) {
        formData.append("storeBanner", file);
      }
      for (const pair of formData.entries()) {
        console.log("FD:", pair[0], pair[1]);
      }
      await api.patch(`/store/${store._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      refetch();
      onClose();
    } catch (error: unknown) {
      console.error(error);

      handleApiError<CreateStoreFormData>(error, setError);
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
        type="image"
        accept="image/*"
        register={register}
        control={control}
        error={errors.storeBanner as FieldError}
      />

      {store.storeBanner && (
        <img
          src={store.storeBanner}
          alt="store"
          className="w-24 h-24 object-cover rounded-lg border"
        />
      )}

      <div className="flex  justify-end gap-2 mt-6">
        <Button
          type="button"
          disabled={loading}
          onClick={onClose}
          className="bg-red-100 text-red-500 hover:bg-red-200"
        >
          Cancel{" "}
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="bg-[#008080] hover:bg-[#004040]"
        >
          {loading ? "Updating..." : "Update Store"}{" "}
        </Button>
      </div>
    </form>
  );
}
