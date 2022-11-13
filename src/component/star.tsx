import React from "react";
import { Rate } from "antd";
interface starProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  change?: (value: boolean) => void;
}
export const Star = ({ checked, change, ...restProps }: starProps) => {
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(value) => change?.(!!value)}
      {...restProps}
    />
  );
};
