import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRouter from "./components/PrivateRouter";

function App() {
  return (
    <>
      <Navbar />
      {/* It is the same if wit is created an AppRoutes.jsx */}
      <Routes>
        <Route element={<PrivateRouter />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;

// It is being used the private router to protect the home page and render it only if there is a user email
