import React from "react";
import { IdSelect } from "../IdSelect";
import { useUsers } from "../../utils/user";

export default function (props: React.ComponentProps<typeof IdSelect>) {
  const { data: users } = useUsers();
  return (
    <IdSelect options={users || []} defaultOptionName={"负责人"} {...props} />
  );
}
