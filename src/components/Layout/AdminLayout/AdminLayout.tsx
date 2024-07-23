import { theme, Layout, Menu, Spin } from "antd";
import { Header, Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate, Link, Outlet } from "react-router-dom";
import routes from "../../../constants/routes";
import { adminLayoutItems } from "../../../constants/userMenu";
import { useAuth } from "../../../hooks/authHooks/useAuth";
import { LocationData } from "../../../type";
import UserAvatar from "../../UserAvatar/UserAvatar";
import AuthButtons from "../AuthButton/AuthButtons";
import { BgGrey } from "../AdminLayout/AdminLayout.style";

const AdminLayout: React.FC = () => {
  // define vars
  const { isAuthenticated, isAuthLoading } = useAuth();
  const location = useLocation();
  const getCurrentKey = () => {
    const item = adminLayoutItems.find((s) =>
      location.pathname.startsWith(s?.key?.toString() ?? "")
    );
    return [item?.key?.toString() ?? ""];
  };
  const [stateOpenKeys, _] = useState(getCurrentKey());
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // effect and listenings
  useEffect(() => {
    checkAuth();
  }, []);

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
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, isAuthLoading]);

  useEffect(() => {
    //log off listener
    if (!isAuthenticated() && !isAuthLoading) {
      navigate(routes.GUEST.HOME);
    }
  }, [isAuthenticated, isAuthLoading]);

  //logic
  const navigatePage = ({ key }: { key: string }): void => {
    const currentPath = window.location.pathname;
    if (
      !currentPath.startsWith(key.toLowerCase()) ||
      currentPath === key.toLowerCase()
    ) {
      navigate(key);
    }
  };

  if (isLoading) {
    return <Spin fullscreen spinning />;
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
        {isAuthenticated() ? <UserAvatar /> : <AuthButtons />}
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
              items={adminLayoutItems}
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

export default AdminLayout;
