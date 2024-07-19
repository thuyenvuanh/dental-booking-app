import { notification } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";
import { createContext } from "react";
import { HookProps } from "../../type";

export interface NotificationContextInterface {
  notify: NotificationInstance;
}

export const NotificationContext = createContext<
  NotificationContextInterface | undefined
>(undefined);

export const NotificationProvider : React.FC<HookProps> = ({ children }) => {
  const [notiApi, contextHolder] = notification.useNotification();

  return (
    <NotificationContext.Provider
      value={{
        notify: notiApi,
      }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};
