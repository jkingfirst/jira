import { Row, ScreenContainer } from "../../../component/libStyle";
import { useCurrentProject, useTaskSearchParams } from "../kanban/util";
import { Button, List } from "antd";
import { useDeleteEpic, useEpics } from "../../../utils/epic";
import { useCreateEpic, useEpicQueryKey, useEpicSearchParams } from "./util";
import dayjs from "dayjs";
import { useTasks } from "../../../utils/task";
import { Link } from "react-router-dom";
import { findAllByDisplayValue } from "@testing-library/react";
import { CreateEpic } from "./components/createEpic/createEpic";

export default function TaskGroupsPage() {
  const { data: currentProject } = useCurrentProject();
  const { data: taskgroups } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks(useTaskSearchParams());
  const { open } = useCreateEpic();
  const { mutateAsync: delEpic } = useDeleteEpic(useEpicQueryKey());
  const deleteEpic = (id: number) => {
    delEpic(id);
  };
  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>{currentProject?.name}看板</h1>
        <Button size={"small"} onClick={open}>
          创建任务组
        </Button>
      </Row>
      <List
        dataSource={taskgroups}
        itemLayout={"vertical"}
        renderItem={(epic) => {
          return (
            <List.Item>
              <List.Item.Meta
                title={
                  <Row between={true}>
                    <span>{epic.name}</span>
                    <Button type={"link"} onClick={() => deleteEpic(epic.id)}>
                      删除
                    </Button>
                  </Row>
                }
                description={
                  <>
                    <div>
                      开始时间：
                      {dayjs(epic.start).format("yyyy-MM-DD hh:mm:ss")}
                    </div>
                    <div>
                      结束时间：{dayjs(epic.end).format("yyyy-MM-DD hh:mm:ss")}
                    </div>
                  </>
                }
              />
              <div>
                {tasks
                  ?.filter((task) => task.epicId === epic.id)
                  ?.map((item) => (
                    <div>
                      <Link
                        to={`/projects/${currentProject?.id}/kanban?taskId=${item.id}`}
                        key={item.id}
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))}
              </div>
            </List.Item>
          );
        }}
      />
      <CreateEpic />
    </ScreenContainer>
  );
}
