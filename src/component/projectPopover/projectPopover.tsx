import React, { useState } from "react";
import { Divider, List, Popover, Typography, Button } from "antd";
import { useProject } from "utils/project";
import styled from "@emotion/styled";
import { useCreateModal } from "../../pages/autenticatedApp/projectList/util";
const { Text } = Typography;
export const ProjectPopover = () => {
  const { open } = useCreateModal();
  const [visible, setVisible] = useState(false);
  const { data: projectList } = useProject();
  const saveList = projectList?.filter((item) => item.pin);
  const openModal = () => {
    setVisible(false);
    console.log("关闭");
    open();
  };
  const handleVisibleChange = (visilbe: boolean) => {
    setVisible(visilbe);
    console.log(visilbe, "++++++++");
  };
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
      <Button type="link" onClick={openModal}>
        创建项目
      </Button>
    </Container>
  );
  return (
    <Popover
      placement={"bottom"}
      visible={visible}
      onVisibleChange={handleVisibleChange}
      content={content}
    >
      <span>项目</span>
    </Popover>
  );
};
const Container = styled.div`
  min-width: 30rem;
`;
