import { useLocation } from "react-router";
import { useGetSingleProject } from "../../../utils/project";
import { useKanbans } from "../../../utils/kanban";
import { useTask, useTasks } from "../../../utils/task";
import { useUrlQueryParams } from "../../../utils/url";
import { useCallback, useMemo } from "react";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};
export const useCurrentProject = () => useGetSingleProject(useProjectIdInUrl());
export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });
export const useKanbanQueryKey = () => ["kanbans", useKanbanSearchParams()];
export const useTaskSearchParams = () => {
  const [params] = useUrlQueryParams([
    "name",
    "typeId",
    "processorId",
    "tagId",
  ]);
  const projectId = useProjectIdInUrl();
  return useMemo(() => {
    return {
      projectId: projectId,
      typeId: Number(params.typeId) || undefined,
      name: params.name,
      tagId: Number(params.tagId) || undefined,
      processorId: Number(params.processorId) || undefined,
    };
  }, [params, projectId]);
};
export const useTaskQueryKey = () => ["tasks", useTaskSearchParams()];
export const useTaskModal = () => {
  const [{ taskId }, setTaskId] = useUrlQueryParams(["taskId"]);
  const { data: editingTask, isLoading } = useTask(Number(taskId));
  const startEdit = useCallback(
    (id: number) => {
      setTaskId({ taskId: id });
    },
    [setTaskId]
  );
  const close = useCallback(() => {
    setTaskId({ taskId: "" });
  }, [setTaskId]);
  return {
    startEdit,
    close,
    isLoading,
    taskId,
    editingTask,
  };
};
