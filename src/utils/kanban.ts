import { Project } from "../types/project";
import { useHttp } from "./httpRequest";
import { useCallback } from "react";
import { deleteObjEmptyProperty } from "./tools";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "../types/kanban";
import { useAddConfig } from "./useOptimisticUpdate";

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
export const useAddKanban = (queryKey: QueryKey) => {
  const add = useHttp();
  const { ...asyncResult } = useMutation((params: Partial<Kanban>) => {
    return add(`/kanbans`, {
      method: "POST",
      data: params,
    });
  }, useAddConfig(queryKey));

  return {
    ...asyncResult,
  };
};
export const useDeleteKanban = (queryKey: QueryKey) => {
  const add = useHttp();
  const { ...asyncResult } = useMutation((params: Partial<Kanban>) => {
    return add(`/kanbans/${params.id}`, {
      method: "DELETE",
    });
  }, useAddConfig(queryKey));

  return {
    ...asyncResult,
  };
};
