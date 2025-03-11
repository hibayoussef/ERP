import { z } from "zod";

export const categorySchema = z.object({
  id: z.number().optional(),
  category_name_en: z
    .string()
    .min(2, "Category name (EN) must be at least 2 characters"),
  category_name_ar: z
    .string()
    .min(2, "Category name (AR) must be at least 2 characters"),
  description_en: z
    .string()
    .min(5, "Description (EN) must be at least 5 characters"),
  description_ar: z
    .string()
    .min(5, "Description (AR) must be at least 5 characters"),
  code: z.string().min(5, "Description (AR) must be at least 5 characters"),
});

export type CategoryType = z.infer<typeof categorySchema>;
