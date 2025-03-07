import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { _SubCategoriesApi } from "../../services/products/subCategories";
import { QueryKeys } from "../../utils/queryKeys";

// FETCH SUBCATEGORIES
export const useFetchSubCategories = () => {
  return useQuery({
    queryKey: [QueryKeys.SUB_CATEGORIES],
    queryFn: _SubCategoriesApi.getSubCategories,
  });
};

// FETCH SUBCATEGORY
export const useFetchSubCategory = (id: number) => {
  return useQuery({
    queryKey: [QueryKeys.SUB_CATEGORY, id],
    queryFn: () => _SubCategoriesApi.getSubCategory(id),
    enabled: !!id,
  });
};

// ADD SUBCATEGORY
export const useAddSubCategory = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: _SubCategoriesApi.addSubCategory,
    onSuccess: () => {
      navigate("/dashboard/brands");
    },
  });
};

// UPDATE SUBCATEGORY
export const useUpdateSubCategory = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      _SubCategoriesApi.updateSubCategory(id, data),
    onSuccess: () => {
      navigate("/dashboard/brands");
    },
  });
};

// DELETE SUBCATEGORY
export const useDeleteSubCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: _SubCategoriesApi.deleteSubCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.SUB_CATEGORIES],
      });
    },
  });
};
