import { useContext } from "react";
import {
  NotificationContext,
  NotificationContextInterface,
} from "./notificationHook";

export const useNotification = (): NotificationContextInterface => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("error when init notification");
  }
  return context;
};
