import React, { useCallback, useState } from "react";
import { Layout, MenuProps, Menu } from "antd";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { IRoute } from "types/router";
import { Link, useRoutes } from "react-router-dom";
import { MENUS } from "router/RouterConfig";
import { useMenus } from "../../../../hooks/navigation";

const { Sider } = Layout;

// const menus = assemble(routes)
function assemble(routes: IRoute[], basePath?: string): any {
  const menus = routes
    .map((route, index) => {
      let routePath = basePath ? `${basePath}/${route.path}` : `${route.path}`;
      console.log(routePath, "+++++");
      return {
        label:
          route.children && route.children.length > 0 ? (
            route.label
          ) : (
            <Link to={routePath}>{route.label}</Link>
          ),
        key: routePath,
        path: route.path,
        icon: route.icon,
        hideInMenu: route.hideInMenu,
        children:
          route.children &&
          route.children.length > 0 &&
          assemble(route.children, routePath),
      };
    })
    .filter((route) => !route.hideInMenu);
  return menus;
}
let keys: string[] = [];
const getDefaultOpenKeys = (Obj: MenuItemType) => {
  for (let key in Obj) {
    if (key === "path") {
      keys.push(Obj["path"]);
    }
    if (Obj.children && Obj.children.length > 0) {
      getDefaultOpenKeys(Obj.children[0]);
    }
  }
  return keys;
};
interface MenuItemType {
  path: string;
  label: string;
  children?: MenuItemType[];
  key: string;
  hideInMenu?: boolean;
}
export default function AppLeftNav() {
  const { assembleMenu } = useMenus();
  const subMenus = assembleMenu(MENUS);
  console.log(3222222222222);
  console.log(subMenus);
  let openKeys = [
    "/projects",
    "/projects/kanban",
    "/projects/kanban/task1",
    "/projects/kanban/task1/hello",
  ];
  const onOpenChange = (openKeys: string[]) => {
    console.log(openKeys);
  };
  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100%", borderRight: 0 }}
        items={subMenus}
        defaultOpenKeys={openKeys}
        selectedKeys={openKeys}
        onOpenChange={onOpenChange}
      />
    </Sider>
  );
}
