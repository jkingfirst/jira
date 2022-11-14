import { useState, useEffect, useRef } from "react";
export const isFalse = (val: unknown) => {
  // unknown 可以代替any,却能有严格的限制 unknown不能赋值给任何变量
  return val === 0 ? false : !val;
};
export const isVoid = (val: unknown) =>
  val === undefined || val === null || val === "";
// Object对象可能是{a:'a'} 或函数()=>{}, 或 newRegExp() 这里我们需要键值对形式
export const deleteObjEmptyProperty = (obj: { [key: string]: unknown }) => {
  let tempObj = { ...obj };
  for (let key in tempObj) {
    if (isVoid(tempObj[key])) {
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
// 首次加载
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
// 页面标题
export const useDocumentTitle = (title: string, keepUnMounted = true) => {
  let oldTitle = useRef(document.title).current;
  //console.log("渲染oldtitle", oldTitle);
  useEffect(() => {
    document.title = title;
    return () => {
      if (!keepUnMounted) {
        // console.log("卸载oldtitle", oldTitle);
        document.title = oldTitle;
      }
    };
  }, [title, oldTitle, keepUnMounted]);
};
export const resetRoute = () => {
  window.location.href = window.location.origin;
};

export const useUnmountedRef = () => {
  const unmounted = useRef(false);
  useEffect(() => {
    unmounted.current = true;
    return () => {
      unmounted.current = false;
    };
  });
  return unmounted.current;
};
