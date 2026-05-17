"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import api from "@/config/api";

import { Button } from "@/components/ui/button";

import { CustomInput } from "@/components/ui/CustomInput";

import z from "zod";
import { handleApiError } from "@/helper/handleApiError";

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

type FormData = z.infer<typeof categorySchema>;

type Props = {
  refetch: () => void;

  onClose: () => void;
};

export default function AddCategory({ refetch, onClose }: Props) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      await api.post("/category", data);

      refetch();

      onClose();
    } catch (error: unknown) {
          console.error(error);
    
          handleApiError<FormData>(error, setError);
        } finally {
          setLoading(false);
        }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <CustomInput
        label="Category Name"
        name="name"
        type="text"
        register={register}
        control={control}
        error={errors.name}
      />

      <div className="flex justify-end gap-2 mt-6">
        <Button
          type="button"
          onClick={onClose}
          className="bg-red-100 text-red-500 hover:bg-red-200"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={loading}
          className="bg-[#008080] hover:bg-[#006666]"
        >
          {loading ? "Creating..." : "Create"}
        </Button>
      </div>
    </form>
  );
}
