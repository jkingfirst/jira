import React, { useCallback } from "react";
import { Layout, MenuProps, Menu } from "antd";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { IRoute } from "types/router";
import { Link, useRoutes } from "react-router-dom";
import { routes } from "router/RouterConfig";

const { Sider } = Layout;
const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

// const menus = assemble(routes)
function assemble(routes: IRoute[]): any {
  const menus = routes.map((route, index) => {
    return {
      label: <Link to={`/${route.path}`}>{route.label}</Link>,
      key: route.path,
      icon: route.icon,
      children:
        route.children && route.children.length > 0 && assemble(route.children),
    };
  });
  return menus;
}
export default function AppLeftNav() {
  const items = assemble(routes);
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
