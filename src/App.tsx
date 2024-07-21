import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingLayout from "./components/Layout/Landing/Layout";
import Login from "./components/Login/Login";
import AuthProvider from "./hooks/authHooks/AuthProvider.tsx";
import { App as AntApp, ConfigProvider } from "antd";
import { themeConfig } from "./constants/theme";
import Home from "./components/Home/Home";
import UserLayout from "./components/Layout/UserLayout/UserLayout";
import AppointmentView from "./components/Appointment/View/View.tsx";
import React, { useEffect } from "react";
import axios from "axios";
import NewAppointment from "./components/Appointment/New/New.tsx";
import { NotificationProvider } from "./hooks/notificationHooks/notificationHook.tsx";
import AdminLayout from "./components/Layout/AdminLayout/AdminLayout.tsx";
import DentistPage from "./components/Dentist/Dentist.tsx";
import NewDentistPage from "./components/Dentist/New/New.tsx";
import ScrollToTop from "./utils/ScrollToTop.tsx";

const App: React.FC = () => {
  useEffect(() => {
    axios.interceptors.request.use((config) => {
      return {
        ...config,
        baseURL: import.meta.env.VITE_API_BASE_URL,
      };
    });
  }, []);

  return (
    <AntApp>
      <NotificationProvider>
        <AuthProvider>
          <ConfigProvider theme={themeConfig}>
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/login" Component={Login} />
                <Route element={<LandingLayout />}>
                  <Route path="/" Component={Home} />
                  <Route path="/dentists" element={<>Dentists</>} />
                  <Route path="/book" element={<>Booking</>} />
                </Route>
                <Route Component={UserLayout}>
                  <Route path="/apmt" Component={AppointmentView} />
                  <Route path="/apmt/new" Component={NewAppointment} />
                </Route>
                <Route Component={AdminLayout}>
                  <Route path="/dentist" Component={DentistPage} />
                  <Route path="/dentist/new" Component={NewDentistPage} />
                </Route>
                <Route path="*" element={<>404 Not Found</>} />
              </Routes>
            </BrowserRouter>
          </ConfigProvider>
        </AuthProvider>
      </NotificationProvider>
    </AntApp>
  );
};

export default App;
