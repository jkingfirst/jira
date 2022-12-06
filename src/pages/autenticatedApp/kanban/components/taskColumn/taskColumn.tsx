import React from "react";
import { Kanban } from "types/kanban";
import { useTasks } from "../../../../../utils/task";
import {
  useKanbanQueryKey,
  useTaskModal,
  useTaskSearchParams,
} from "../../util";
import { useTaskTypes } from "../../../../../utils/taskType";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { CreateTask } from "../createTask/createTask";
import { Task } from "../../../../../types/task";
import { Mark } from "../../../../../component/mark/mark";
import { useUrlQueryParams } from "../../../../../utils/url";
import { Row } from "../../../../../component/libStyle";
import { useDeleteKanban } from "../../../../../utils/kanban";
export const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: types } = useTaskTypes();
  const name = types?.find((item) => item.id === id)?.name;
  if (!name) {
    return null;
  }
  return <img src={name === "task" ? taskIcon : bugIcon} alt="" />;
};
const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTaskModal();
  const [{ name: keyword }] = useUrlQueryParams(["name"]);
  return (
    <Card key={task.id} onClick={() => startEdit(task.id)}>
      <Mark keyword={keyword} name={task.name} />
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};
export const TaskColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTaskSearchParams());
  const tasks = allTasks?.filter((item) => item.kanbanId === kanban.id);
  return (
    <Contaienr>
      <Row between={true}>
        <h3>{kanban.name}</h3>
        <More kanban={kanban} />
      </Row>
      <TasksContainer>
        {tasks?.map((item) => {
          return <TaskCard task={item} key={item.id}></TaskCard>;
        })}
        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </Contaienr>
  );
};
const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync } = useDeleteKanban(useKanbanQueryKey());

  const deleteKanban = async () => {
    Modal.confirm({
      title: "温馨提示",
      content: "确定要删除次面板",
      onOk: () => {
        mutateAsync({ id: kanban.id });
      },
      onCancel: () => {},
    });
  };
  const menu = () => (
    <Menu>
      <Menu.Item key={"删除"} onClick={deleteKanban}>
        删除
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <Button type={"link"}>...</Button>
    </Dropdown>
  );
};
export const Contaienr = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;
const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
