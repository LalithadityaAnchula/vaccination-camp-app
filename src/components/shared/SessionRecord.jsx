import { MdDeleteOutline } from "react-icons/md";
import { BiDevices } from "react-icons/bi";
import {
  FaFirefoxBrowser,
  FaChrome,
  FaEdge,
  FaSafari,
  FaOpera,
} from "react-icons/fa";
import { SiBrave } from "react-icons/si";
import { GoBrowser } from "react-icons/go";

import UserContext from "../../context/users/UserContext";
import AlertContext from "../../context/alert/AlertContext";
import { terminateSession } from "../../context/users/UserAction";
import { useContext } from "react";

export default function SessionRecord({ session }) {
  const { dispatch } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);
  const browser = {
    Chrome: <FaChrome color="green" />,
    Firefox: <FaFirefoxBrowser color="orange" />,
    Safari: <FaSafari color="blue" />,
    Edge: <FaEdge color="blue" />,
    Brave: <SiBrave color="orange" />,
    Opera: <FaOpera color="red" />,
  };

  const handleTerminateSession = async (e) => {
    dispatch({ type: "SET_LOADING" });
    const response = await terminateSession(session.id);
    if (response.success) {
      dispatch({ type: "TERMINATE_SESSION", payload: session.id });
    } else {
      dispatch({ type: "UNSET_LOADING" });
      setAlert(response.msg, "danger");
    }
  };

  return (
    <div className="columns">
      <div className="column is-one-third is-flex is-justify-content-center is-align-items-center ">
        <div className="icon-text">
          <span className="icon has-text-grey">
            <BiDevices color="black" />
          </span>
          <span> {session?.ua?.os?.name}</span>
        </div>
      </div>
      <div className="column is-one-third is-flex is-justify-content-center is-align-items-center ">
        <div className="icon-text">
          <span className="icon has-text-success">
            {browser[session?.ua?.browser?.name] !== undefined ? (
              browser[session?.ua?.browser?.name]
            ) : (
              <GoBrowser />
            )}
          </span>
          <span> {session?.ua?.browser?.name}</span>
        </div>
      </div>
      <div className="column is-one-third is-flex is-justify-content-center is-align-items-center ">
        <MdDeleteOutline
          className="is-clickable"
          color="red"
          onClick={handleTerminateSession}
        />
      </div>
    </div>
  );
}
