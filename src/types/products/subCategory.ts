export interface ISubCategory {
  id: number;
  sub_category_name_ar: string;
  sub_category_name_en?: string | null;
  code?: string | null;
  description_en?: string | null;
  description_ar?: string | null;
}

export interface SubCategoryForm {
  category_id: number | null;
  sub_category_name_ar: string;
  sub_category_name_en?: string | null;
  code?: string | null;
  description_en?: string | null;
  description_ar?: string | null;
}
