import {
  CalendarOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/authHooks/useAuth.tsx";
import routes from "../../constants/routes";
import { useEffect, useState } from "react";
import { useNotification } from "../../hooks/notificationHooks/useNotification.tsx";

const UserAvatar = () => {
  const { logout, isAuthLoading, authDetails } = useAuth();
  const [items, setItems] = useState<MenuProps["items"]>([]);
  const { message } = useNotification();
  const navigate = useNavigate();
  const logoff: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    logout().then(() => {
      message.success({ content: "Đăng xuất thành công" });
      navigate("/");
    });
  };

  const customerItems: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to={routes.USER.HOME}>Lịch hẹn</Link>,
      icon: <CalendarOutlined />,
    },
    {
      key: "2",
      label: <a onClick={logoff}>Đăng xuất</a>,
      icon: <LogoutOutlined />,
    },
  ];

  const adminItems: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to={routes.ADMINISTRATOR.HOME}>Quản lý</Link>,
      icon: <SettingOutlined />,
    },
    {
      key: "2",
      label: <a onClick={logoff}>Đăng xuất</a>,
      icon: <LogoutOutlined />,
    },
  ];

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }
    const role = authDetails?.userDetails?.rolesName.$values[0];
    switch (role) {
      case "Customer":
        console.log("CUSTOMER");
        setItems(customerItems);
        break;
      case "Administrator":
        console.log("ADMINISTRATOR");
        setItems(adminItems);
        break;
      default:
        console.error(`Unknown role ${role}`);
        break;
    }
  }, [isAuthLoading]);

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Avatar style={{ cursor: "pointer" }} />
    </Dropdown>
  );
};

export default UserAvatar;
