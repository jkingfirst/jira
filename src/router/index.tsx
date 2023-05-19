import { RouterProvider } from "react-router-dom";
import router from "./RouterConfig";

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
