import {HashRouter, Route, Routes} from "react-router-dom";
import LandingLayout from "./components/Layout/Landing/Layout";
import Login from "./components/Login/Login";
import AuthProvider from "./hooks/useAuth";
import {App as AntApp, ConfigProvider} from "antd";
import {themeConfig} from "./constants/theme";
import Home from "./components/Home/Home";
import UserLayout from "./components/Layout/UserLayout/UserLayout";
import AppointmentView from "./components/Appointment/View";

const App: React.FC = () => {
    return (
        <AntApp>
            <AuthProvider>
                <ConfigProvider theme={themeConfig}>
                    <HashRouter>
                        <Routes>
                            <Route path="/login" Component={Login}/>
                            <Route element={<LandingLayout/>}>
                                <Route path="/" Component={Home}/>
                                <Route path="/dentists" element={<>Dentists</>}/>
                                <Route path="/book" element={<>Booking</>}/>
                            </Route>
                            <Route Component={UserLayout}>
                                <Route path="/apmt" Component={AppointmentView}/>
                            </Route>
                            <Route path="*" element={<>404 Not Found</>}/>
                        </Routes>
                    </HashRouter>
                </ConfigProvider>
            </AuthProvider>
        </AntApp>
    );
};

export default App;
