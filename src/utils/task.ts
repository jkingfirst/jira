import { Kanban } from "../types/kanban";
import { useHttp } from "./httpRequest";
import { useCallback } from "react";
import { deleteObjEmptyProperty } from "./tools";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "../types/task";
import { useAddConfig } from "./useOptimisticUpdate";

export const useTasks = (params?: Partial<Task>) => {
  const PList = useHttp();
  const getPromise = useCallback(
    () => PList("/tasks", { data: deleteObjEmptyProperty(params || {}) }),
    [PList, params]
  );
  const { ...result } = useQuery<Task[]>(["tasks", params], async () =>
    getPromise()
  );
  return result;
};
/*
 * @desc 任务详情
 * */
export const useTask = (id?: number) => {
  const getSingleTask = useHttp();
  return useQuery("singleTask", () => getSingleTask(`/tasks/${id}`, {}), {
    enabled: Boolean(id),
  });
};
export const useAddTask = (queryKey: QueryKey) => {
  const add = useHttp();
  const { ...asyncResult } = useMutation((params: Partial<Task>) => {
    return add(`/tasks`, {
      method: "POST",
      data: params,
    });
  }, useAddConfig(queryKey));

  return {
    ...asyncResult,
  };
};
export const useEditTask = (queryKey: QueryKey) => {
  const add = useHttp();
  const { ...asyncResult } = useMutation((params: Partial<Task>) => {
    return add(`/tasks/${params.id}`, {
      method: "PATCH",
      data: params,
    });
  }, useAddConfig(queryKey));

  return {
    ...asyncResult,
  };
};
export const useDeleteTask = (queryKey: QueryKey) => {
  const add = useHttp();
  const { ...asyncResult } = useMutation((params: Partial<Task>) => {
    return add(`/tasks/${params.id}`, {
      method: "DELETE",
    });
  }, useAddConfig(queryKey));

  return {
    ...asyncResult,
  };
};
