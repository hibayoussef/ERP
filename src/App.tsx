// src/App.tsx
import { ToastContainer } from "react-toastify";
import { ScrollToTop } from "./components/common/ScrollToTop";
import RoutesComponent from "./routes/Routes";
import { useTranslation } from "react-i18next";
import { createEmotionCache } from "./createEmotionCache";
import { useEffect } from "react";
import { CacheProvider } from "@emotion/react";

const currentLanguage = localStorage.getItem("language") || "en";

export default function App() {
  // const { i18n } = useTranslation();
  // const isRTL = i18n.language === "ar";

  // const emotionCache = createEmotionCache(isRTL);

  // useEffect(() => {
  //   i18n.changeLanguage(currentLanguage);
  //   document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  // }, [currentLanguage]);
  return (
    <>
      {/* <CacheProvider value={emotionCache}> */}
        <ScrollToTop />
        <RoutesComponent />
        <ToastContainer />
      {/* </CacheProvider> */}
    </>
  );
}
