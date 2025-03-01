import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {getRoutes} from "./routes";
import {NotFound} from "../pages/NotFound";

function App() {

  const arrayRoutes = getRoutes();

  return (
    <Router>
      <Routes>
        {arrayRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={<route.page />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
