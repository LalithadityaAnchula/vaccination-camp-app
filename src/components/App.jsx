import { Routes, Route } from "react-router-dom";
import User from "./routing/User";
import Admin from "./routing/Admin";
import { AppProvider } from "../context/users/UserContext";
import { AlertProvider } from "../context/alert/AlertContext";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <AppProvider>
      <AlertProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/*" element={<User />} />
        </Routes>
      </AlertProvider>
    </AppProvider>
  );
}
