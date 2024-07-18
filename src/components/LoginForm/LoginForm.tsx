import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {Button, Checkbox, Form, Input} from "antd";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../../hooks/authHooks/useAuth";

export interface LoginFormProps {
    username: string;
    password: string;
    remember: boolean;
}

const LoginForm: React.FC = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const initialValue: LoginFormProps = {
        username: "",
        password: "",
        remember: false,
    };
    const onSubmit = (user: LoginFormProps) => {
        login(user).then((res) => {
            if (res) {
                navigate("/");
            }
        });
    };

    return (
        <Form
            initialValues={initialValue}
            onFinish={onSubmit}
            style={{width: "100%"}}>
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: "This field is required",
                    },
                ]}>
                <Input placeholder="Username" prefix={<UserOutlined/>}/>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: "This field is required",
                    },
                ]}>
                <Input.Password placeholder="Password" prefix={<LockOutlined/>}/>
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" type="primary" style={{width: "100%"}}>
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};
export default LoginForm;
