import { user } from "types/user";
import { Button, Dropdown, Menu, Modal, Table } from "antd";
import dayjs from "dayjs";
import { TableProps } from "antd/es/table";
// react-router-dom 和react 关系类似 react 和react-dom类似
import { Link } from "react-router-dom";
import { Project } from "types/project";
import { Star } from "component/star";
import { useDeleteProject, useEditProject } from "utils/project";
import {
  useCreateModal,
  useProjectQueryKey,
  useProjectSearchParams,
} from "../../util";
interface tabList extends TableProps<Project> {
  users: user[];
  refresh?: () => void;
}
function TableList({ users, ...props }: tabList) {
  //  let { path, url } = useRouteMatch(); Router v5
  const queryKey = useProjectQueryKey();
  const { mutate } = useEditProject(queryKey);
  // const editProject = (id:number,pin:boolean) => => mutate({id,pin})
  const editProject = (id: number) => (pin: boolean) =>
    // mutate({ id, pin }).then(() => props.refresh?.()); // 函数柯里化 处理多个参数时候使用 useAsync
    mutate({ id, pin });
  const { setProjectID, open } = useCreateModal();
  return (
    <>
      <Table
        {...props}
        columns={[
          {
            title: <Star checked={true} />,
            render: (value, params) => {
              return (
                <Star checked={params.pin} change={editProject(params.id)} />
              );
            },
          },
          {
            title: "名称",
            dataIndex: "name",
            key: "name",
            render: (value, row) => {
              return <Link to={String(row.id)}>{value}</Link>;
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
          {
            title: "操作",
            render: (value, data) => {
              return <More project={data} />;
            },
          },
        ]}
        rowKey={(record) => record.id}
      ></Table>
    </>
  );
}
export default TableList;
const More = ({ project }: { project: Project }) => {
  const queryKey = useProjectQueryKey();
  const { mutate } = useEditProject(queryKey);
  const { mutate: delMutate } = useDeleteProject(queryKey);
  // const editProject = (id:number,pin:boolean) => => mutate({id,pin})
  const editProject = (id: number) => (pin: boolean) =>
    // mutate({ id, pin }).then(() => props.refresh?.()); // 函数柯里化 处理多个参数时候使用 useAsync
    mutate({ id, pin });
  const delProject = (id: number) => delMutate({ id });
  const { setProjectID, open } = useCreateModal();
  const confirmDeleteProjectModal = (id: number) => {
    Modal.confirm({
      title: "温馨提示",
      content: "确定要删除该项目",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        delProject(id);
      },
    });
  };
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item
            key={"编辑"}
            onClick={() => {
              setProjectID(project.id);
            }}
          >
            编辑
          </Menu.Item>
          <Menu.Item
            key={"删除"}
            onClick={() => {
              confirmDeleteProjectModal(project.id);
            }}
          >
            删除
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"}>...</Button>
    </Dropdown>
  );
};
