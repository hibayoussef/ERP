// src/App.tsx
import { useNavigate } from "react-router";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { useAxiosInterceptors } from "./hooks/useAxiosInterceptors";
import RoutesComponent from "./routes/Routes";
import { useEffect } from "react";
import { HttpRequestInterceptor } from "./interceptor/http-request.interceptor";
import { HttpResponseInterceptor } from "./interceptor/http-response.interceptor";
import { ToastContainer } from "react-toastify";

export default function App() {
  useAxiosInterceptors();

  const navigate = useNavigate();
  useEffect(() => {
    HttpRequestInterceptor();
    HttpResponseInterceptor(navigate);
  }, [navigate]);

  return (
    <>
      <ScrollToTop />
      <RoutesComponent />
      <ToastContainer />
    </>
  );
}
