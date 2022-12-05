import React from "react";
import { Kanban } from "types/kanban";
import { useTasks } from "../../../../../utils/task";
import { useTaskSearchParams } from "../../util";
import { useTaskTypes } from "../../../../../utils/taskType";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import styled from "@emotion/styled";
import { Card } from "antd";
export const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: types } = useTaskTypes();
  const name = types?.find((item) => item.id === id)?.name;
  if (!name) {
    return null;
  }
  return <img src={name === "task" ? taskIcon : bugIcon} alt="" />;
};
export const TaskColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTaskSearchParams());
  const tasks = allTasks?.filter((item) => item.kanbanId === kanban.id);
  return (
    <Contaienr>
      <h3>{kanban.name}</h3>
      <TasksContainer>
        {tasks?.map((item) => {
          return (
            <Card key={item.id}>
              <div>{item.name}</div>
              <TaskTypeIcon id={item.typeId} />
            </Card>
          );
        })}
      </TasksContainer>
    </Contaienr>
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
