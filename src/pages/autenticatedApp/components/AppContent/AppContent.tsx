import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
const { Content } = Layout;
export default function AppContent() {
  return (
    <Content
      className="site-layout-background"
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
      }}
    >
      hello word
      <Outlet />
    </Content>
  );
}
