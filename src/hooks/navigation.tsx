import { IRoute, MenuItemType } from "../types/router";
import { Link } from "react-router-dom";
import { useCallback, useState } from "react";
import { isAvailableArray } from "../utils/tools";
import { routes } from "../router/RouterConfig";
export type IBreadCrumb = Record<string, string>;
interface IReturn {
  subMenus: MenuItemType[];
  breadCrumbMaps: IBreadCrumb;
}
let breadMaps: IBreadCrumb = {};
export const useMenus = () => {
  let breadCrumbMaps: IBreadCrumb = {};
  const assembleMenu = useCallback(
    (routes: IRoute[], basePath?: string): MenuItemType[] => {
      let subMenus = routes
        .map((route) => {
          let routePath = basePath
            ? `${basePath}/${route.path}`
            : `${route.path}`;
          console.log(routePath, "+++++");
          breadMaps[routePath] = route.label || "";

          return {
            hideInMenu: route.hideInMenu,
            label: isAvailableArray<IRoute>(route.children || []) ? (
              route.label
            ) : (
              <Link to={routePath}>{route.label}</Link>
            ),
            key: routePath,
            path: routePath,
            icon: route.icon,
            children: isAvailableArray(route.children || [])
              ? assembleMenu(route.children || [], routePath)
              : undefined,
          };
        })
        .filter((route) => !route.hideInMenu);
      return subMenus;
    },
    []
  );

  const assembleBreadCrumb = useCallback(
    (routes: IRoute[], basePath?: string): IBreadCrumb => {
      routes.map((route) => {
        let routePath = basePath
          ? `${basePath}/${route.path}`
          : `${route.path}`;
        breadCrumbMaps[routePath] = route.label || "";
        if (route.children) {
          assembleBreadCrumb(route.children, routePath);
        }
      });
      return breadCrumbMaps;
    },
    [breadCrumbMaps]
  );
  return {
    assembleMenu,
    assembleBreadCrumb,
  };
};
