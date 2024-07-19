import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/authHooks/useAuth";
import { useNotification } from "../../hooks/notificationHooks/useNotification";

export interface LoginFormProps {
  username: string;
  password: string;
  remember: boolean;
}

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { notify } = useNotification();

  const initialValue: LoginFormProps = {
    username: "",
    password: "",
    remember: false,
  };
  const onSubmit = (user: LoginFormProps) => {
    login(user)
      .then((_) => navigate("/"))
      .catch((error) => {
        notify.error({ message: `failed to login ${error}` });
      });
  };

  return (
    <Form
      initialValues={initialValue}
      onFinish={onSubmit}
      style={{ width: "100%" }}>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "This field is required",
          },
        ]}>
        <Input placeholder="Username" prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "This field is required",
          },
        ]}>
        <Input.Password placeholder="Password" prefix={<LockOutlined />} />
      </Form.Item>
      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary" style={{ width: "100%" }}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};
export default LoginForm;
