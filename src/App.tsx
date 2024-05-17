import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import About from "./components/About/About";
import Login from "./components/Login/Login";
import AuthProvider from "./hooks/useAuth";
import { ConfigProvider, Typography } from "antd";
import { themeConfig } from "./constants/theme";
import Home from "./components/Home/Home";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ConfigProvider theme={themeConfig}>
        <Typography>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" Component={Home} />
                <Route path="/dentists" element={<>Dentists</>} />
                <Route path="/book" element={<>Booking</>} />
              </Route>
              <Route path="/login" Component={Login} />
              <Route path="/about" Component={About} />
              <Route path="/*" element={<>404 Not Found</>} />
            </Routes>
          </BrowserRouter>
        </Typography>
      </ConfigProvider>
    </AuthProvider>
  );
};

export default App;
