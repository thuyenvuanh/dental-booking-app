import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/about" Component={About} />
        <Route path="/*" element={<>404 Not Found</>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
