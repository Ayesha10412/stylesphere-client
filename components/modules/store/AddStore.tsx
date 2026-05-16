"use client";

import { useState } from "react";
import { useForm, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import api from "@/config/api";

import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/ui/CustomInput";
import { CreateStoreFormData, createStoreSchema } from "@/lib/schema";
import { handleApiError } from "@/helper/handleApiError";

export default function AddStore({
  refetch,
  onClose,
}: {
  refetch: () => void;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    reset,setError,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateStoreFormData>({
    resolver: zodResolver(createStoreSchema),
  });

  const onSubmit = async (data: CreateStoreFormData) => {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("storeName", data.storeName);

      if (data.storeDescription) {
        formData.append("storeDescription", data.storeDescription);
      }

   if (data.storeBanner && data.storeBanner.length > 0) {
     formData.append("storeBanner", data.storeBanner[0]);
   }

      const res = await api.post("/store", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);
      reset();
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <CustomInput
        label="Store Name"
        name="storeName"
        type="text"
        placeholder="Enter store name"
        register={register}
        control={control}
        error={errors.storeName}
      />

      <CustomInput
        label="Store Description"
        name="storeDescription"
        type="textarea"
        placeholder="Store description"
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
      {errors.root && (
        <p className="text-red-500 text-sm">{errors.root.message}</p>
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
          {loading ? "Creating..." : "Create Store"}
        </Button>
      </div>
    </form>
  );
}
