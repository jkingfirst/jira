import { Project } from "../types/project";
import { useHttp } from "./httpRequest";
import { useCallback } from "react";
import { deleteObjEmptyProperty } from "./tools";
import { useQuery } from "react-query";
import { Kanban } from "../types/kanban";
import { Task } from "../types/task";

export const useKanbans = (params?: Partial<Kanban>) => {
  const PList = useHttp();
  const getPromise = useCallback(
    () => PList("/kanbans", { data: deleteObjEmptyProperty(params || {}) }),
    [PList, params]
  );
  const { ...result } = useQuery<Kanban[]>(["kanbans", params], async () =>
    getPromise()
  );
  return result;
};
