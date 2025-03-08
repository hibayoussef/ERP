// src/routes/Routes.tsx
import { Navigate, Route, Routes } from "react-router";
import AppLayout from "../layout/AppLayout";
import ForgotPassword from "../pages/AuthPages/ForgotPassword";
import ResetPassword from "../pages/AuthPages/ResetPassword";
import SignIn from "../pages/AuthPages/SignIn";
import SignUp from "../pages/AuthPages/SignUp";
import VerifyEmail from "../pages/AuthPages/VerifyEmail";
import Blank from "../pages/Blank";
import Calendar from "../pages/Calendar";
import BarChart from "../pages/Charts/BarChart";
import LineChart from "../pages/Charts/LineChart";
import Home from "../pages/Dashboard/Home";
import FormElements from "../pages/Forms/FormElements";
import NotFound from "../pages/OtherPage/NotFound";
import BasicTables from "../pages/Tables/BasicTables";
import Alerts from "../pages/UiElements/Alerts";
import Avatars from "../pages/UiElements/Avatars";
import Badges from "../pages/UiElements/Badges";
import Buttons from "../pages/UiElements/Buttons";
import Images from "../pages/UiElements/Images";
import Videos from "../pages/UiElements/Videos";
import UserProfiles from "../pages/UserProfiles";
import Brands from "../pages/products/Brands/brands";
import Categories from "../pages/products/Categories/categories";
import CreateBrand from "../pages/products/Brands/createBrand";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" replace />} />

      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/password/reset/:token" element={<ResetPassword />} />
      <Route path="/verify-email/:token" element={<VerifyEmail />} />

      <Route element={<AppLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/brands/create" element={<CreateBrand />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:id" element={<UserProfiles />} />
        <Route path="/sub-categories" element={<Calendar />} />
        <Route path="/sub-categories/:id" element={<Calendar />} />
        <Route path="/units" element={<Blank />} />
        <Route path="/units/:id" element={<Blank />} />
        <Route path="/sub-units/:id" element={<FormElements />} />
        <Route path="/profile" element={<UserProfiles />} />

        <Route path="/alerts" element={<Alerts />} />
        <Route path="/avatars" element={<Avatars />} />
        <Route path="/badge" element={<Badges />} />
        <Route path="/buttons" element={<Buttons />} />
        <Route path="/images" element={<Images />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/line-chart" element={<LineChart />} />
        <Route path="/bar-chart" element={<BarChart />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesComponent;
