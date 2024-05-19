import { MenuProps } from "antd";

export interface User {
  userId: string;
  email: string;
}

export interface AuthStateLocation {
  type: "success" | "info" | "error" | "warning";
  message: string;
  description: string;
}
export type MenuItem = Required<MenuProps>["items"][number];

export interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}
