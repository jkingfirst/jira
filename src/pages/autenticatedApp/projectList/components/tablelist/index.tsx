import { Users } from "../searchPanel/index";
import { Table } from "antd";
interface Project {
  id: string;
  name: string;
  personId: string;
  organization: string;
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
        },
        {
          title: "负责人",
          dataIndex: "person",
          render(text, record, index) {
            return (
              <span>
                {users.find((user: Users) => user.id === record.personId)
                  ?.name || "未知"}
              </span>
            );
          },
        },
      ]}
    ></Table>
  );
}
export default TableList;
