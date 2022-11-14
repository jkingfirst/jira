import { useEffect } from "react";
import { deleteObjEmptyProperty } from "./tools";
import { useAsync } from "./useAsync";
import { useHttp } from "./httpRequest";
import { Project } from "types/project";
export const useProject = (params: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const PList = useHttp();
  const getPromise = () =>
    PList("/projects", { data: deleteObjEmptyProperty(params) });
  useEffect(() => {
    run(getPromise(), {
      refresh: getPromise,
    });
  }, [params]);
  return result;
};
export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const edit = useHttp();
  const mutate = (params: Partial<Project>) => {
    console.log("点击");
    return run(
      edit(`/projects/${params.id}`, {
        method: "PATCH",
        data: params,
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
