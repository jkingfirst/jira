import { useSetSearchParams, useUrlQueryParams } from "utils/url";
import { useGetSingleProject } from "utils/project";
import { useMemo } from "react";
export const useProjectSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["personId", "name"]);
  return [
    useMemo(() => {
      return { ...params, personId: Number(params.personId) || undefined };
    }, [params, setParams]),
    setParams,
  ];
};
export const useProjectQueryKey = () => {
  let [queryKey] = useProjectSearchParams();
  return ["projectList", queryKey];
};
export const useCreateModal = () => {
  const [{ createProject }, setCreateProject] = useUrlQueryParams([
    "createProject",
  ]);
  const [{ editProjectId }, setEditProjectId] = useUrlQueryParams([
    "editProjectId",
  ]);
  const setSearchParams = useSetSearchParams();
  const open = () => setCreateProject({ createProject: true });
  const close = () => {
    setCreateProject({ createProject: "" });
    setSearchParams({
      createProject: "",
      editProjectId: "",
    });
  };
  const { data: editProject, isLoading } = useGetSingleProject(
    Number(editProjectId)
  );
  const setProjectID = (id: number) => setEditProjectId({ editProjectId: id });
  return {
    createProjectOpen: createProject === "true" || Boolean(editProjectId),
    editProjectId,
    open,
    close,
    setProjectID,
    editProject,
    isLoading,
  } as const;
};
