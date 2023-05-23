import ProjectListPage from "pages/autenticatedApp/projectList";
import { IRoute } from "types/router";
import { CopyTwoTone } from "@ant-design/icons";
const project: IRoute[] = [
  {
    path: "/projects",
    label: "项目管理",
    icon: <CopyTwoTone />,
    children: [
      {
        path: "kanban",
        label: "看板",
        children: [
          {
            path: "task1",
            label: "任务1",
            children: [
              {
                path: "hello",
                label: "hello",
                element: <ProjectListPage />,
              },
            ],
          },
        ],
      },
      {
        path: "task",
        element: <ProjectListPage />,
        label: "任务组",
      },
    ],
  },
];
export default project;
