import React, { useState } from "react";
import { useKanbanQueryKey, useProjectIdInUrl } from "../../util";
import { useAddKanban } from "../../../../../utils/kanban";
import { ColumnsContainer } from "../../kanban";
import { Input } from "antd";
import styled from "@emotion/styled";
import { Contaienr } from "../taskColumn/taskColumn";
export const CreateKanban = () => {
  const [projectName, setProjectName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addKanban } = useAddKanban(useKanbanQueryKey());
  const submit = async () => {
    await addKanban({ projectId, name: projectName });
    setProjectName("");
  };
  return (
    <Contaienr>
      <Input
        value={projectName}
        onChange={(evt) => setProjectName(evt.target.value)}
        size={"large"}
        placeholder={"看板名称"}
        onPressEnter={submit}
      />
    </Contaienr>
  );
};
export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;
