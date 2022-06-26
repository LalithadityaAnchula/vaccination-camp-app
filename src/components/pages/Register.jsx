import logo from "../../assets/images/logo.png";
import Alert from "../shared/Alert";
import { MdOutlineMail, MdDriveFileRenameOutline } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { FcOk } from "react-icons/fc";
import { FaExclamation } from "react-icons/fa";
import { TbDeviceMobile } from "react-icons/tb";
import { AiOutlineIdcard } from "react-icons/ai";
import UserContext from "../../context/users/UserContext";
import AlertContext from "../../context/alert/AlertContext";
import { authenticate, registerUser } from "../../context/users/UserAction";
import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import FloatUp from "../shared/FloatUp";

export default function Register() {
  const navigate = useNavigate();
  const { isLoading, dispatch } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);
  const [fName, setFirstName] = useState("");
  const [lName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [aadhar, setAadhar] = useState("");

  // eslint-disable-next-line
  const isEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email
  );
  const isValidMobile = /^[6-9]\d{9}$/gi.test(phone);
  const isValidAadhar = /^[01]\d{3}[\s-]?\d{4}[\s-]?\d{4}$/.test(aadhar);
  const isValidPassword = password.length >= 6;
  const isValidConfirmPassword =
    password === confirmPassword && confirmPassword.length >= 6;

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const checkCookies = async () => {
      const response = await authenticate();
      if (response.success) {
        dispatch({ type: "UNSET_LOADING" });
        if (response.data.role === "admin") {
          navigate("/admin");
        } else if (response.data.role === "user") {
          navigate("/");
        }
      } else {
        dispatch({ type: "UNSET_LOADING" });
      }
    };
    checkCookies();
  }, [dispatch, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) alert("password != confirmPassword");
    dispatch({ type: "SET_LOADING" });
    const response = await registerUser(
      fName,
      lName,
      email,
      phone,
      aadhar,
      password
    );
    if (response.success) {
      console.log("Registered successfully");
      dispatch({ type: "REGISTER_USER", payload: response.data });
      navigate("/");
    } else {
      dispatch({ type: "UNSET_LOADING" });
      setAlert("Registration Failed", "danger");
    }
  };

  return (
    <FloatUp>
      <form
        onSubmit={handleSubmit}
        className="is-flex is-flex-direction-column is-justify-content-center is-flex-wrap-wrap is-align-content-center"
      >
        <section className="container">
          <div className="is-flex is-justify-content-center is-flex-wrap-wrap is-align-content-center">
            <img
              style={{ width: "200px", height: "200px" }}
              src={logo}
              alt="logo"
            />
          </div>
          <Alert />
          <div className="columns is-multiline">
            <div className="column is-half">
              <div className="field">
                <label className="label" htmlFor="firstName">
                  First Name
                </label>
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input is-medium"
                    type="text"
                    name="f_name"
                    placeholder="First name"
                    value={fName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                  <span className="icon is-small is-left">
                    <MdDriveFileRenameOutline />
                  </span>
                  <span className="icon is-small is-right"></span>
                </p>
              </div>
            </div>
            <div className="column is-half">
              <div className="field">
                <label className="label" htmlFor="lastName">
                  Last Name
                </label>
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input is-medium"
                    type="text"
                    name="l_name"
                    placeholder="Last name"
                    value={lName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                  <span className="icon is-small is-left">
                    <MdDriveFileRenameOutline />
                  </span>
                  <span className="icon is-small is-right"></span>
                </p>
              </div>
            </div>
            <div className="column is-half">
              <div className="field">
                <label className="label" htmlFor="email">
                  Email
                </label>
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input is-medium"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
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
                </p>
              </div>
            </div>
            <div className="column is-half">
              <div className="field">
                <label className="label" htmlFor="phone">
                  Mobile no
                </label>
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input is-medium"
                    type="text"
                    name="phone"
                    placeholder="Mobile no:"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                  <span className="icon is-small is-left">
                    <TbDeviceMobile />
                  </span>
                  <span className="icon is-small is-right">
                    {isValidMobile ? (
                      <FcOk />
                    ) : (
                      phone !== "" && <FaExclamation size="12" color="red" />
                    )}
                  </span>
                </p>
              </div>
            </div>
            <div className="column is-half">
              <div className="field">
                <label className="label" htmlFor="password">
                  Password
                </label>
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input is-medium"
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
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
                </p>
              </div>
            </div>
            <div className="column is-half">
              <div className="field">
                <label className="label" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input is-medium"
                    type="password"
                    name="confirmPassword"
                    placeholder="Retype password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                  <span className="icon is-small is-left">
                    <FiLock />
                  </span>
                  <span className="icon is-small is-right">
                    {isValidConfirmPassword ? (
                      <FcOk />
                    ) : (
                      confirmPassword !== "" && (
                        <FaExclamation size="12" color="red" />
                      )
                    )}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="aadhar">
              Aadhar no
            </label>
            <p className="control has-icons-left has-icons-right">
              <input
                className="input is-medium"
                type="text"
                name="aadhar"
                placeholder="Aadhar no :"
                value={aadhar}
                onChange={(e) => {
                  setAadhar(e.target.value);
                }}
              />
              <span className="icon is-small is-left">
                <AiOutlineIdcard />
              </span>
              <span className="icon is-small is-right">
                {isValidAadhar ? (
                  <FcOk />
                ) : (
                  aadhar !== "" && <FaExclamation size="12" color="red" />
                )}
              </span>
            </p>
            <p className="my-2">
              <Link to="/login" className="is-link">
                <em>Click here to Login</em>
              </Link>
            </p>
          </div>
          <div className="field level">
            <p className="control level-item">
              {isValidAadhar &&
              isValidMobile &&
              isEmailValid &&
              isValidPassword &&
              isValidConfirmPassword ? (
                <button
                  className={`button is-success is-medium ${
                    isLoading && "is-loading"
                  }`}
                >
                  Register
                </button>
              ) : (
                <button className={"button is-success is-medium"} disabled>
                  Register
                </button>
              )}
            </p>
          </div>
        </section>
      </form>
    </FloatUp>
  );
}
