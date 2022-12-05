import { Kanban } from "../types/kanban";
import { useHttp } from "./httpRequest";
import { useCallback } from "react";
import { deleteObjEmptyProperty } from "./tools";
import { useQuery } from "react-query";

export const useTaskTypes = (params?: Partial<Kanban>) => {
  const PList = useHttp();
  const getPromise = useCallback(
    () => PList("/taskTypes", { data: deleteObjEmptyProperty(params || {}) }),
    [PList, params]
  );
  const { ...result } = useQuery<Kanban[]>(["taskTypes", params], async () =>
    getPromise()
  );
  return result;
};
