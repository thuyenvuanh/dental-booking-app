import { SettingOutlined, CalendarOutlined } from "@ant-design/icons";
import { MenuItem } from "../type.ts";

export const userLayoutItems: MenuItem[] = [
  {
    key: "/apmt",
    icon: <CalendarOutlined />,
    label: "Appointments",
  },
  {
    key: "/settings",
    icon: <SettingOutlined />,
    label: "Account Settings",
    children: [{ key: "/account/settings", label: "Accounts" }],
  },
];

export const adminLayoutItems: MenuItem[] = [
  {
    key: "/dentist",
    icon: <i className="fa-solid fa-user-doctor"></i>,
    label: "Dentist",
  },
];
