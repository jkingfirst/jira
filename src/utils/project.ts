import { useCallback, useEffect } from "react";
import { deleteObjEmptyProperty } from "./tools";
import { useAsync } from "./useAsync";
import { useHttp } from "./httpRequest";
import { Project } from "types/project";
export const useProject = (params: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const PList = useHttp();
  const getPromise = useCallback(
    () => PList("/projects", { data: deleteObjEmptyProperty(params) }),
    [PList, params]
  );
  useEffect(() => {
    run(getPromise(), {
      refresh: getPromise,
    });
  }, [params, run, getPromise]);
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
