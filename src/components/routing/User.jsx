//components
import Home from "../pages/user/Home";
import Camps from "../pages/user/Camps";
import Profile from "../pages/user/Profile";
import Slots from "../pages/user/Slots";
import Navbar from "../shared/Navbar";
import Error from "../pages/Error";
import PrivateRoute from "../PrivateRoute";
//router dom imports
import { Routes, Route } from "react-router-dom";

export default function User() {
  return (
    <>
      <Navbar role="user" />
      <Routes>
        <Route element={<PrivateRoute allowedRole="user" />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cities/:cityId/camps" element={<Camps />} />
          <Route
            path="/cities/:cityId/camps/:campId/slots"
            element={<Slots />}
          />
        </Route>
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  );
}
