import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

const RegisterForm: React.FC = () => {
  return (
    <Form
      initialValues={{
        email: "",
        password: "",
        rePassword: "",
      }}
      onFinish={(values) => console.log(values)}
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
      <Form.Item
        name="rePassword"
        rules={[
          {
            required: true,
            message: "This field is required",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}>
        <Input.Password placeholder="Password" prefix={<LockOutlined />} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary" style={{ width: "100%" }}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
