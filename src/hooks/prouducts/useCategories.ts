import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { _CategoriesApi } from "../../services/products/categories.service";
import { QueryKeys } from "../../utils/queryKeys";

// FETCH CATEGORIES
export const useFetchCategories = () => {
  return useQuery({
    queryKey: [QueryKeys.CATEGORIES],
    queryFn: _CategoriesApi.getCategories,
  });
};

// FETCH CATEGORY
export const useFetchCategory = (id: number) => {
  return useQuery({
    queryKey: [QueryKeys.CATEGORY, id],
    queryFn: () => _CategoriesApi.getCategory(id),
    enabled: !!id,
  });
};

// ADD CATEGORY
export const useAddCategory = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: _CategoriesApi.addCategory,
    onSuccess: () => {
      navigate("/dashboard/brands");
    },
  });
};

// UPDATE CATEGORY
export const useUpdateCategory = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      _CategoriesApi.updateCategory(id, data),
    onSuccess: () => {
      navigate("/dashboard/brands");
    },
  });
};

// DELETE CATEGORY
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: _CategoriesApi.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.CATEGORIES],
      });
    },
  });
};
