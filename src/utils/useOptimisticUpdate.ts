import { QueryKey, useQueryClient } from "react-query";
import { Project } from "../types/project";

export const useOptimisticUpdate = (
  queryKey: QueryKey,
  callBack: (target: any, old?: any[]) => any[]
) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
    onMutate: async (target: any) => {
      console.log(target, "+++++");
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (list?: any[]) => {
        return callBack(target, list);
      });
      return { previousItems };
    },
    onError(error: any, target: any, context: any) {
      queryClient.setQueryData(
        queryKey,
        (context as { previousItems: Project[] }).previousItems
      );
    },
  };
};
export const useDeleteConfig = (queryKey: QueryKey) =>
  useOptimisticUpdate(queryKey, (target, old) => {
    return old?.filter((item) => item.id !== target.id) || [];
  });
export const useEditConfig = (queryKey: QueryKey) =>
  useOptimisticUpdate(queryKey, (target, old) => {
    return (
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
    );
  });
export const useAddConfig = (queryKey: QueryKey) =>
  useOptimisticUpdate(queryKey, (target, old) => {
    return old ? [...old, target] : [target];
  });
