import { useTaskModal, useTaskQueryKey } from "../../util";
import { useForm } from "antd/es/form/Form";
import { useDeleteTask, useEditTask } from "../../../../../utils/task";
import { useEffect } from "react";
import { Button, Form, Input, Modal } from "antd";
import UserSelect from "../../../../../component/UserSelect/UserSelect";
import TaskTypeSelect from "../../../../../component/taskTypeSelect/TaskTypeSelect";
export const EditTaskModal = () => {
  const { taskId, editingTask, close, startEdit } = useTaskModal();
  const [form] = useForm();
  const { mutateAsync: edtiTask, isLoading } = useEditTask(useTaskQueryKey());
  const onCancel = () => {
    form.resetFields();
    close();
  };
  const onOk = async () => {
    await edtiTask({ ...editingTask, ...form.getFieldsValue() });
    close();
    form.resetFields();
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const { mutateAsync } = useDeleteTask(useTaskQueryKey());
  const deleteTask = () => {
    Modal.confirm({
      title: "温馨提示",
      content: "确认要删除此条任务",
      onOk: async () => {
        await mutateAsync({ id: Number(taskId) });
        close();
      },
    });
  };
  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);
  return (
    <Modal
      forceRender={true}
      okText={"确定"}
      cancelText={"取消"}
      title={"编辑任务"}
      visible={!!taskId}
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={isLoading}
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item
          label={"任务名"}
          name={"name"}
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"经办人"} name={"processorId"}>
          <UserSelect defaultOptionName={"经办人"} />
        </Form.Item>
        <Form.Item label={"类型"} name={"typeId"}>
          <TaskTypeSelect defaultOptionName={"类型"} />
        </Form.Item>
        <Form.Item>
          <Button onClick={deleteTask}> 删除</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
