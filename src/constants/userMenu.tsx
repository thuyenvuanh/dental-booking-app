import { SettingOutlined, CalendarOutlined } from "@ant-design/icons";
import { MenuItem } from "../type.ts";

export const items: MenuItem[] = [
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
