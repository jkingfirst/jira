import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { deleteObjEmptyProperty } from "./tools";
// https://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js
export const useUrlQueryParams = <k extends string>(keys: k[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in k]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params: Partial<{ [key in k]: unknown }>) => {
      const o = deleteObjEmptyProperty({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParam(o);
    },
  ] as const;
};
export const useSetSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (params: { [k in string]: unknown }) => {
    const o = deleteObjEmptyProperty({
      ...Object.entries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParams(o);
  };
};
