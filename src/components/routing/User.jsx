import { Routes, Route } from "react-router-dom";
import Home from "../pages/user/Home";
import Camps from "../pages/user/Camps";
import Profile from "../pages/user/Profile";
import Slots from "../pages/user/Slots";
import Navbar from "../shared/Navbar";
import Error from "../pages/Error";
import PrivateRoute from "../PrivateRoute";

export default function User() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoute allowedRole="user" />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cities/:cityId/:cityName/camps" element={<Camps />} />
          <Route
            path="/cities/:cityId/:cityName/camps/:campId/:campName/slots"
            element={<Slots />}
          />
        </Route>
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  );
}
