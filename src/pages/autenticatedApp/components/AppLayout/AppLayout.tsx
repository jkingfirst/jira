import { Layout } from "antd";
import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import AppLeftNav from "../AppLeftNav/AppLeftNav";
import AppContent from "../AppContent/AppContent";
import AppFooter from "../AppFooter/AppFooter";
import AppBreadCrumb from "../AppBreadCrumb/AppBreadCrumb";
import styled from "@emotion/styled";
const AppLayout: React.FC = () => (
  <LayoutContainer>
    <Layout>
      <AppHeader />
      <Layout>
        <AppLeftNav />
        <Layout style={{ padding: "0 24px 24px" }}>
          <AppBreadCrumb />
          <AppContent />
          <AppFooter />
        </Layout>
      </Layout>
    </Layout>
  </LayoutContainer>
);

export default AppLayout;
const LayoutContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;
