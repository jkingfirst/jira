import { RouteObject } from "react-router-dom";
import { ReactNode } from "react";

export type IRoute = Omit<RouteObject, "children" | "index"> & {
  label?: string; // 导航名称
  icon?: ReactNode; // 导航图标
  hideInMenu?: boolean; // 是否显示
  children?: IRoute[];
};
interface A {
  label: number;
  index: true;
  c: number;
}
interface B {
  index?: false;
  label: string;
  c: number;
}
export type AB = A | B;
type C = Omit<AB, "label"> & {
  label?: boolean;
};
const c: C = {
  label: false,
  c: 1,
};
interface Pro {
  name: string;
}
interface Ta {
  name: number;
}
type MM = Pro & Ta;
