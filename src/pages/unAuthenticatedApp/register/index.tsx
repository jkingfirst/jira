import { useAuth } from "../../../context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "../index";
export default function Login() {
  const { register, user } = useAuth();
  const handelSubmit = (val: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    register(val);
  };
  return (
    <Form onFinish={handelSubmit}>
      {user ? <div>{user.name}</div> : ""}
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password placeholder="请输入密码" />
      </Form.Item>
      <Form.Item
        name="cpassword"
        rules={[{ required: true, message: "请输入确认密码" }]}
      >
        <Input.Password placeholder="请输入确认密码" />
      </Form.Item>
      <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
        <LongButton htmlType="submit" type="primary">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
}
