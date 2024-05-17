import { Layout as AntLayout, Menu, Button, Space, Avatar, Flex } from "antd";
import { Header, Content } from "antd/es/layout/layout";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import LayoutFooter from "./FooterLayout";
import UserAvatar from "../UserAvatar/UserAvatar";

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const items = [
    {
      key: "home",
      path: "/",
      label: "Home",
    },
    {
      key: "dentists",
      path: "dentists",
      label: "Dentists",
    },
    {
      key: "book",
      path: "/book",
      label: "Book",
    },
  ];
  const currentSelectedItem = () => {
    const item = items.find((i) => i.path === location.pathname);
    return item?.key;
  };

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
          <img src="./logo.svg" draggable="false" />
        </Link>
        <Menu
          autoFocus={false}
          theme="light"
          style={{ alignSelf: "start" }}
          defaultSelectedKeys={[`${currentSelectedItem()}`]}
          mode="horizontal"
          onSelect={({ key }) => {
            const item = items.find((s) => s.key === key);
            navigate(item!.path);
          }}
          items={items}
        />
        {!isAuthenticated() && (
          <Space className="auth">
            <Button>
              <Link to={"/login"}>Login</Link>
            </Button>
            <Button type="primary">
              <Link to={"/login?register=true"} style={{ color: "white" }}>
                Register
              </Link>
            </Button>
          </Space>
        )}
        {isAuthenticated() && <UserAvatar />}
      </Header>
      <Content style={{ width: "100%", overflow: "visible" }}>
        <Outlet />
      </Content>
      <LayoutFooter />
    </AntLayout>
  );
};

export default Layout;
