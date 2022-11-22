import React from "react";
import { Divider, List, Popover, Typography, Button } from "antd";
import { useProject } from "utils/project";
import styled from "@emotion/styled";
import { projectListActions } from "store/projectList/projectListSlice";
import { useAppDispatch } from "store";
const { Text } = Typography;
export const ProjectPopover = () => {
  const dispath = useAppDispatch();
  const { data: projectList } = useProject();
  const saveList = projectList?.filter((item) => item.pin);
  const content = (
    <Container>
      <Text type="secondary">收藏项目</Text>
      <List>
        {saveList?.map((item) => {
          return (
            <List.Item key={item.id}>
              <List.Item.Meta title={item.name}></List.Item.Meta>
            </List.Item>
          );
        })}
      </List>
      <Divider />
      <Button
        type="link"
        onClick={() => dispath(projectListActions.openProjectModal())}
      >
        创建项目
      </Button>
    </Container>
  );
  return (
    <Popover placement={"bottom"} content={content}>
      <span>项目</span>
    </Popover>
  );
};
const Container = styled.div`
  min-width: 30rem;
`;