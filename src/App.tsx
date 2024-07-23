import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingLayout from "./components/Layout/Landing/Layout";
import Login from "./components/Login/Login";
import AuthProvider from "./hooks/authHooks/AuthProvider.tsx";
import { App as AntApp, ConfigProvider } from "antd";
import { themeConfig } from "./constants/theme";
import Home from "./components/Home/Home";
import UserLayout from "./components/Layout/UserLayout/UserLayout";
import AppointmentView from "./components/Appointment/View/Appointment.tsx";
import React, { useEffect } from "react";
import axios from "axios";
import NewAppointment from "./components/Appointment/New/NewAppointment.tsx";
import { NotificationProvider } from "./hooks/notificationHooks/notificationHook.tsx";
import AdminLayout from "./components/Layout/AdminLayout/AdminLayout.tsx";
import DentistPage from "./components/Dentist/Dentist.tsx";
import NewDentistPage from "./components/Dentist/New/NewDentist.tsx";
import ScrollToTop from "./utils/ScrollToTop.tsx";
import routes from "./constants/routes.ts";
import EditDentistPage from "./components/Dentist/Edit/EditDentist.tsx";
import ClinicViewPage from "./components/Clinic/Clinic.tsx";
import NewClinicPage from "./components/Clinic/New/NewClinic.tsx";
import EditClinicPage from "./components/Clinic/Edit/EditClinic.tsx";

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
                <Route path={routes.LOGIN} Component={Login} />
                <Route element={<LandingLayout />}>
                  <Route path={routes.GUEST.HOME} Component={Home} />
                </Route>
                <Route Component={UserLayout}>
                  <Route
                    path={routes.USER.APPOINTMENT.VIEW}
                    Component={AppointmentView}
                  />
                  <Route
                    path={routes.USER.APPOINTMENT.CREATE}
                    Component={NewAppointment}
                  />
                </Route>
                <Route Component={AdminLayout}>
                  <Route
                    path={routes.ADMINISTRATOR.DENTIST.VIEW}
                    Component={DentistPage}
                  />
                  <Route
                    path={routes.ADMINISTRATOR.DENTIST.NEW}
                    Component={NewDentistPage}
                  />
                  <Route
                    path={routes.ADMINISTRATOR.DENTIST.EDIT}
                    Component={EditDentistPage}
                  />
                  <Route
                    path={routes.ADMINISTRATOR.CLINIC.VIEW}
                    Component={ClinicViewPage}
                  />
                  <Route
                    path={routes.ADMINISTRATOR.CLINIC.NEW}
                    Component={NewClinicPage}
                  />
                  <Route
                    path={routes.ADMINISTRATOR.CLINIC.EDIT}
                    Component={EditClinicPage}
                  />
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
