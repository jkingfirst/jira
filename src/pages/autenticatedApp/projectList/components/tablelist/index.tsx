import { user } from "types/user";
import { Table } from "antd";
import dayjs from "dayjs";
import { TableProps } from "antd/es/table";
import ProjectPage from "pages/autenticatedApp/project/project";
import { Link, useRouteMatch } from "react-router-dom";
export interface Project {
  id: string;
  name: string;
  personId: string;
  organization: string;
  created: number;
}
interface tabList extends TableProps<Project> {
  users: user[];
}
function TableList({ users, ...props }: tabList) {
  let { path, url } = useRouteMatch();
  console.log(path, url);
  return (
    <>
      <Table
        {...props}
        columns={[
          {
            title: "名称",
            dataIndex: "name",
            key: "name",
            render: (value, row) => {
              return <Link to={`${url}/${String(row.id)}`}>{value}</Link>;
            },
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
                  {users.find(
                    (user: user) => Number(user.id) === Number(record.personId)
                  )?.name || "未知"}
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
    </>
  );
}
export default TableList;
