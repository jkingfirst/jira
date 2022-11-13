import { useEffect } from "react";
import { deleteObjEmptyProperty } from "./tools";
import { useAsync } from "./useAsync";
import { useHttp } from "./httpRequest";
import { Project } from "types/project";
export const useProject = (params: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const PList = useHttp();
  useEffect(() => {
    run(PList("/projects", { data: deleteObjEmptyProperty(params) }));
  }, [params]);
  return result;
};
export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const edit = useHttp();
  const mutate = (params: Partial<Project>) => {
    run(
      edit(`projects/${params.id}`, {
        method: "PATH",
        data: params,
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
