import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Login from "./components/Login/Login";
import AuthProvider from "./hooks/useAuth";
import { ConfigProvider, Typography } from "antd";
import { themeConfig } from "./constants/theme";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ConfigProvider theme={themeConfig}>
        <Typography>
          <BrowserRouter>
            <Routes>
              <Route path="/" Component={Home} />
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
