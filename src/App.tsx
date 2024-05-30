import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingLayout from "./components/Layout/Landing/Layout";
import Login from "./components/Login/Login";
import AuthProvider from "./hooks/useAuth";
import { ConfigProvider } from "antd";
import { themeConfig } from "./constants/theme";
import Home from "./components/Home/Home";
import { App as AntApp } from "antd";
import UserLayout from "./components/Layout/UserLayout/UserLayout";
import AppointmentView from "./components/Appointment/View";
import {BASENAME} from "./constants/routes.ts";

const App: React.FC = () => {
  return (
    <AntApp>
      <AuthProvider>
        <ConfigProvider theme={themeConfig}>
          <BrowserRouter basename={BASENAME}>
            <Routes>
              <Route path="/login" Component={Login} />
              <Route element={<LandingLayout />}>
                <Route path="/" Component={Home} />
                <Route path="/dentists" element={<>Dentists</>} />
                <Route path="/book" element={<>Booking</>} />
              </Route>
              <Route Component={UserLayout}>
                <Route path="/apmt" Component={AppointmentView} />
              </Route>
              <Route path="*" element={<>404 Not Found</>} />
            </Routes>
          </BrowserRouter>
        </ConfigProvider>
      </AuthProvider>
    </AntApp>
  );
};

export default App;
