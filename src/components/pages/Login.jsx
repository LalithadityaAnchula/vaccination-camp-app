import logo from "../../assets/images/logo.png";
import Alert from "../shared/Alert";
import { MdOutlineMail } from "react-icons/md";
import { FcOk } from "react-icons/fc";
import { FiLock } from "react-icons/fi";
import { FaExclamation } from "react-icons/fa";
import UserContext from "../../context/users/UserContext";
import AlertContext from "../../context/alert/AlertContext";
import { loginUser } from "../../context/users/UserAction";

import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isLoading, dispatch } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);

  // eslint-disable-next-line
  const isEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING" });
    const response = await loginUser(email, password);
    dispatch({ type: "GET_USER", payload: response.data });
    if (response.success) {
      if (response.role === "admin") {
        navigate("/admin");
      } else if (response.role === "user") {
        navigate("/");
      }
    } else {
      setAlert(response.msg, "danger");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <form
      className="is-flex is-flex-direction-column is-justify-content-center is-flex-wrap-wrap is-align-content-center min-vh-90"
      onSubmit={handleSubmit}
    >
      <section className="section">
        <div className="is-flex is-justify-content-center is-flex-wrap-wrap is-align-content-center">
          <img
            style={{ width: "200px", height: "200px" }}
            src={logo}
            alt="logo"
          />
        </div>
        <Alert />
        <div className="field">
          <div className="control has-icons-left has-icons-right">
            <input
              className="input is-medium"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <p className="fix-height-16 help is-success">
              {isEmailValid && "Valid email format"}
            </p>
            <span className="icon is-small is-left">
              <MdOutlineMail />
            </span>
            <span className="icon is-small is-right">
              {isEmailValid ? (
                <FcOk />
              ) : (
                email !== "" && <FaExclamation size="12" color="red" />
              )}
            </span>
            <span className="icon is-small is-right"></span>
          </div>
        </div>
        <div className="field">
          <div className="control has-icons-left has-icons-right">
            <input
              className="input is-medium"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <p className="fix-height-16 help is-success">
              {password.length >= 6 && " Valid password length"}
            </p>
            <span className="icon is-small is-left">
              <FiLock />
            </span>
            <span className="icon is-small is-right">
              {password.length >= 6 ? (
                <FcOk />
              ) : (
                password !== "" && <FaExclamation size="12" color="red" />
              )}
            </span>
          </div>
          <p className="my-2">
            <em>
              <Link to="/register" className="is-link">
                Click here to Sign Up{" "}
              </Link>
            </em>
          </p>
        </div>
        <div className="field level">
          <p className="control level-item">
            {isEmailValid && password.length >= 6 ? (
              <button
                className={`button is-success is-medium ${
                  isLoading && "is-loading"
                }`}
                type="submit"
              >
                Login
              </button>
            ) : (
              <button
                className="button is-success is-medium"
                type="submit"
                disabled
              >
                Login
              </button>
            )}
          </p>
        </div>
      </section>
    </form>
  );
}
