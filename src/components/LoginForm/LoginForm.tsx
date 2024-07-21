import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/authHooks/useAuth";
import { useNotification } from "../../hooks/notificationHooks/useNotification";
import { useState } from "react";
import { getCookie, setCookie } from "../../utils/cookies";

export interface LoginFormProps {
  username: string;
  password: string;
  remember: boolean;
}

const LoginForm: React.FC = () => {
  const REMEMBER_USERNAME_COOKIE = "REMEMBER_USERNAME";
  const { login, logout, getCurrentUser } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const navigate = useNavigate();

  const { notify } = useNotification();

  const initialValue: LoginFormProps = {
    username: getCookie(REMEMBER_USERNAME_COOKIE) ?? "",
    password: "",
    remember: false,
  };

  const onSubmit = (user: LoginFormProps) => {
    setIsSigningIn(true);
    login(user)
      .then((_) => {
        setTimeout(() => {
          getCurrentUser()
            .then((_) => {
              notify.success({ message: "Đăng nhập thành công" });
              setTimeout(() => {
                setCookie(REMEMBER_USERNAME_COOKIE, user.username, 365);
                navigate("/");
              }, 500);
            })
            .catch((e) => {
              notify.error({ message: "Lỗi lấy thông tin người dùng" });
              console.error(e);
            });
        }, 500);
      })
      .catch((e) => {
        notify.error({ message: `Tài khoản hoặc mật khẩu không đúng` });
        console.error(e);
        logout();
      })
      .finally(() => setIsSigningIn(false));
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
            message: "Thông tin bắt buộc",
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
      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Ghi nhớ username</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          style={{ width: "100%" }}
          loading={isSigningIn}
          disabled={isSigningIn}>
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};
export default LoginForm;
