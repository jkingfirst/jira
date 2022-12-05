import { Kanban } from "../types/kanban";
import { useHttp } from "./httpRequest";
import { useCallback } from "react";
import { deleteObjEmptyProperty } from "./tools";
import { useQuery } from "react-query";
import { Task } from "../types/task";

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
