import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { _BrandsApi } from "../../services/products/brands.service";
import { QueryKeys } from "../../utils/queryKeys";

// FETCH BRANDS
export const useFetchBrands = () => {
  return useQuery({
    queryKey: [QueryKeys.BRANDS],
    queryFn: _BrandsApi.getBrands,
  });
};

// FETCH BRAND
export const useFetchBrand = (id: number) => {
  return useQuery({
    queryKey: [QueryKeys.BRAND, id],
    queryFn: () => _BrandsApi.getBrand(id),
    enabled: !!id,
  });
};

// ADD BRAND
export const useAddBrand = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: _BrandsApi.addBrand,
    onSuccess: () => {
      navigate("/brands");
    },
  });
};

// UPDATE BRAND
export const useUpdateBrand = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      _BrandsApi.updateBrand(id, data),
    onSuccess: () => {
      navigate("/dashboard/brands");
    },
  });
};

// DELETE BRAND
export const useDeleteBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: _BrandsApi.deleteBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.BRANDS],
      });
    },
  });
};
