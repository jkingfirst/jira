import { Kanban } from "../types/kanban";
import { useHttp } from "./httpRequest";
import { useCallback } from "react";
import { deleteObjEmptyProperty } from "./tools";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Epic } from "../types/epic";
import { useAddConfig } from "./useOptimisticUpdate";

export const useEpics = (params?: Partial<Epic>) => {
  const PList = useHttp();
  const getPromise = useCallback(
    () => PList("/epics", { data: deleteObjEmptyProperty(params || {}) }),
    [PList, params]
  );
  const { ...result } = useQuery<Epic[]>(["epics", params], async () =>
    getPromise()
  );
  return result;
};
export const useAddEpic = (queryKey: QueryKey) => {
  const http = useHttp();
  return useMutation(
    (params?: Partial<Epic>) =>
      http("/epics", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};
export const useDeleteEpic = (queryKey: QueryKey) => {
  const http = useHttp();
  return useMutation(
    (id: number) =>
      http(`/epics/${id}`, {
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};
