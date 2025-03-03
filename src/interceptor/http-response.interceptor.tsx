import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { _axios } from "../interceptor/http-config";
import { _AuthApi } from "../services/auth.service";

export const HttpResponseInterceptor = (navigate) => {
  _axios.interceptors.response.use(
    function (response) {
      switch (response?.config?.method) {
        case "post":
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;
        case "put":
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;
        case "patch":
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;

        case "delete":
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;

        default:
          break;
      }
      return response;
    },
    function (error) {
      // make a copy of the original request to do it again incase we need to refresh the token
      // const originalRequest = error?.config;

      const url = error?.config?.url;

      // Skip showing error messages for /update-device-token
      if (url === "/update-device-token") {
        return Promise.reject(error);
      }

      console.log("errprprpr: ", error);
      switch (error?.response?.status) {
        case 404:
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;

        case 400:
          if (!error?.response?.data) {
            toast.error("An unexpected error occurred. Please try again later");
          }
          if (typeof error?.response?.data?.message === "object") {
            Object.values(error?.response?.data.message).forEach(
              (errorMessages: any) => {
                errorMessages.forEach((errorMessage) => {
                  toast.error(`${errorMessage}`);
                });
              }
            );
          }
          if (typeof error?.response?.data?.message === "string") {
            toast.error(`${error?.response?.data?.message}`);
          }
          break;
        case 422:
          if (!error?.response?.data) {
            toast.error("An unexpected error occurred. Please try again later");
          }
          if (typeof error?.response?.data?.message === "object") {
            Object.values(error?.response?.data.message).forEach(
              (errorMessages: any) => {
                errorMessages.forEach((errorMessage) => {
                  toast.error(`${errorMessage}`);
                });
              }
            );
          }
          if (typeof error?.response?.data?.message === "string") {
            toast.error(`${error?.response?.data?.message}`);
          }
          break;

        case 500:
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;
        case 409:
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;

        case 405:
          Object.keys(error.response.data.message).map((key) =>
            toast.error(error.response.data.message[key], {})
          );
          break;

        case 401:
          navigate("/");
          _AuthApi.destroyToken();
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;

        case 403:
          // _AuthApi.destroyToken();
          navigate("/");
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;
        case 422:
          if (!error?.response?.data) {
            toast.error("An unexpected error occurred. Please try again later");
          }

          const responseData = error?.response?.data;

          if (typeof responseData?.message === "string") {
            toast.error(responseData.message);
          }

          if (responseData?.errors && typeof responseData.errors === "object") {
            Object.entries(responseData.errors).forEach(
              ([field, errorMessages]) => {
                errorMessages.forEach((errorMessage) => {
                  toast.error(`${errorMessage}`);
                });
              }
            );
          }
          break;

        // case 400:
        default:
          toast.error(error.response?.data?.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          break;
      }

      return Promise.reject(error);
    }
  );
};

// hello
