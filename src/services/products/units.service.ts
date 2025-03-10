import { AxiosResponse } from "axios";
import { _axios } from "../../interceptor/http-config";
import type { BrandForm, IBrand } from "../../types/products/brand";

export const _UnitsApi = {
  // GET UNITS
  getUnits: async () => {
    const response = await _axios.get<AxiosResponse<{ categories: IBrand[] }>>(
      "/products/units"
    );
    return response?.data?.data;
  },
  // GET UNIT
  getUnit: async (id: number) => {
    const response = await _axios.get<AxiosResponse<{ category: IBrand }>>(
      `/products/units/${id}`
    );
    return response.data.data;
  },
  // ADD UNIT
  addUnit: async (data: BrandForm) => {
    const response = await _axios.post("/products/units", data);
    return response.data;
  },
  // UPDATE CATEGORY
  updateUnit: async (id: string, data: BrandForm) => {
    const response = await _axios.put(`/products/units/${id}`, data);
    return response.data;
  },
  // DELETE UNIT
  deleteUnit: async (id: string) => {
    const response = await _axios.delete(`/products/units/${id}`);
    return response.data;
  },
};
