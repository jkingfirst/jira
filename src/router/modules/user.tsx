import ProjectListPage from "pages/autenticatedApp/projectList";
import { IRoute } from "types/router";
import { SmileTwoTone } from "@ant-design/icons";
const project: IRoute[] = [
  {
    path: "/user",
    label: "用户管理",
    icon: <SmileTwoTone />,
    children: [
      {
        path: "list",
        label: "用户列表",
        element: <ProjectListPage />,
      },
      {
        path: "edit",
        element: <ProjectListPage />,
        label: "编辑用户",
      },
    ],
  },
];
export default project;
