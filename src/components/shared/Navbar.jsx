import logo from "../../assets/images/logo.png";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoDesktop } from "react-icons/io5";
import UserContext from "../../context/users/UserContext";
import { logoutUser } from "../../context/users/UserAction";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import FloatDown from "../shared/FloatDown";
import Sessions from "./Sessions";

export default function Navbar({ role }) {
  const [isActive, setisActive] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const currentPath = useLocation().pathname;
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const handleMenuToggle = () => {
    setisActive(!isActive);
  };

  const handleLogout = async () => {
    dispatch({ type: "SET_LOADING" });
    const response = await logoutUser();
    dispatch({ type: "LOGOUT_USER" });
    if (response.success) {
      navigate("/login");
    }
  };

  return (
    <FloatDown>
      <nav
        className="navbar px-6 py-3"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <img
            style={{ width: "60px", height: "60px" }}
            className="level-item"
            src={logo}
            alt="logo"
          />

          <p
            role="button"
            onClick={handleMenuToggle}
            className={`navbar-burger ${isActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </p>
        </div>

        <div
          id="navbarBasicExample"
          className={`navbar-menu ${isActive ? "is-active" : ""}`}
        >
          <div className="navbar-end">
            <div className="navbar-item">
              <NavLink
                to={role === "admin" ? "/admin" : "/"}
                onClick={() => setisActive(!isActive)}
                activeclassname="is-active"
                className={`navbar-item button is-white is-tab nav-link${
                  currentPath === "/" ? " is-active" : ""
                }`}
              >
                <AiFillHome className="mx-4" />
              </NavLink>
              <hr />
              <NavLink
                to={role === "admin" ? "/admin/profile" : "/profile"}
                className={`navbar-item button is-white is-tab nav-link${
                  currentPath === "/profile" ? " is-active" : ""
                }`}
              >
                <CgProfile className="mx-4" />
              </NavLink>
              <hr />
              <div className="nav-item is-flex is-justify-content-center is-align-items-center">
                <button className="button is-white" onClick={handleLogout}>
                  <MdOutlineLogout className="mx-4" />
                </button>
              </div>
              <hr />
              <div className="nav-item is-flex is-justify-content-center is-align-items-center">
                <button
                  className="button is-white"
                  onClick={(e) => setIsShowModal(true)}
                >
                  <IoDesktop className="mx-4" />
                </button>
                <Sessions
                  isShowModal={isShowModal}
                  setIsShowModal={setIsShowModal}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </FloatDown>
  );
}
