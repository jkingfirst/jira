import { Menu, MenuProps } from "antd";
import { Layout } from "antd";
import React from "react";
import { ReactComponent as SortwareLogo } from "assets/software-logo.svg";
import styles from "./index.module.scss";
const { Header } = Layout;
let temA = [];
for (let i = 0; i < 20; i++) {
  temA.push(i);
}
const items1: MenuProps["items"] = temA.map((key) => ({
  key,
  label: `nav ${key}`,
}));
export default function AppHstyleseader() {
  return (
    <Header className={styles.header}>
      <div className={styles.logo}>
        <SortwareLogo width={"9rem"} color={"rgb(38, 132, 255)"} />
      </div>
      <div className={styles.nav}>
        <Menu mode="horizontal" defaultSelectedKeys={["1"]} items={items1} />
      </div>
    </Header>
  );
}
