import React from "react";
import { useDocumentTitle } from "../../../utils/tools";
import { useKanbans } from "../../../utils/kanban";
import { useCurrentProject, useKanbanSearchParams } from "./util";
import { TaskColumn } from "./components/taskColumn/taskColumn";
import styled from "@emotion/styled";
import { SearchPanel } from "./components/seachPanel/searchPanel";
export default function KanpanPage() {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useCurrentProject();
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  return (
    <div>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {kanbans?.map((item) => (
          <TaskColumn key={item.id} kanban={item}></TaskColumn>
        ))}
      </ColumnsContainer>
    </div>
  );
}
export const ColumnsContainer = styled.div`
  display: flex;
  width: 100%;
`;
