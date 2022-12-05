import { useLocation } from "react-router";
import { useGetSingleProject } from "../../../utils/project";
import { useKanbans } from "../../../utils/kanban";
import { useTasks } from "../../../utils/task";
import { useUrlQueryParams } from "../../../utils/url";
import { useMemo } from "react";

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
