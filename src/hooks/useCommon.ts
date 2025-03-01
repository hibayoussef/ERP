import { useQuery } from "@tanstack/react-query";
import { _CommonApi } from "../services/common.service";
import type {
  CountriesResponse,
  IndustryData,
  TimeZoneResponse,
} from "../types/common";
import { QueryKeys } from "../utils/queryKeys";
import { useCommonStore } from "../store/useCommonStore";

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

export const useFetchTimeZone = () => {
  return useQuery({
    queryKey: [QueryKeys.COUNTRIES],
    queryFn: async (): Promise<TimeZoneResponse> => {
      const data = await _CommonApi.fetchTimeZone();
      return data;
    },
    staleTime: 1000 * 60 * 10,
  });
};
