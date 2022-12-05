import React from "react";
import { IdSelect } from "../IdSelect";
import { useTaskTypes } from "../../utils/taskType";

export default function (props: React.ComponentProps<typeof IdSelect>) {
  const { data: taskTypes } = useTaskTypes();
  return (
    <IdSelect options={taskTypes || []} defaultOptionName={"类型"} {...props} />
  );
}
