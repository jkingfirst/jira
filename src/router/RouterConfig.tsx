import { createBrowserRouter } from "react-router-dom";
import AppLayout from "pages/autenticatedApp/components/AppLayout/AppLayout";
import unAuthorized from "./modules/unAuthorized";
import project from "./modules/project";
import user from "./modules/user";
import { IRoute } from "../types/router";
import { LaptopOutlined } from "@ant-design/icons";
import React from "react";
export const MENUS = [...project, ...user];
const routes: IRoute[] = [
  {
    path: "/",
    element: <AppLayout />,
    label: "首页",
    icon: <LaptopOutlined />,
    children: MENUS,
  },
  ...unAuthorized,
];
const router = createBrowserRouter(routes);
export default router;
export { routes };
