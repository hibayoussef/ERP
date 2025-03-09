import { useQuery } from "@tanstack/react-query";
import { _MeApi } from "../services/me.service";
import { useMeStore } from "../store/useMeStore";
import { QueryKeys } from "../utils/queryKeys";

// FETCH BRANDS
export const useFetchMe = () => {
  const setMe = useMeStore((state) => state.setMe);
  return useQuery({
    queryKey: [QueryKeys.ME],
    queryFn: _MeApi.getMe
  });
};
