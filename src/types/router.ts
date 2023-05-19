import { RouteObject } from "react-router-dom";
import { ReactNode } from "react";

export type IRoute = Omit<RouteObject, "children" | "index"> & {
  label?: string; // 导航名称
  children?: IRoute[];
  icon?: ReactNode; // 导航图标
  isFullScreen?: boolean; // 是否是全屏页面
};
interface A {
  index: true;
  label: string;
  c: number;
}
interface B {
  index?: false;
  label: string;
  c: number;
}
export type AB = A | B;
type C = Omit<AB, "index" | "label">;
