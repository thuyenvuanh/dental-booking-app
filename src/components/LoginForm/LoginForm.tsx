import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Input, Checkbox, Button, Form } from "antd";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export interface LoginFormProps {
  email: string;
  password: string;
  remember: boolean;
}

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const initialValue: LoginFormProps = {
    email: "",
    password: "",
    remember: false,
  };
  const onSubmit = (user: LoginFormProps) => {
    const response = login(user);
    if (response) {
      navigate("/");
    }
  };

  return (
    <Form
      initialValues={initialValue}
      onFinish={onSubmit}
      style={{ width: "100%" }}>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "This field is required",
          },
          {
            type: "email",
            message: "Incorrect email",
          },
        ]}>
        <Input placeholder="Email" prefix={<UserOutlined />} />
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
