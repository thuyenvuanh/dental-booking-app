import { Layout as AntLayout, Spin } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks/authHooks/useAuth.tsx";
import LayoutFooter from "./FooterLayout";
import UserAvatar from "../../UserAvatar/UserAvatar";
import AuthButtons from "../AuthButton/AuthButtons";

const LandingLayout: React.FC = () => {
  const { isAuthenticated, isAuthLoading } = useAuth();

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
        }}>
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img src={`/logo.svg`} draggable="false" />
        </Link>
        {isAuthLoading ? (
          <Spin />
        ) : isAuthenticated() ? (
          <UserAvatar />
        ) : (
          <AuthButtons />
        )}
      </Header>
      <Content style={{ width: "100%", overflow: "visible" }}>
        <Outlet />
      </Content>
      <LayoutFooter />
    </AntLayout>
  );
};

export default LandingLayout;
