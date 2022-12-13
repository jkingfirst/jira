import { Button, Drawer, DrawerProps, Form, Input } from "antd";
import { useAddEpic } from "../../../../../utils/epic";
import { useCreateEpic, useEpicQueryKey } from "../../util";
import { useProjectIdInUrl } from "../../../kanban/util";
import styled from "@emotion/styled";

export const CreateEpic = () => {
  const { mutateAsync, isLoading } = useAddEpic(useEpicQueryKey());
  const projectId = useProjectIdInUrl();
  const [form] = Form.useForm();
  const { isOpen, close } = useCreateEpic();
  const onFinish = async (values: any) => {
    await mutateAsync({ ...values, projectId });
    close();
  };
  return (
    <Drawer visible={isOpen} forceRender={true} onClose={close} width={"100%"}>
      <Container>
        <Form
          form={form}
          layout={"vertical"}
          style={{ width: "40rem" }}
          onFinish={onFinish}
        >
          <Form.Item
            name={"name"}
            label={"名称"}
            rules={[{ required: true, message: "请输入任务组" }]}
          >
            <Input placeholder={"请输入任务组"} />
          </Form.Item>
          <Form.Item>
            <Button htmlType={"submit"} loading={isLoading}>
              {" "}
              提交
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </Drawer>
  );
};
const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
