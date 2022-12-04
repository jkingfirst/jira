/* @jsxImportSource @emotion/react */
import { Button, Drawer, Form, Input, Spin } from "antd";
import UserSelect from "component/UserSelect/UserSelect";
import { useAddProject, useEditProject } from "utils/project";
import { useEffect } from "react";
import styled from "@emotion/styled";
import { useCreateModal, useProjectQueryKey } from "../../util";

export const CreateProjectModal = () => {
  const { createProjectOpen, close, editProject, isLoading } = useCreateModal();
  const useProjectMutate = editProject ? useEditProject : useAddProject;
  const title = editProject ? "编辑项目" : "创建项目";
  const querykey = useProjectQueryKey();
  const { mutateAsync } = useProjectMutate(querykey);
  const a = () => {
    console.log("点击了");
  };
  const onfinish = (values: any) => {
    mutateAsync({ ...editProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(editProject);
  }, [editProject, form]);
  return (
    <Drawer
      width="100%"
      visible={createProjectOpen}
      onClose={close}
      forceRender={true}
    >
      {isLoading ? (
        <Spin />
      ) : (
        <Container>
          <h2>{title}</h2>
          <Form onFinish={onfinish} form={form} css={{ width: "40rem" }}>
            <Form.Item
              label="名称"
              name="name"
              rules={[
                {
                  required: true,
                  message: "请输入名称",
                },
              ]}
            >
              <Input placeholder="请输入项目名称" />
            </Form.Item>
            <Form.Item
              label="组织"
              name="organization"
              rules={[
                {
                  required: true,
                  message: "请输入组织名称",
                },
              ]}
            >
              <Input placeholder="请输入组织名称" />
            </Form.Item>
            <Form.Item label="负责人" name="personId">
              <UserSelect />
            </Form.Item>
            <Form.Item>
              <Button loading={isLoading} type={"primary"} htmlType={"submit"}>
                提交
              </Button>
            </Form.Item>
          </Form>
        </Container>
      )}
    </Drawer>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
