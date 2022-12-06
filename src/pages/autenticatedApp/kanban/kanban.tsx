import React from "react";
import { useDocumentTitle } from "../../../utils/tools";
import { useDeleteKanban, useKanbans } from "../../../utils/kanban";
import {
  useCurrentProject,
  useKanbanQueryKey,
  useKanbanSearchParams,
} from "./util";
import { TaskColumn } from "./components/taskColumn/taskColumn";
import styled from "@emotion/styled";
import { SearchPanel } from "./components/seachPanel/searchPanel";
import { Row, ScreenContainer } from "../../../component/libStyle";
import { CreateKanban } from "./components/createKanban/createKanban";
import { EditTaskModal } from "./components/editTaskModal/editTaskModal";
import { Kanban } from "../../../types/kanban";
import { Button, Dropdown, Menu } from "antd";
export default function KanpanPage() {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useCurrentProject();
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {kanbans?.map((item) => (
          <TaskColumn key={item.id} kanban={item}></TaskColumn>
        ))}
        <CreateKanban />
      </ColumnsContainer>
      <EditTaskModal />
    </ScreenContainer>
  );
}
export const ColumnsContainer = styled.div`
  display: flex;
  width: 100%;
  overflow-x: scroll;
  flex: 1;
`;
