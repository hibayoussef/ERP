import { _axios } from "../interceptor/http-config";
import {
  CountriesResponse,
  CurrencyResponse,
  IndustryResponse,
  type PlansResponse,
  type TimeZoneResponse,
} from "../types/common";

export const _CommonApi = {
  // Time Zone
  fetchTimeZone: async () => {
    const response = await _axios.get<TimeZoneResponse>(`/auth/time-zones`, {
      headers: {
        "x-api-key": "SANN_BOOKS",
      },
    });
    return response.data;
  },
  // Countries
  fetchCountries: async () => {
    const response = await _axios.get<CountriesResponse>(`/auth/countries`, {
      headers: {
        "x-api-key": "SANN_BOOKS",
      },
    });
    return response.data;
  },
  // Currencies
  fetchCurrencies: async () => {
    const response = await _axios.get<CurrencyResponse>(`/auth/currencies`, {
      headers: {
        "x-api-key": "SANN_BOOKS",
      },
    });
    return response.data;
  },
  //   Industries
  fetchIndustries: async () => {
    const response = await _axios.get<IndustryResponse>(`/auth/industries`, {
      headers: {
        "x-api-key": "SANN_BOOKS",
      },
    });
    return response.data;
  },
  //   Plans
  fetchPlans: async () => {
    const response = await _axios.get<PlansResponse>(`/subscription/plans`, {
      headers: {
        "x-api-key": "SANN_BOOKS",
      },
    });
    return response.data;
  },
};
