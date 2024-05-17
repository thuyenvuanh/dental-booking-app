import { CalendarOutlined, LogoutOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps } from "antd";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const UserAvatar = () => {
  const { logout } = useAuth();

  const logoff: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    logout();
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to="/appointment">View Appointments</Link>,
      icon: <CalendarOutlined />,
    },
    {
      key: "2",
      label: <a onClick={logoff}>Logout</a>,
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Avatar style={{ cursor: "pointer" }} />
    </Dropdown>
  );
};

export default UserAvatar;
