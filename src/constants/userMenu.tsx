import { SettingOutlined, CalendarOutlined } from "@ant-design/icons";
import { MenuItem } from "../type.ts";

export const userLayoutItems: MenuItem[] = [
  {
    key: "/apmt",
    icon: <CalendarOutlined />,
    label: "Lịch hẹn",
  },
  {
    key: "/settings",
    icon: <SettingOutlined />,
    label: "Quản lý tài khoản",
    children: [{ key: "/account/settings", label: "Accounts" }],
  },
];

export const adminLayoutItems: MenuItem[] = [
  {
    key: "/dentist",
    icon: <i className="fa-solid fa-user-doctor"></i>,
    label: "Nha sĩ",
  },
  {
    key: "/clinic",
    icon: <i className="fa-solid fa-house-chimney-medical"></i>,
    label: "Phòng khám",
  },
];
