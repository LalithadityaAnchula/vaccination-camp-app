//components
import Navbar from "../shared/Navbar";
import AdminHome from "../pages/admin/AdminHome";
import AdminCamps from "../pages/admin/AdminCamps";
import AdminCamp from "../pages/admin/AdminCamp";
import AdminCity from "../pages/admin/AdminCity";
import Profile from "../pages/user/Profile";
import AdminSlots from "../pages/admin/AdminSlots";
import Requests from "../pages/admin/Requests";
import CityStats from "../pages/admin/CityStats";
import Error from "../pages/Error";
import PrivateRoute from "../PrivateRoute";
//router dom imports
import { Routes, Route } from "react-router-dom";

export default function Admin() {
  return (
    <>
      <Navbar role="admin" />
      <Routes>
        <Route element={<PrivateRoute allowedRole="admin" />}>
          <Route path="/" element={<AdminHome />} />
          <Route path="/cities/:cityId" element={<AdminCity />} />
          <Route path="/cities/:cityId/camps" element={<AdminCamps />} />
          <Route path="/cities/:cityId/camps/:campId" element={<AdminCamp />} />
          <Route
            path="/cities/:cityId/camps/:campId/slots"
            element={<AdminSlots />}
          />
          <Route
            path="/cities/:cityId/camps/:campId/slots/:slotId/requests"
            element={<Requests />}
          />
          <Route path="/cities/:cityId/stats" element={<CityStats />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" element={<Error />} />
        </Route>
      </Routes>
    </>
  );
}
