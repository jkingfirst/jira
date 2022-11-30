import { useCallback, useEffect } from "react";
import { deleteObjEmptyProperty } from "./tools";
import { useAsync } from "./useAsync";
import { useHttp } from "./httpRequest";
import { Project } from "types/project";
import { useMutation, useQuery, useQueryClient } from "react-query";
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
export const useEditProject = () => {
  const edit = useHttp();
  const queryClient = useQueryClient();
  const { ...asyncResult } = useMutation(
    (params: Partial<Project>) => {
      return edit(`/projects/${params.id}`, {
        method: "PATCH",
        data: params,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("projectList");
      },
    }
  );

  return {
    ...asyncResult,
  };
};
export const useAddProject = () => {
  const add = useHttp();
  const queryClient = useQueryClient();
  const { ...asyncResult } = useMutation(
    (params: Partial<Project>) => {
      return add(`/projects`, {
        method: "POST",
        data: params,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("projectList");
      },
    }
  );

  return {
    ...asyncResult,
  };
};
