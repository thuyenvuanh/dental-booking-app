import { Layout, Menu, Spin, theme } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import UserAvatar from "../../UserAvatar/UserAvatar";
import { useAuth } from "../../../hooks/authHooks/useAuth.tsx";
import AuthButtons from "../AuthButton/AuthButtons";
import { useCallback, useEffect, useState } from "react";
import routes from "../../../constants/routes";
import { LocationData } from "../../../type.ts";
import { userLayoutItems } from "../../../constants/userMenu";
import { BgGrey } from "./UserLayout.style";

const { Header, Content, Sider } = Layout;

const UserLayout: React.FC = () => {
  const { isAuthenticated, authDetails, isAuthLoading } = useAuth();
  const location = useLocation();
  const getCurrentKey = () => {
    const item = userLayoutItems.find((s) =>
      location.pathname.startsWith(s?.key?.toString() ?? "")
    );
    return [item?.key?.toString() ?? ""];
  };
  const [stateOpenKeys, _] = useState(getCurrentKey());
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    //log off listener
    if (!isAuthenticated() && !isAuthLoading) {
      navigate(routes.GUEST.HOME);
      const userRole = authDetails!.userDetails!.rolesName.$values[0]!;
      if (userRole != "Customer") {
        navigate(routes.GUEST.HOME);
      }
    }
  }, [isAuthenticated, isAuthLoading]);

  const navigatePage = ({ key }: { key: string }): void => {
    const currentPath = window.location.pathname;
    if (
      !currentPath.startsWith(key.toLowerCase()) ||
      currentPath === key.toLowerCase()
    ) {
      navigate(key);
    }
  };

  const checkAuth = useCallback(() => {
    if (!isAuthenticated() && !isAuthLoading) {
      navigate(routes.LOGIN, {
        replace: true,
        state: {
          type: "error",
          message: "Đã đăng xuất",
          description: `Phiên làm việc đã hết hạn, vui lòng đăng nhập lại`,
        } as LocationData,
      });
    }
  }, [isAuthenticated, isAuthLoading]);

  if (isAuthLoading) {
    return <Spin fullscreen tip="Loading, please wait" />;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: colorBgContainer,
        }}>
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img src={`/logo.svg`} draggable="false" />
        </Link>
        {isAuthenticated() && !isAuthLoading ? <UserAvatar /> : <AuthButtons />}
      </Header>
      <BgGrey>
        <Layout
          style={{
            width: "100%",
            maxWidth: "1200px",
            borderRadius: borderRadiusLG,
            overflow: "hidden",
            backgroundColor: colorBgContainer,
          }}>
          <Sider theme="light" width={250} style={{ margin: "16px 0" }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={stateOpenKeys}
              onClick={navigatePage}
              style={{ height: "100%" }}
              items={userLayoutItems}
            />
          </Sider>
          <Content style={{ padding: "0 16px" }}>
            <Outlet />
          </Content>
        </Layout>
      </BgGrey>
    </Layout>
  );
};

export default UserLayout;
