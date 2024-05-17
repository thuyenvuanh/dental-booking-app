import { Layout, Menu, Breadcrumb, theme, Button, Space } from "antd";
import { Header, Content, Footer } from "antd/es/layout/layout";
import { Link } from "react-router-dom";

const items = new Array(15).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));

const Home: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "space-between",
          backgroundColor: "#f9f9f9",
        }}>
        <img src="./logo.svg" style={{ alignSelf: "center" }} />
        <Menu autoFocus={false} theme="light" mode="horizontal" items={items} />
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
      </Header>
      <Content style={{ margin: "48px", height: "1000px" }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            height: 1000,
            padding: 12,
            borderRadius: borderRadiusLG,
          }}>
          Content
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Home;
