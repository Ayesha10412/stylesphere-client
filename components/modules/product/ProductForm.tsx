"use client";

import { useFieldArray, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import { CustomInput } from "@/components/ui/CustomInput";

import { CreateProductFormData, createProductSchema } from "@/lib/schema";
import { Plus, Trash } from "lucide-react";

type Props = {
  defaultValues?: Partial<CreateProductFormData>;

  loading?: boolean;

  onSubmit: (data: CreateProductFormData) => void;
};

export default function ProductForm({
  defaultValues,
  loading,
  onSubmit,
}: Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),

    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      price: defaultValues?.price || 0,
      category: defaultValues?.category || "",

      variants: defaultValues?.variants || [
        {
          size: "",
          color: "",
          stock: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 grid grid-cols-3 gap-4 p-4"
    >
      <CustomInput
        label="Title"
        name="title"
        type="text"
        register={register}
        control={control}
        error={errors.title}
      />

      <div className="col-span-2">
        <CustomInput
          label="Description"
          name="description"
          type="textarea"
          register={register}
          control={control}
          error={errors.description}
        />
      </div>

      <CustomInput
        label="Price"
        name="price"
        type="text"
        register={register}
        control={control}
        error={errors.price}
      />

      <CustomInput
        label="Category"
        name="category"
        type="text"
        register={register}
        control={control}
        error={errors.category}
      />

      <CustomInput
        label="Images"
        name="images"
        type="image"
        multiple
        register={register}
        control={control}
        error={errors.images as any}
      />

      {/* VARIANTS */}
      <div className="col-span-3 border rounded-lg p-4">
        <h2 className="font-medium text-gray-700 mb-3">Variants</h2>

        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-3 items-end">
              {/* INPUTS (TAKE FULL SPACE) */}
              <div className="flex-1 grid grid-cols-3 gap-3">
                <CustomInput
                  label="Size"
                  name={`variants.${index}.size`}
                  type="text"
                  register={register}
                  control={control}
                />

                <CustomInput
                  label="Color"
                  name={`variants.${index}.color`}
                  type="text"
                  register={register}
                  control={control}
                />

                <CustomInput
                  label="Stock"
                  name={`variants.${index}.stock`}
                  type="text"
                  register={register}
                  control={control}
                />
              </div>

              {/* ACTIONS (ALWAYS END) */}
              <div className="flex gap-2 mb-1 shrink-0">
                <Button
                  type="button"
                  onClick={() =>
                    append({
                      size: "",
                      color: "",
                      stock: 0,
                    })
                  }
                  className="bg-[#008080]/10 text-[#008080]"
                >
                  <Plus size={26} />
                </Button>

                <Button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-red-100 text-red-500"
                >
                  <Trash size={26} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-end col-span-3 justify-end gap-2">
        <Button
          type="button"
          disabled={loading}
          className="text-red-500 bg-red-100"
        >
          {loading ? "Loading..." : "Cancel"}
        </Button>
        <Button type="submit" disabled={loading} className="bg-[#008080] text-white">
          {loading ? "Loading..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
