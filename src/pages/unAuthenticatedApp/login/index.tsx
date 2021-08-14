import { FormEvent } from "react";
import { useAuth } from "../../../context/auth-context";
import { Form, Input, Button } from "antd";
import { LongButton } from "../index";
import styled from "@emotion/styled";
export default function Login() {
  const { login, user } = useAuth();
  const handelSubmit = (val: { username: string; password: string }) => {
    login(val);
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 19 },
    },
  };
  return (
    <Form onFinish={handelSubmit} {...formItemLayout}>
      {user ? <div>{user.name}</div> : ""}
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password placeholder="请输入密码" />
      </Form.Item>
      <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
        <LongButton htmlType="submit" type="primary">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
}
