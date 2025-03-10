import { AxiosResponse } from "axios";
import { _axios } from "../../interceptor/http-config";
import type { BrandForm, IBrand } from "../../types/products/brand";

export const _SubCategoriesApi = {
  // GET SUBCATEGORY
  getSubCategories: async () => {
    const response = await _axios.get<AxiosResponse<{ categories: IBrand[] }>>(
      "/products/subCategories"
    );
    return response?.data?.data;
  },
  // GET SUBCATEGORY
  getSubCategory: async (id: number) => {
    const response = await _axios.get<AxiosResponse<{ category: IBrand }>>(
      `/products/subCategories/${id}`
    );
    return response.data.data;
  },
  // ADD SUBCATEGORY
  addSubCategory: async (data: BrandForm) => {
    const response = await _axios.post("/products/subCategories", data);
    return response.data;
  },
  // UPDATE SUBCATEGORY
  updateSubCategory: async (id: string, data: BrandForm) => {
    const response = await _axios.put(`/products/subCategories/${id}`, data);
    return response.data;
  },
  // DELETE SUBCATEGORY
  deleteSubCategory: async (id: string) => {
    const response = await _axios.delete(`/products/subCategories/${id}`);
    return response.data;
  },
};
