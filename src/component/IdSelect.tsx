import React from "react";
import { Select } from "antd";
import { raw } from "../types/user";
type selectProps = React.ComponentProps<typeof Select>;
interface IdSelectProps
  extends Omit<selectProps, "value" | "onChange" | "options"> {
  value: raw | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((item) => {
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
