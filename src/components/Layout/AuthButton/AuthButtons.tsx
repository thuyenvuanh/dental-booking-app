import { Button, Space } from "antd";
import { Link } from "react-router-dom";

const AuthButtons: React.FC = () => {
  return (
    <Space className="auth">
      <Button>
        <Link to={"/login"}>Đăng nhập</Link>
      </Button>
      <Button type="primary">
        <Link to={"/login?register=true"} style={{ color: "white" }}>
          Đăng ký
        </Link>
      </Button>
    </Space>
  );
};
export default AuthButtons;
