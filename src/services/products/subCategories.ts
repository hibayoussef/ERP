import { AxiosResponse } from "axios";
import { _axios } from "../../interceptor/http-config";
import type { BrandForm, IBrand } from "../../types/products/brand";
import { SubCategoryForm } from "@/types/products/subCategory";

export const _SubCategoriesApi = {
  // GET SUBCATEGORY
  getSubCategories: async () => {
    const response = await _axios.get<
      AxiosResponse<{ subCategories: IBrand[] }>
    >("/products/sub-categories");
    return response?.data?.data;
  },
  // GET SUBCATEGORY
  getSubCategory: async (id: number) => {
    const response = await _axios.get<AxiosResponse<{ subCategory: IBrand }>>(
      `/products/sub-categories/${id}`
    );
    return response.data.data;
  },
  // ADD SUBCATEGORY
  addSubCategory: async (data: SubCategoryForm) => {
    const response = await _axios.post("/products/sub-categories", data);
    return response.data;
  },
  // UPDATE SUBCATEGORY
  updateSubCategory: async (id: string, data: BrandForm) => {
    const response = await _axios.put(`/products/sub-categories/${id}`, data);
    return response.data;
  },
  // DELETE SUBCATEGORY
  deleteSubCategory: async (id: string) => {
    const response = await _axios.delete(`/products/sub-categories/${id}`);
    return response.data;
  },
};
