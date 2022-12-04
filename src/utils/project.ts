import { useCallback, useEffect } from "react";
import { deleteObjEmptyProperty } from "./tools";
import { useAsync } from "./useAsync";
import { useHttp } from "./httpRequest";
import { Project } from "types/project";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useProjectSearchParams } from "../pages/autenticatedApp/projectList/util";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./useOptimisticUpdate";
export const useProject = (params?: Partial<Project>) => {
  const PList = useHttp();
  const getPromise = useCallback(
    () => PList("/projects", { data: deleteObjEmptyProperty(params || {}) }),
    [PList, params]
  );
  const { ...result } = useQuery<Project[]>(["projectList", params], async () =>
    getPromise()
  );
  return result;
};
export const useGetSingleProject = (id?: number) => {
  const getSingleProject = useHttp();
  return useQuery(
    "singleProject",
    () => getSingleProject(`/projects/${id}`, {}),
    {
      enabled: Boolean(id),
    }
  );
};
export const useEditProject = (queryKey: QueryKey) => {
  const edit = useHttp();
  const { ...asyncResult } = useMutation((params: Partial<Project>) => {
    return edit(`/projects/${params.id}`, {
      method: "PATCH",
      data: params,
    });
  }, useEditConfig(queryKey));

  return {
    ...asyncResult,
  };
};
export const useAddProject = (queryKey: QueryKey) => {
  const add = useHttp();
  const { ...asyncResult } = useMutation((params: Partial<Project>) => {
    return add(`/projects`, {
      method: "POST",
      data: params,
    });
  }, useAddConfig(queryKey));

  return {
    ...asyncResult,
  };
};
export const useDeleteProject = (queryKey: QueryKey) => {
  const del = useHttp();
  const { ...asyncResult } = useMutation((params: Partial<Project>) => {
    return del(`/projects/${params.id}`, {
      method: "DELETE",
    });
  }, useDeleteConfig(queryKey));

  return {
    ...asyncResult,
  };
};
