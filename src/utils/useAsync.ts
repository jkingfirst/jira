import { useState } from "react";

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
  const [state, setState] = useState<State<D>>(config);
  const setData = (data: D) =>
    setState({
      data: data,
      error: null,
      stat: "success",
    });
  const setError = (error: Error) =>
    setState({
      data: null,
      error: error,
      stat: "error",
    });
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入Promise对象");
    }
    setState({ ...state, stat: "runing" });
    return promise
      .then((res) => {
        setData(res);
        return res;
      })
      .catch((err) => {
        setError(err);
        return err;
      });
  };

  let obj = {
    isIdle: state.stat === "idle",
    isSuccess: state.stat === "success",
    isError: state.stat === "error",
    isRuning: state.stat === "runing",
    setData,
    setError,
    run,
    ...state,
  };
  return obj;
};
