import { Users } from "../searchPanel/index";
import { Table } from "antd";
import dayjs from "dayjs";
interface Project {
  id: string;
  name: string;
  personId: string;
  organization: string;
  created: number;
}
interface tabList {
  list: Project[];
  users: Users[];
}
function TableList({ list, users }: tabList) {
  return (
    <Table
      dataSource={list}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "部门",
          dataIndex: "organization",
          key: "organization",
        },
        {
          title: "负责人",
          dataIndex: "person",
          key: "person",
          render(text, record, index) {
            return (
              <span>
                {users.find((user: Users) => user.id === record.personId)
                  ?.name || "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          dataIndex: "created",
          key: "created",
          render: (value, row) => {
            return (
              <span>
                {row.created ? dayjs(row.created).format("YYYY-MM-DD") : "-"}
              </span>
            );
          },
        },
      ]}
      rowKey={(record) => record.id}
    ></Table>
  );
}
export default TableList;
