import {Layout, Menu, theme} from "antd";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import UserAvatar from "../../UserAvatar/UserAvatar";
import {useAuth} from "../../../hooks/authHooks/useAuth.tsx";
import AuthButtons from "../AuthButton/AuthButtons";
import {useCallback, useEffect, useState} from "react";
import routes from "../../../constants/routes";
import {AuthStateLocation} from "../../../type.ts";
import {items} from "../../../constants/userMenu";
import {BgGrey} from "./UserLayout.style";

const {Header, Content, Sider} = Layout;

const UserLayout: React.FC = () => {
    const {isAuthenticated} = useAuth();
    const location = useLocation();
    const getCurrentKey = () => {
        const item = items.find((s) =>
            location.pathname.startsWith(s?.key?.toString() ?? "")
        );
        return [item?.key?.toString() ?? ""];
    };
    const [stateOpenKeys, _] = useState(getCurrentKey());
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const navigate = useNavigate();
    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        //log off listener
        if (!isAuthenticated()) {
            navigate(routes.GUEST.HOME);
        }
    }, [isAuthenticated]);

    const navigatePage = ({key}: { key: string }): void => {
        const currentPath = window.location.pathname;
        if (
            !currentPath.startsWith(key.toLowerCase()) ||
            currentPath === key.toLowerCase()
        ) {
            navigate(key);
        } else {
            alert("not navigate");
        }
    };

    const checkAuth = useCallback(() => {
        if (!isAuthenticated()) {
            navigate(routes.LOGIN, {
                replace: true,
                state: {
                    type: "error",
                    message: "Logged off",
                    description: `Your session has ended, please log in again`,
                } as AuthStateLocation,
            });
        }
    }, [isAuthenticated]);

    return (
        <Layout style={{minHeight: "100vh"}}>
            <Header
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: colorBgContainer,
                }}>
                <Link to="/" style={{display: "flex", alignItems: "center"}}>
                    <img src={`./logo.svg`} draggable="false"/>
                </Link>
                {isAuthenticated() ? <UserAvatar/> : <AuthButtons/>}
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
                    <Sider theme="light" width={250} style={{margin: "16px 0"}}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={stateOpenKeys}
                            onClick={navigatePage}
                            style={{height: "100%"}}
                            items={items}
                        />
                    </Sider>
                    <Content style={{padding: "0 16px"}}>
                        <Outlet/>
                    </Content>
                </Layout>
            </BgGrey>
        </Layout>
    );
};

export default UserLayout;
