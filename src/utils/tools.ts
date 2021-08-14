import { useState, useEffect } from "react";
export const isFalse = (val: unknown) => {
  // unknown 可以代替any,却能有严格的限制 unknown不能赋值给任何变量
  return val === 0 ? false : !val;
};
export const deleteObjEmptyProperty = (obj: object) => {
  let tempObj: object = { ...obj };
  for (let key in tempObj) {
    // @ts-ignore
    if (isFalse(tempObj[key])) {
      // @ts-ignore
      delete tempObj[key];
    }
  }
  return tempObj;
};
export const useDebounce = <T>(value: T, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounceValue;
};
export const useArray = <T>(arr: T[]) => {
  const [list, setList] = useState(arr);
  return {
    list,
    setList,
    addItem: (item: T) => {
      setList([...list, item]);
    },
    clear: () => setList([]),
    removeItem: (index: number) => {
      let copy = [...list];
      copy.splice(index, 1);
      setList(copy);
    },
  };
};
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};
