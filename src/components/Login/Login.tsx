/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "_" }]*/
import { Flex, Tabs, Typography } from "antd";
import { FullHeightDiv } from "./Login.style";
import { useEffect, useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { isEmpty, isNil } from "lodash";
import { LocationData } from "../../type.ts";
import { useNotification } from "../../hooks/notificationHooks/useNotification.tsx";

const Login: React.FC = () => {
  const [searchParams, _] = useSearchParams();
  const [authType, setAuthType] = useState<string>(
    isNil(searchParams.get("register")) ? "login" : "register"
  );
  const { notification } = useNotification();
  const authStateLocation = useLocation().state as LocationData;

  useEffect(() => {
    if (!isNil(authStateLocation) && !isEmpty(authStateLocation.type)) {
      try {
        const { type, message, description } = authStateLocation;
        notification.open({ type, message, description });
      } catch {
        console.error(`Cannot show notification`);
      }
    }
  }, []);

  return (
    <Typography>
      <FullHeightDiv>
        <Flex align="center" vertical style={{ padding: "200px 0" }}>
          <Link to={"/"}>
            <img src={`./logo.svg`} width={300} />
          </Link>
          <div style={{ width: "400px" }}>
            <Tabs
              centered
              animated
              activeKey={authType}
              onChange={(activeKey) => setAuthType(activeKey)}>
              <Tabs.TabPane key={"login"} tab={"Đăng nhập"} />
              <Tabs.TabPane key={"register"} tab={"Đăng kí"} />
            </Tabs>
            {authType === "login" && <LoginForm />}
            {authType === "register" && <RegisterForm />}
          </div>
        </Flex>
      </FullHeightDiv>
    </Typography>
  );
};

export default Login;
