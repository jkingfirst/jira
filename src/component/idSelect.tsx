import React from "react";
import { Select } from "antd";
import { raw } from "../types/user";
interface IdSelectProps {
  value: raw | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options: { name: string; id: number }[];
}
export const idSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options } = props;
  return (
    <Select
      value={toNumber(value)}
      onChange={(value) => onChange(toNumber(value))}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options.map((item) => {
        return (
          <Select.Option value={item.id} key={item.id}>
            {item.name}
          </Select.Option>
        );
      })}
    </Select>
  );
};
const toNumber = (value: unknown) => {
  return isNaN(Number(value)) ? 0 : Number(value);
};
