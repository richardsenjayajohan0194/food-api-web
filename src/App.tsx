import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./router";

export default function App() {
  return (
    <div className="bg-taupe-100">
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    </div>
  );
}