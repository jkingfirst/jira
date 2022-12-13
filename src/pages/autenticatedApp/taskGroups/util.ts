import { useProjectIdInUrl } from "../kanban/util";
import { useUrlQueryParams } from "../../../utils/url";
import { useCallback } from "react";

export const useEpicSearchParams = () => ({ projectId: useProjectIdInUrl() });
export const useEpicQueryKey = () => ["epics", useEpicSearchParams()];
export const useCreateEpic = () => {
  const [{ createEpic }, setCreateEpic] = useUrlQueryParams(["createEpic"]);
  const open = useCallback(() => {
    setCreateEpic({ createEpic: true });
  }, [setCreateEpic]);
  const close = useCallback(() => {
    setCreateEpic({ createEpic: "" });
  }, [setCreateEpic]);
  const isOpen = createEpic === "true";
  return {
    isOpen,
    open,
    close,
  };
};
