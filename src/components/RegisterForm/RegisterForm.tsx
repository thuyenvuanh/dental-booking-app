import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  FieldStringOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Radio } from "antd";
import { defaultSignUpForm } from "../../constants/default";
import { useAuth } from "../../hooks/authHooks/useAuth";
import { SignUpForm } from "../../type";
import { useNotification } from "../../hooks/notificationHooks/useNotification";
import { useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const { signUp, getCurrentUser } = useAuth();
  const { notification } = useNotification();
  const navigate = useNavigate();

  const handleSignUp = (signUpForm: SignUpForm) => {
    signUp(signUpForm)
      .then(() => {
        notification.success({ message: "Đăng ký thành công. Đang đăng nhập..." });
        setTimeout(() => {
          getCurrentUser()
            .then((_) => {
              notification.success({
                message: "Thành công. Chuyển hướng về trang chủ",
              });
              setTimeout(() => {
                navigate("/");
              }, 500);
            })
            .catch((e) => {
              notification.error({
                message:
                  "Lấy thông tin user không thành công. Vui lòng đăng nhập",
              });
              console.error(e);
            });
        }, 500);
      })
      .catch((e) => {
        console.error(e);
        notification.error({ message: "Đăng kí không thành công" });
      });
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
        name="userName"
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
        <Input.Password placeholder="Mật khẩu" prefix={<LockOutlined />} />
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
              return Promise.reject(new Error("Mật khẩu không trùng khớp"));
            },
          }),
        ]}>
        <Input.Password
          placeholder="Nhập lại mật khẩu"
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
        <Input placeholder="Số điện thoại" prefix={<PhoneOutlined />} />
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
        <Input.TextArea placeholder="Địa chỉ" />
      </Form.Item>
      <Form.Item
        name="dob"
        rules={[
          {
            required: true,
            message: "Thông tin bắt buộc",
          },
          {
            type: "date",
          },
        ]}>
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="Giới tính"
        name="sex"
        rules={[
          {
            required: true,
            message: "Thông tin bắt buộc",
          },
        ]}>
        <Radio.Group>
          <Radio value={true}>Nam</Radio>
          <Radio value={false}>Nữ</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary" style={{ width: "100%" }}>
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
