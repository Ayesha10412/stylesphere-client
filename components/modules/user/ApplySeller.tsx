/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/ui/CustomInput";

import api from "@/config/api";
import { handleApiError } from "@/helper/handleApiError";
import {
  CreateSellerFormData,
  createSellerSchemaValidation,
} from "@/lib/schema";

export default function ApplySeller() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<CreateSellerFormData>({
    resolver: zodResolver(createSellerSchemaValidation),
  });

  const onSubmit = async (data: CreateSellerFormData) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("motivation", data.motivation);

      // file append
      formData.append("cvLink", data.cvLink[0]);

      const res = await api.post("/seller", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200 || res.status === 201) {
        reset();
      }
    } catch (error: unknown) {
      console.error(error);

      handleApiError<CreateSellerFormData>(error, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-2xl border p-6 shadow-lg bg-white">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#008080]">
          Apply As Seller
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Motivation */}
          <CustomInput
            label="Motivation"
            type="textarea"
            placeholder="Why do you want to become a seller?"
            name="motivation"
            control={control}
            register={register}
            error={errors.motivation}
          />

          {/* CV Upload */}
          <CustomInput
            label="Upload CV"
            type="file"
            name="cvLink"
            control={control}
            register={register}
            error={errors.cvLink as FieldError}
            accept=".pdf,.doc,.docx"
          />
          {errors.root && (
            <p className="text-red-500 text-sm">{errors.root.message}</p>
          )}

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#008080] hover:bg-[#004040]"
            >
              {loading ? "Submitting..." : "Apply Now"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
