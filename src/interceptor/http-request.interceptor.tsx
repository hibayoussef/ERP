import { _AuthApi } from "../services/auth.service";
import { _axios as Axios } from "./http-config";

export const HttpRequestInterceptor = () => {
  Axios.interceptors.request.use(
    (request) => {
      const token = _AuthApi.getToken();
        request.headers["x-api-key"] = "SANN_BOOKS";

      if (request.headers) {
        request.headers["x-api-key"] = "SANN_BOOKS";

        if (token) {
          request.headers.Authorization = `Bearer ${token}`;
        }

        if (
          !(request.data instanceof FormData) &&
          !request.headers["Content-Type"]
        ) {
          request.headers["Content-Type"] = "application/x-www-form-urlencoded";
        }
      }

      return request;
    },
    (error) => Promise.reject(error)
  );
};