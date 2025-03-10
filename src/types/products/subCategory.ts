export interface IBrand {
  id: number;
  brand_name_ar: string | null;
  brand_name_en: string;
  description_ar: string | null;
  description_en: string;
}

export interface SubCategoryForm {
  category_id: number | null;
  sub_category_name_ar: string;
  sub_category_name_en?: string | null;
  code?: string | null;
  description_en?: string | null;
  description_ar?: string | null;
}
