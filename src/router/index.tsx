import { Routes, Route } from "react-router-dom";

import FoodMenuPage from "../app/food-menu/page";
import SettingsPage from "../app/settings/page";
import Layout from "../app/layout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/food-menu" element={<FoodMenuPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}