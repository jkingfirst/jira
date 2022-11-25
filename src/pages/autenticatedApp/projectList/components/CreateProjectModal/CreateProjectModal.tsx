import { Button, Drawer } from "antd";
import { useCreateModal } from "utils/tools";

export const CreateProjectModal = () => {
  const { createProjectOpen, close } = useCreateModal();
  return (
    <Drawer width="100%" visible={createProjectOpen}>
      <Button type="primary" onClick={close}>
        关闭
      </Button>
    </Drawer>
  );
};
