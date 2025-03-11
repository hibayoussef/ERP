import { z } from "zod";

export const brandSchema = z.object({
  id: z.number(),
  brand_name_en: z.string(),
  description_en: z.string(),
});

export type BrandType = z.infer<typeof brandSchema>;
