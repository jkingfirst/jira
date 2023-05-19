import { createBrowserRouter } from "react-router-dom";
import AppLayout from "pages/autenticatedApp/components/AppLayout/AppLayout";
import unAuthorized from "./modules/unAuthorized/unAuthorized";
import project from "./modules/project/project";
import { IRoute } from "../types/router";
import { LaptopOutlined } from "@ant-design/icons";
import Home from "pages/autenticatedApp/Home/Home";
const routes: IRoute[] = [
  {
    path: "/home",
    element: <AppLayout />,
    label: "首页",

    icon: <LaptopOutlined />,
  },
  ...unAuthorized,
  ...project,
];
const router = createBrowserRouter(routes);
export default router;
export { routes };
