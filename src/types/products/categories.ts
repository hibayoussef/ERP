export interface IBrand {
  id: number;
  category_name_en: string | null;
  category_name_ar: string;
  description_ar: string | null;
  description_en: string;
}

export interface CategoryForm {
  organization_id: number | null;
  category_name_en: string;
  category_name_ar?: string | null;
  description_en?: string | null;
  description_ar?: string | null;
  code?: string | null;
}
