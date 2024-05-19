import { Button, Space } from "antd";
import { Link } from "react-router-dom";

const AuthButtons: React.FC = () => {
  return (
    <Space className="auth">
      <Button>
        <Link to={"/login"}>Login</Link>
      </Button>
      <Button type="primary">
        <Link to={"/login?register=true"} style={{ color: "white" }}>
          Register
        </Link>
      </Button>
    </Space>
  );
};
export default AuthButtons;
