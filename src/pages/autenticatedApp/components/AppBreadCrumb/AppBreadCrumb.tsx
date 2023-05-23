import React from "react";
import { Layout, Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import { useMenus } from "../../../../hooks/navigation";
import { MENUS } from "../../../../router/RouterConfig";
import { Link } from "react-router-dom";
export default function AppBreadCrumb() {
  const { assembleBreadCrumb } = useMenus();
  const breadCrumbMaps = assembleBreadCrumb(MENUS);
  console.log(breadCrumbMaps, "🔥");
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadCrumbMaps[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">首页</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return <Breadcrumb>{breadcrumbItems}</Breadcrumb>;
}
