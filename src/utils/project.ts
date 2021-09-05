import { useEffect, useState } from "react";
import { deleteObjEmptyProperty, useMount } from "./tools";
import { useAsync } from "./useAsync";
import { useHttp } from "./httpRequest";
import { Project } from "pages/autenticatedApp/projectList/components/tablelist/index";
export const useProject = (params: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const PList = useHttp();
  useEffect(() => {
    run(PList("/projects", { data: deleteObjEmptyProperty(params) }));
  }, [params]);
  return result;
};
