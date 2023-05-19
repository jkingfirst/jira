import { Menu, MenuProps } from "antd";
import { Layout } from "antd";
import "./index.scss";
import React from "react";
import { ReactComponent as SortwareLogo } from "assets/software-logo.svg";
const { Header } = Layout;
const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));
export default function AppHeader() {
  return (
    <Layout>
      <Header className="header">
        <div className="logo">
          <SortwareLogo width={"9rem"} color={"rgb(38, 132, 255)"} />
        </div>
        <Menu mode="horizontal" defaultSelectedKeys={["2"]} items={items1} />
      </Header>
    </Layout>
  );
}
