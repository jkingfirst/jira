import { useEffect } from "react";
import { useAsync } from "./useAsync";
import { useHttp } from "./httpRequest";
import { user } from "types/user";
export const useUsers = (params?: Partial<user>) => {
  const { run, ...result } = useAsync<user[]>();
  const PList = useHttp();
  useEffect(() => {
    run(PList("/users", {}));
  }, []);
  return result;
};
