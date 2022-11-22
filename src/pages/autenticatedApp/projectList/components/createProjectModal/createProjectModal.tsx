import { Button, Drawer } from "antd";
import { useAppDispatch, useAppSelector } from "store";
import { projectListActions } from "store/projectList/projectListSlice";

interface createProjectModalProps {
  title?: string;
}
export const CreateProjectModal = (props: createProjectModalProps) => {
  const dispatch = useAppDispatch();
  const isShowCreateProjectModal = useAppSelector(
    (state) => state.projectList.isShowCreateProjectModal
  );
  return (
    <Drawer title={props.title} visible={isShowCreateProjectModal} width="100%">
      <Button
        type="primary"
        onClick={() => dispatch(projectListActions.closeProjectModal())}
      >
        关闭
      </Button>
    </Drawer>
  );
};
