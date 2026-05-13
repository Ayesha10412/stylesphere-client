import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),

    email: z.string().email("Invalid email"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/,
        "Password must include uppercase, lowercase, number and special character",
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type RegisterFormData = z.infer<typeof registerSchema>;

export const createSellerSchemaValidation = z.object({
  motivation: z.string().min(10, "Motivation must be at least 10 characters"),

  cvLink: z.any().refine((files) => files?.length > 0, {
    message: "CV file is required",
  }),
});

export type CreateSellerFormData = z.infer<typeof createSellerSchemaValidation>;

export const createStoreSchema = z.object({
  storeName: z
    .string()
    .min(3, "Store name must be at least 3 characters"),

  storeDescription: z.string().optional(),

  storeBanner: z.any().optional(),
});

export const updateStoreSchema = z.object({
  storeName: z.string().optional(),
  storeDescription: z.string().optional(),
  storeBanner: z.any().optional(),
  isApproved: z.boolean().optional(),
});

export type CreateStoreFormData = z.infer<typeof createStoreSchema>;
export type UpdateStoreFormData = z.infer<typeof updateStoreSchema>;