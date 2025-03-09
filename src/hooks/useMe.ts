import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { _MeApi } from "../services/me.service";
import { useMeStore } from "../store/useMeStore";
import { QueryKeys } from "../utils/queryKeys";
import type { IMeResponse } from "../types/me";

// FETCH Me
export const useFetchMe = () => {
  const setMe = useMeStore((state) => state.setMe);
  return useQuery<IMeResponse, Error>({
    queryKey: [QueryKeys.ME],
    queryFn: _MeApi.getMe,
    onSuccess: (data) => {
      setMe(data);
    },
  } as UseQueryOptions<IMeResponse, Error>); 
};
