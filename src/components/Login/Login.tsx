import { Flex, Tabs } from "antd";
import { FullHeightDiv } from "./Login.style";
import { useEffect, useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { isNil } from "lodash";

const Login: React.FC = () => {
  const [authType, setAuthType] = useState<string>("login");
  const navigate = useNavigate();
  const { authDetails } = useAuth();
  useEffect(() => {
    if (!isNil(authDetails)) {
      navigate("/");
    }
  }, [authDetails]);

  return (
    <FullHeightDiv>
      <Flex align="center" vertical style={{ padding: "200px 0" }}>
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
  );
};

export default Login;
