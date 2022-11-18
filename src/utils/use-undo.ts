import { useCallback, useReducer, useState } from "react";

export const useUndo1 = <T>(initValue: T) => {
  const [past, setPast] = useState<T[]>([]); // 历史合集
  const [present, setPresent] = useState<T>(initValue);
  const [future, setFuture] = useState<T[]>([]);
  const canUndo = past.length !== 0;
  const canRedo = future.length !== 0;
  const undo = useCallback(() => {
    if (!canUndo) return false;
    const currentPresent = past[past.length - 1];
    const currentPast = past.slice(0, past.length - 1);
    setPresent(currentPresent);
    setPast(currentPast);
    setFuture([currentPresent, ...future]);
  }, []);
  const redo = () => {
    if (!canRedo) return false;
    const currentPresent = future[0];
    const currentFuture = future.slice(1);
    setPresent(currentPresent);
    setFuture(currentFuture);
    setPast([...past, currentPresent]);
  };
  const set = (newPresent: T) => {
    if (newPresent === present) return false;
    const currentPresent = newPresent;
    const currentPast = [...past, currentPresent];
    setPast(currentPast);
    setPresent(currentPresent);
    setFuture([]);
  };
  const reset = (newPresent: T) => {
    setFuture([]);
    setPast([]);
    setPresent(newPresent);
  };
  return [
    { present, future, past },
    [undo, redo, set, canUndo, canRedo], // 如果在hook中返回函数一般是要加useCallBack
  ] as const;
};
/**
 * 改进版 同一个hook 有很多种状态，而且这几种状态又相互影响， 这时候，我们应该把这几种状态合并到一起，这样可以大大降低hook的复杂程度
 * */
export const useUndo2 = <T>(initValue: T) => {
  const [state, setState] = useState<{
    past: T[];
    present: T;
    future: T[];
  }>({
    past: [],
    present: initValue,
    future: [],
  });
  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;
  const undo = useCallback(() => {
    setState((currentState) => {
      const { past, future } = currentState;
      if (past.length === 0) return currentState;
      const currentPresent = past[past.length - 1];
      const currentPast = past.slice(0, past.length - 1);
      return {
        past: currentPast,
        present: currentPresent,
        future: [currentPresent, ...future],
      };
    });
  }, []);
  const redo = useCallback(() => {
    setState((currentState) => {
      const { past, future } = currentState;
      if (future.length === 0) return currentState;
      const currentPresent = future[0];
      const currentFuture = future.slice(1);
      return {
        present: currentPresent,
        future: currentFuture,
        past: [...past, currentPresent],
      };
    });
  }, []);
  const set = useCallback((newPresent: T) => {
    setState((currentState) => {
      const { present, past } = currentState;
      if (newPresent === present) return currentState;
      const currentPresent = newPresent;
      const currentPast = [...past, currentPresent];
      return {
        present: currentPresent,
        past: currentPast,
        future: [],
      };
    });
  }, []);
  const reset = useCallback((newPresent: T) => {
    setState(() => {
      return {
        past: [],
        future: [],
        present: newPresent,
      };
    });
  }, []);
  return [
    state,
    [undo, redo, set, canUndo, canRedo], // 如果在hook中返回函数一般是要加useCallBack
  ] as const;
};
/**
 * @desc 使用useReducer 替代useState , 进行改进
 * */
const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";
type State<T> = {
  present: T;
  past: T[];
  future: T[];
};
type Aciton<T> = {
  newPresent?: T;
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
};
const reducer = <T>(state: State<T>, action: Aciton<T>) => {
  const { present, past, future } = state;
  const { newPresent, type } = action;
  switch (type) {
    case UNDO:
      if (past.length === 0) return state;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [previous, ...future],
      };
      break;
    case REDO:
      if (future.length === 0) return state;
      const next = future[0];
      const newFuture = future.slice(1);
      return {
        present: next,
        future: newFuture,
        past: [...past, future],
      };
      break;
    case SET:
      if (newPresent === present) return state;
      const currentPresent = newPresent;
      const currentPast = [...past, currentPresent];
      return {
        present: currentPresent,
        past: currentPast,
        future: [],
      };
      break;
    case RESET:
      return {
        past: [],
        future: [],
        present: newPresent,
      };
      break;
    default:
      return state;
      break;
  }
};
export const useUndo3 = <T>(initValue: T) => {
  const [state, dispatch] = useReducer(reducer, {
    past: [],
    future: [],
    present: initValue,
  } as State<T>);
  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;
  const undo = useCallback(() => dispatch({ type: UNDO }), []);
  const redo = useCallback(() => dispatch({ type: REDO }), []);
  const set = useCallback(
    (newPresent: T) => dispatch({ newPresent, type: SET }),
    []
  );
  const reset = useCallback((newPresent: T) => dispatch({ type: RESET }), []);
  return [
    state,
    [undo, redo, set, reset, canUndo, canRedo], // 如果在hook中返回函数一般是要加useCallBack
  ] as const;
};
