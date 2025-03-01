import { useQuery } from "@tanstack/react-query";
import { _CommonApi } from "../services/common.service";
import type { CountriesResponse, IndustryData } from "../types/common";
import { QueryKeys } from "../utils/queryKeys";

export const useFetchIndustry = () => {
  return useQuery({
    queryKey: [QueryKeys.INDUSTRY],
    queryFn: async (): Promise<IndustryData> => {
      const data = await _CommonApi.fetchIndustries();
      return data;
    },
    staleTime: 1000 * 60 * 10,
  });
};

export const useFetchCountries = () => {
  return useQuery({
    queryKey: [QueryKeys.COUNTRIES],
    queryFn: async (): Promise<CountriesResponse> => {
      const data = await _CommonApi.fetchCountries();
      return data;
    },
    staleTime: 1000 * 60 * 10,
  });
};
