import { RouteObject } from "react-router-dom";
import { ReactNode } from "react";
import type { MenuProps } from "antd";

export type IRoute = Omit<RouteObject, "children" | "index"> & {
  label?: string; // 导航名称
  icon?: ReactNode; // 导航图标
  hideInMenu?: boolean; // 是否显示
  children?: IRoute[];
};
type MenuItem = Required<MenuProps>["items"][number];
export type MenuItemType = MenuItem & {};
