import { useCallback, useReducer, useState } from "react";
import { useUnmountedRef } from "./tools";

interface State<D> {
  stat: "idle" | "runing" | "success" | "error";
  data: D | null;
  error: Error | null;
}
const defaultState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};
export const useAsync = <D>(initialState?: State<D>) => {
  const config = { ...defaultState, ...initialState };
  // const [state, setState] = useState<State<D>>(config);
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => {
      return { ...state, ...action };
    },
    config
  );
  const [refresh, setRefresh] = useState(() => () => {});
  const unmounted = useUnmountedRef();
  const setData = useCallback(
    (data: D) =>
      dispatch({
        data: data,
        error: null,
        stat: "success",
      }),
    []
  );
  const setError = useCallback(
    (error: Error) =>
      dispatch({
        data: null,
        error: error,
        stat: "error",
      }),
    []
  );
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { refresh: () => Promise<D> }) => {
      console.log(1234);
      if (!promise || !promise.then) {
        throw new Error("请传入Promise对象");
      }
      dispatch({
        ...state,
        stat: "runing",
      });
      setRefresh(() => () => {
        console.log("运行run promise");
        if (runConfig?.refresh) {
          run(runConfig?.refresh(), runConfig);
        }
      });
      return promise
        .then((res) => {
          if (unmounted.current) {
            setData(res);
          }
          return res;
        })
        .catch((err) => {
          setError(err);
          return err;
        });
    },
    [setData, setError, unmounted]
  );

  let obj = {
    isIdle: state.stat === "idle",
    isSuccess: state.stat === "success",
    isError: state.stat === "error",
    isRuning: state.stat === "runing",
    setData,
    setError,
    run,
    refresh,
    ...state,
  };
  return obj;
};
