import { useContext } from "react";
import UserContext from "../../context/users/UserContext";
import AlertContext from "../../context/alert/AlertContext";
import { acceptRequest } from "../../context/users/AdminAction";

export default function RequestRow({ request }) {
  const { isLoading, dispatch } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);

  const handleClick = async () => {
    dispatch({ type: "SET_LOADING" });
    const response = await acceptRequest(request.slot._id, request._id);
    if (response.success) {
      dispatch({ type: "UNSET_LOADING" });
      dispatch({ type: "ACCEPT_REQUEST", payload: response.data });
      dispatch({ type: "GET_USER", payload: response.data.user });
    } else {
      dispatch({ type: "UNSET_LOADING" });
      setAlert(response.msg, "danger");
    }
  };

  return (
    <tr key={request._id}>
      <td>
        <a href="/" title="Leicester City F.C.">
          {request.user.firstName}
        </a>
      </td>
      <td>
        <a href="/" title="Leicester City F.C.">
          {request?.user?.lastName}
        </a>
      </td>
      <td>{request?.user?.phone}</td>
      <td>{request?.slot?.doseType}</td>
      <td>
        {console.log(new Date())}
        {new Date(request?.slot?.date).getTime() >= new Date().getTime() ? (
          <button className="button is-primary is-outlined is-small" disabled>
            Accept
          </button>
        ) : (
          <button
            className={`button is-primary is-outlined is-small ${
              isLoading && "is-loading"
            }`}
            onClick={handleClick}
          >
            Accept
          </button>
        )}
      </td>
    </tr>
  );
}
