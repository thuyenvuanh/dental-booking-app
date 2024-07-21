import {
  CalendarOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps } from "antd";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/authHooks/useAuth.tsx";
import routes from "../../constants/routes";
import { useEffect, useState } from "react";
import { useNotification } from "../../hooks/notificationHooks/useNotification.tsx";

const UserAvatar = () => {
  const { logout, role } = useAuth();
  const [items, setItems] = useState<MenuProps["items"]>([]);
  const { notify } = useNotification();
  const logoff: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    logout().then(() => {
      notify.success({ message: "Đăng xuất thành công" });
    });
  };

  const customerItems: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to={routes.USER.HOME}>View Appointments</Link>,
      icon: <CalendarOutlined />,
    },
    {
      key: "2",
      label: <a onClick={logoff}>Logout</a>,
      icon: <LogoutOutlined />,
    },
  ];

  const adminItems: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to={routes.ADMINISTRATOR.HOME}>Settings</Link>,
      icon: <SettingOutlined />,
    },
    {
      key: "2",
      label: <a onClick={logoff}>Logout</a>,
      icon: <LogoutOutlined />,
    },
  ];

  useEffect(() => {
    switch (role) {
      case "CUSTOMER":
        setItems(customerItems);
        break;
      case "ADMINISTRATOR":
        setItems(adminItems);
        break;
      default:
        console.error(`Unknown role ${role}`);
        break;
    }
  }, [role]);

  return (
    <Dropdown menu={{ items: items }} placement="bottomRight">
      <Avatar style={{ cursor: "pointer" }} />
    </Dropdown>
  );
};

export default UserAvatar;
