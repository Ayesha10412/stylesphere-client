/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  UseFormRegister,
  Controller,
  FieldError,
  Control,
  FieldValues,
  Path,
  useWatch,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  X,
  Calendar as CalendarIcon,
  Eye,
  EyeOff,
  UploadCloud,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { Calendar } from "./calendar";
import Image from "next/image";
import { MultiSelect } from "./multisekect";

type Option = { value: string; label: string };

type InputType =
  | "text"
  | "password"
  | "textarea"
  | "date"
  | "daterange"
  | "select"
  | "multiselect"
  | "file"
  | "image"
  | "email"
  | "division"
  | "checkbox";

interface CustomInputProps<T extends FieldValues = FieldValues> {
  className?: string;
  disabled?: boolean;
  value?: string;
  name: Path<T>;
  label?: string;
  type?: InputType;
  register: UseFormRegister<T>;
  control: Control<T>;
  error?: FieldError;
  options?: Option[];
  multiple?: boolean;
  accept?: string;
  onFilesChange?: (files: File[]) => void;
  required?: boolean;
  placeholder?: string;
}

export const CustomInput = <T extends FieldValues>({
  name,
  label,
  value,
  type = "text",
  register,
  control,
  error,
  options = [],
  multiple = false,
  accept,
  onFilesChange,
  disabled = false,
  className,
  required,
  placeholder,
}: CustomInputProps<T>) => {
  const [images, setImages] = useState<File[]>([]);
  // const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const watchedFile = useWatch({ control, name });
  const fileName = watchedFile?.[0]?.name || watchedFile?.name || "";
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const previewUrls = useMemo(() => {
    return images.map((file) => URL.createObjectURL(file));
  }, [images]);
  const focusColor =
    "h-10 border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 rounded-lg px-3 shadow-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#008080]/20 focus-visible:border-[#008080] hover:border-gray-400";
  // useEffect(() => {
  //   const urls = images.map((file) => URL.createObjectURL(file));
  //   setPreviewUrls(urls);
  //   return () => urls.forEach((url) => URL.revokeObjectURL(url));
  // }, [images]);
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);
  return (
    <div className={cn("space-y-2", className)}>
      {label && type !== "checkbox" && (
        <Label
          htmlFor={name}
          className={cn(
            "tracking-wide text-sm font-medium",
            disabled ? "text-gray-500" : "text-black",
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      {/* ================= TEXT / PASSWORD / DATE / DATERANGE ================= */}
      {(type === "text" ||
        type === "password" ||
        type === "date" ||
        type === "daterange") && (
        <>
          {type === "password" ? (
            <div className="relative">
              <Input
                id={name}
                type={showPassword ? "text" : "password"}
                className={cn(focusColor, className)}
                {...register(name)}
                placeholder={placeholder}
                disabled={disabled}
              />
              {!disabled && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
          ) : type === "date" ? (
            <Controller
              control={control}
              name={name}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-10 text-sm",
                        focusColor,
                        !field.value && "text-muted-foreground",
                      )}
                      disabled={disabled}
                    >
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {field.value
                        ? dayjs(field.value).format("MM/DD/YY")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-full p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
          ) : type === "daterange" ? (
            <Controller
              control={control}
              name={name}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-10 text-sm",
                        focusColor,
                      )}
                      disabled={disabled}
                    >
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {field.value?.from
                        ? field.value.to
                          ? `${dayjs(field.value.from).format(
                              "MM/DD/YY",
                            )} - ${dayjs(field.value.to).format("MM/DD/YY")}`
                          : dayjs(field.value.from).format("MM/DD/YY")
                        : "Pick date range"}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="range"
                      numberOfMonths={2}
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
          ) : (
            <Input
              id={name}
              type="text"
              className={cn(focusColor, className)}
              {...register(name)}
              disabled={disabled}
              placeholder={placeholder}
            />
          )}
        </>
      )}

      {/* ================= TEXTAREA ================= */}
      {type === "textarea" && (
        <Textarea
          id={name}
          className={cn(focusColor, "min-h-[120px]", className)}
          {...register(name)}
          disabled={disabled}
        />
      )}

      {/* ================= SELECT ================= */}
      {type === "select" && (
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              value={value ?? field.value}
              defaultValue={field.value}
              disabled={disabled}
            >
              <SelectTrigger className={cn("w-full", focusColor)}>
                <SelectValue placeholder={placeholder || "Select option"} />
              </SelectTrigger>

              <SelectContent className="bg-white">
                {options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      )}

      {/* ================= MULTISELECT ================= */}
      {type === "multiselect" && (
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <MultiSelect
              options={options}
              value={field.value || []}
              onValueChange={field.onChange}
              placeholder={placeholder || "Select options"}
              disabled={disabled}
            />
          )}
        />
      )}

      {/* ================= FILE ================= */}
      {type === "file" && (
        <label
          htmlFor={name}
          className={cn(
            "flex items-center justify-between h-10 pr-3 border border-gray-300 bg-white rounded-lg shadow-sm cursor-pointer transition-all duration-200",
            "hover:border-[#008080] hover:bg-gray-50",
            disabled && "opacity-50 cursor-not-allowed",
          )}
        >
          {/* Left */}
          <div className="flex items-center gap-2 min-w-0 h-full pl-2 pr-3 bg-[#008080]/10 rounded-l-lg">
            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-[#008080]/20">
              <UploadCloud className="w-4 h-4 text-[#008080]" />
            </div>

            <span className="text-sm text-gray-700 truncate">Upload file</span>
          </div>

          {/* Right hint */}
          <span className="text-sm text-blue-600 truncate max-w-[440px] text-center">
            {fileName ? fileName : "No file selected"}
          </span>
          <Input
            id={name}
            type="file"
            accept={accept}
            {...register(name)}
            disabled={disabled}
            className="hidden"
          />
        </label>
      )}

      {/* ================= IMAGE ================= */}
      {type === "image" && (
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <>
              <label
                htmlFor={name}
                className={cn(
                  "flex items-center justify-between h-10 pr-3 border border-gray-300 bg-white rounded-lg shadow-sm cursor-pointer transition-all duration-200",
                  "hover:border-[#008080] hover:bg-gray-50",
                  disabled && "opacity-50 cursor-not-allowed",
                )}
              >
                {/* Left */}
                <div className="flex items-center gap-2 min-w-0 h-full pl-2 pr-3 bg-[#008080]/10 rounded-l-lg">
                  <div className="flex items-center justify-center w-7 h-7 rounded-md bg-[#008080]/10">
                    <UploadCloud className="w-4 h-4 text-[#008080]" />
                  </div>

                  <span className="text-sm text-gray-600 truncate">
                    Upload image
                  </span>
                </div>

                {/* Right hint */}
                <span className="text-xs text-gray-400">Choose image</span>

                <Input
                  id={name}
                  type="file"
                  accept={accept ?? "image/*"}
                  multiple={multiple}
                  className="hidden"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const files = Array.from(e.target.files || []);

                    const updated = multiple
                      ? [
                          ...(Array.isArray(field.value) ? field.value : []),
                          ...files,
                        ]
                      : files;

                    field.onChange(updated);
                    setImages(updated);
                    onFilesChange?.(updated);
                  }}
                />
              </label>

              {/* Preview (cleaned) */}
              {previewUrls.length > 0 && (
                <div className="mt-3 space-y-2">
                  {images.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 h-10 px-3 bg-white border border-gray-200 rounded-lg"
                    >
                      <div className="relative w-7 h-7 shrink-0">
                        <Image
                          src={previewUrls[idx]}
                          alt="preview"
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>

                      <p className="text-sm text-gray-700 truncate flex-1">
                        {file.name}
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...images];
                          updated.splice(idx, 1);
                          setImages(updated);
                          field.onChange(updated);
                        }}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        />
      )}
      {/* ================= CHECKBOX ================= */}
      {type === "checkbox" && (
        <div className="flex items-center gap-2">
          <input
            id={name}
            type="checkbox"
            className="w-4 h-4"
            {...register(name)}
            disabled={disabled}
          />
          {label && <label className="text-sm">{label}</label>}
        </div>
      )}

      {/* ================= ERROR ================= */}
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};
