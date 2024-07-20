import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  FieldStringOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Radio } from "antd";
import { defaultSignUpForm } from "../../constants/default";
import { useAuth } from "../../hooks/authHooks/useAuth";
import { SignUpForm } from "../../type";

const RegisterForm: React.FC = () => {
  const { signUp } = useAuth();

  const handleSignUp = (signUpForm: SignUpForm) => {
    signUp(signUpForm);
  };

  return (
    <Form
      initialValues={defaultSignUpForm}
      onFinish={handleSignUp}
      style={{ width: "100%" }}>
      <Form.Item
        name="firstName"
        rules={[
          {
            required: true,
            message: "Thông tin bắt buộc",
          },
          {
            type: "string",
          },
        ]}>
        <Input placeholder="Họ" prefix={<FieldStringOutlined />} />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[
          {
            required: true,
            message: "Thông tin bắt buộc",
          },
          {
            type: "string",
          },
        ]}>
        <Input placeholder="Tên" prefix={<FieldStringOutlined />} />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Thông tin bắt buộc",
          },
          {
            type: "email",
            message: "Incorrect email",
          },
        ]}>
        <Input placeholder="Email" prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Thông tin bắt buộc",
          },
          {
            type: "string",
          },
        ]}>
        <Input placeholder="Username" prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Thông tin bắt buộc",
          },
        ]}>
        <Input.Password placeholder="Password" prefix={<LockOutlined />} />
      </Form.Item>
      <Form.Item
        name="rePassword"
        rules={[
          {
            required: true,
            message: "Thông tin bắt buộc",
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
        <Input.Password
          placeholder="Confirm password"
          prefix={<LockOutlined />}
        />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        rules={[
          {
            required: true,
            message: "Thông tin bắt buộc",
          },
          {
            type: "string",
          },
          {
            max: 12,
            min: 10,
            message: "10-12 digits phone number",
          },
        ]}>
        <Input placeholder="Phone number" prefix={<PhoneOutlined />} />
      </Form.Item>
      <Form.Item
        name="address"
        rules={[
          {
            required: true,
            message: "Thông tin bắt buộc",
          },
          {
            type: "string",
          },
        ]}>
        <Input.TextArea placeholder="Address" />
      </Form.Item>
      <Form.Item
        label="Gender"
        name="sex"
        rules={[
          {
            required: true,
            message: "Thông tin bắt buộc",
          },
        ]}>
        <Radio.Group>
          <Radio value={true}>Male</Radio>
          <Radio value={false}>Female</Radio>
        </Radio.Group>
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
