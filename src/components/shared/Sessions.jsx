import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/users/UserContext";
import AlertContext from "../../context/alert/AlertContext";
import {
  getActiveSessions,
  terminateSessions,
} from "../../context/users/UserAction";
import { useEffect } from "react";
import Alert from "./Alert";
import SessionRecord from "./SessionRecord";

export default function Sessions({ isShowModal, setIsShowModal }) {
  const { isLoading, dispatch, sessions } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "UNSET_LOADING" });
    const fetchActiveSessions = async () => {
      const response = await getActiveSessions();
      if (response.success) {
        dispatch({ type: "GET_SESSIONS", payload: response.data });
      } else {
        dispatch({ type: "UNSET_LOADING" });
        setAlert(response.msg, "danger");
      }
    };
    fetchActiveSessions();
  }, [dispatch, setAlert]);

  const handleTerminateAll = async (e) => {
    dispatch({ type: "SET_LOADING" });
    const response = await terminateSessions();
    if (response.success) {
      dispatch({ type: "TERMINATE_SESSIONS" });
      navigate("/login");
    } else {
      dispatch({ type: "UNSET_LOADING" });
      setAlert(response.msg, "danger");
    }
  };

  return (
    <div className={`modal is-clipped ${isShowModal && "is-active"} section`}>
      <div className="modal-background" />
      <div className="modal-card">
        <Alert />
        <header className="modal-card-head has-background-success-light">
          <p className="modal-card-title">Active Sessions</p>
          <button
            onClick={(e) => {
              setIsShowModal(false);
            }}
            className="delete"
            aria-label="close"
          />
        </header>
        <section className="modal-card-body">
          {sessions.map((session) => (
            <SessionRecord key={session.id} session={session} />
          ))}
        </section>
        <footer className="modal-card-foot is-flex is-justify-content-center is-align-items-center has-background-success-light">
          <button
            onClick={handleTerminateAll}
            className={`button is-success ${isLoading && "is-loading"}`}
          >
            Terminate all
          </button>
        </footer>
      </div>
    </div>
  );
}
