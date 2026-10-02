import { Routes, Route } from "react-router-dom";

import FoodMenuPage from "../app/(MainLayout)/food-menu/page";
import SettingsPage from "../app/(MainLayout)/settings/page";
import Layout from "../app/(MainLayout)/layout";
import LoginPage from "../app/login/page";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<Layout/>}>
        <Route path="/food-menu" element={<FoodMenuPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}