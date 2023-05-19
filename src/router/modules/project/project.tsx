import ProjectListPage from "pages/autenticatedApp/projectList";
import { IRoute } from "types/router";

const project: IRoute[] = [
  {
    path: "/projects",
    element: <ProjectListPage />,
    label: "项目管理",
    children: [
      {
        path: "kanban",
        element: <ProjectListPage />,
        label: "看板",
        children: [
          {
            path: "kanban",
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
