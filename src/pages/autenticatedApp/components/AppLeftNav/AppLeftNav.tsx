import React, { useCallback } from "react";
import { Layout, MenuProps, Menu } from "antd";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { IRoute } from "types/router";
import { Link, useRoutes } from "react-router-dom";
import { MENUS } from "router/RouterConfig";

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
        key: route.path,
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
export default function AppLeftNav() {
  const items = assemble(MENUS);
  console.log(items);
  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
        items={items}
      />
    </Sider>
  );
}
