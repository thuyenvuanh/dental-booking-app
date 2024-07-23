import { App } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";
import { createContext } from "react";
import { HookProps } from "../../type";
import { HookAPI } from "antd/es/modal/useModal";
import { MessageInstance } from "antd/es/message/interface";

export interface NotificationContextInterface {
  notification: NotificationInstance;
  modal: HookAPI;
  message: MessageInstance;
}

export const NotificationContext = createContext<
  NotificationContextInterface | undefined
>(undefined);

export const NotificationProvider: React.FC<HookProps> = ({ children }) => {
  // const [notiApi, contextHolder] = notification.useNotification();
  const { notification, modal, message } = App.useApp();
  return (
    <NotificationContext.Provider
      value={{
        notification,
        modal,
        message,
      }}>
      {children}
    </NotificationContext.Provider>
  );
};
