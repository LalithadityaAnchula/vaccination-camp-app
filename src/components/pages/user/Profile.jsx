import { MdOutlineMail, MdDriveFileRenameOutline } from "react-icons/md";
import { TbDeviceMobile } from "react-icons/tb";
import { AiOutlineIdcard } from "react-icons/ai";
import { FcOk, FcApproval, FcApprove, FcBadDecision } from "react-icons/fc";
import { FaExclamation } from "react-icons/fa";
import UserContext from "../../../context/users/UserContext";
import AlertContext from "../../../context/alert/AlertContext";
import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, updateUser } from "../../../context/users/UserAction";
import Loader from "../../shared/Loader";
import Alert from "../../shared/Alert";
import FloatLeft from "../../shared/FloatLeft";
import FloatRight from "../../shared/FloatRight";
import FloatDown from "../../shared/FloatDown";
import SlotCard from "../../shared/SlotCard";
import DoseDetails from "../../shared/DoseDetails";

export default function Profile() {
  const { isLoading, dispatch, user } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);
  let prevUserDetails = useRef({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    aadhar: "",
  });
  const [currentUser, setCurrentUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    aadhar: "",
  });
  const navigate = useNavigate();

  // eslint-disable-next-line
  const isEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    currentUser.email
  );
  const isValidMobile = /^[6-9]\d{9}$/gi.test(currentUser.phone);
  const isValidAadhar = /^[01]\d{3}[\s-]?\d{4}[\s-]?\d{4}$/.test(
    currentUser.aadhar
  );

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const checkCookies = async () => {
      const response = await getUser();
      setCurrentUser(response.data);
      if (response.success) {
        prevUserDetails.current = response.data;
        dispatch({ type: "GET_USER", payload: response.data });
      } else {
        navigate("/login");
      }
    };
    checkCookies();
  }, [dispatch, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING" });
    const response = await updateUser(
      currentUser.firstName,
      currentUser.lastName,
      currentUser.email,
      currentUser.phone,
      currentUser.aadhar
    );
    if (response.success) {
      setCurrentUser(response.data);
      prevUserDetails.current = response.data;
      dispatch({ type: "GET_USER", payload: response.data });
    } else {
      setAlert("Proile Update failed", "danger");
    }
  };

  return (
    <>
      <div className="fix-height-loader">{isLoading && <Loader />}</div>
      <div className="columns is-desktop">
        <div className="column section">
          <FloatRight>
            <div className="is-flex is-justify-content-center block">
              <FloatDown>
                {user?.firstDose && user?.secondDose ? (
                  <button className="button is-large is-hovered">
                    <span>Vaccinated</span>
                    <span className="icon is-medium">
                      <FcApproval />
                    </span>
                  </button>
                ) : user?.firstDose ? (
                  <button className="button is-large is-hovered">
                    <span>Partially vaccinated</span>
                    <span className="icon is-medium">
                      <FcApprove />
                    </span>
                  </button>
                ) : (
                  <button className="button is-large is-hovered">
                    <span>Not vaccinated</span>
                    <span className="icon is-medium">
                      <FcBadDecision />
                    </span>
                  </button>
                )}
              </FloatDown>
            </div>
            {user.activeSlot !== undefined && (
              <>
                <h1 className="title is-4 block">Booked Slots</h1>
                <SlotCard slot={user.activeSlot} />
              </>
            )}
            <div className="columns is-desktop">
              <div className="column">
                {user.firstDose !== undefined && (
                  <DoseDetails doseDetails={user?.firstDose} />
                )}
              </div>
              <div className="column">
                {user.secondDose !== undefined && (
                  <DoseDetails doseDetails={user?.secondDose} />
                )}
              </div>
            </div>
          </FloatRight>
        </div>
        <form onSubmit={handleSubmit} className="section column">
          <FloatLeft>
            <Alert />
            <div className="columns is-multiline">
              <div className="column is-half">
                <div className="field">
                  <label className="label" htmlFor="firstName">
                    First Name
                  </label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      type="text"
                      className="input is-medium"
                      value={currentUser.firstName}
                      onChange={(e) => {
                        setCurrentUser({
                          ...currentUser,
                          firstName: e.target.value,
                        });
                      }}
                    />
                    <span className="icon is-small is-left">
                      <MdDriveFileRenameOutline />
                    </span>
                  </div>
                </div>
              </div>
              <div className="column is-half">
                <div className="field">
                  <label className="label" htmlFor="lastName">
                    Last Name
                  </label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      type="text"
                      className="input is-medium"
                      value={currentUser.lastName}
                      onChange={(e) => {
                        setCurrentUser({
                          ...currentUser,
                          lastName: e.target.value,
                        });
                      }}
                    />
                    <span className="icon is-small is-left">
                      <MdDriveFileRenameOutline />
                    </span>
                  </div>
                </div>
              </div>
              <div className="column is-half">
                <div className="field">
                  <label className="label" htmlFor="email">
                    Email
                  </label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      type="email"
                      className="input is-medium"
                      value={currentUser.email}
                      onChange={(e) => {
                        setCurrentUser({
                          ...currentUser,
                          email: e.target.value,
                        });
                      }}
                    />
                    <span className="icon is-small is-left">
                      <MdOutlineMail />
                    </span>
                    <span className="icon is-small is-right">
                      {isEmailValid ? (
                        <FcOk />
                      ) : (
                        currentUser.email !== "" && (
                          <FaExclamation size="12" color="red" />
                        )
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="column is-half">
                <div className="field">
                  <label className="label" htmlFor="mobile">
                    Mobile
                  </label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      type="text"
                      className="input is-medium"
                      value={currentUser.phone}
                      onChange={(e) => {
                        setCurrentUser({
                          ...currentUser,
                          phone: e.target.value,
                        });
                      }}
                    />
                    <span className="icon is-small is-left">
                      <TbDeviceMobile />
                    </span>
                    <span className="icon is-small is-right">
                      {isValidMobile ? (
                        <FcOk />
                      ) : (
                        currentUser.phone !== "" && (
                          <FaExclamation size="12" color="red" />
                        )
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="column is-half">
                <div className="field">
                  <label className="label" htmlFor="aadhar">
                    Aadhar number
                  </label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      type="text"
                      className="input is-medium"
                      value={currentUser.aadhar}
                      onChange={(e) => {
                        setCurrentUser({
                          ...currentUser,
                          aadhar: e.target.value,
                        });
                      }}
                    />
                    <span className="icon is-small is-left">
                      <AiOutlineIdcard />
                    </span>
                    <span className="icon is-small is-right">
                      {isValidAadhar ? (
                        <FcOk />
                      ) : (
                        currentUser.aadhar !== "" && (
                          <FaExclamation size="12" color="red" />
                        )
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="level">
              <div className="level-item">
                {prevUserDetails.current.firstName === currentUser.firstName &&
                prevUserDetails.current.lastName === currentUser.lastName &&
                prevUserDetails.current.email === currentUser.email &&
                prevUserDetails.current.phone.toString() ===
                  currentUser.phone.toString() &&
                prevUserDetails.current.aadhar.toString() ===
                  currentUser.aadhar.toString() ? (
                  <button className={"button is-medium is-success"} disabled>
                    Save Changes
                  </button>
                ) : isValidAadhar && isValidMobile && isEmailValid ? (
                  <button
                    className={`button is-medium is-success ${
                      isLoading && "is-loading"
                    }`}
                  >
                    Save Changes
                  </button>
                ) : (
                  <button className={"button is-medium is-success"} disabled>
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          </FloatLeft>
        </form>
      </div>
    </>
  );
}
