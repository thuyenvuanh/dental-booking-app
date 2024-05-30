import { Flex, Tabs, Typography, notification } from "antd";
import { FullHeightDiv } from "./Login.style";
import { useEffect, useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import { useAuth } from "../../hooks/useAuth";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { isEmpty, isNil } from "lodash";
import { AuthStateLocation } from "../../type.ts";
import {BASENAME} from "../../constants/routes.ts";

const Login: React.FC = () => {
  const [searchParams, _] = useSearchParams();
  const [authType, setAuthType] = useState<string>(
    isNil(searchParams.get("register")) ? "login" : "register"
  );
  const [notiApi, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const authStateLocation = useLocation().state as AuthStateLocation;
  const { authDetails } = useAuth();

  useEffect(() => {
    if (!isNil(authStateLocation) && !isEmpty(authStateLocation.type)) {
      try {
        const { type, message, description } = authStateLocation;
        notiApi.open({ type, message, description });
      } catch {
        console.error(`Cannot show notification`);
      }
    }
  }, []);

  useEffect(() => {
    if (!isNil(authDetails)) {
      navigate("/");
    }
  }, [authDetails]);

  return (
    <Typography>
      {contextHolder}
      <FullHeightDiv>
        <Flex align="center" vertical style={{ padding: "200px 0" }}>
          <Link to={"/"}>
            <img src={`.${BASENAME}/logo.svg`} width={300} />
          </Link>
          <div style={{ width: "400px" }}>
            <Tabs
              centered
              animated
              activeKey={authType}
              onChange={(activeKey) => setAuthType(activeKey)}>
              <Tabs.TabPane key={"login"} tab={"Login"} />
              <Tabs.TabPane key={"register"} tab={"Register"} />
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
