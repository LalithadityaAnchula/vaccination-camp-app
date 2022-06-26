import UserContext from "../../../context/users/UserContext";
import { getRequests } from "../../../context/users/AdminAction";
import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../shared/Loader";
import RequestRow from "../../shared/RequestRow";

export default function Requests() {
  const { slotId } = useParams();
  const navigate = useNavigate();
  const { isLoading, dispatch, requests } = useContext(UserContext);
  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const fetchRequests = async () => {
      const response = await getRequests(slotId);
      if (response.success) {
        dispatch({ type: "GET_REQUESTS", payload: response.data });
      } else {
        dispatch({ type: "GET_REQUESTS", payload: [] });
        navigate("/login");
      }
    };
    fetchRequests();
  }, [dispatch, slotId, navigate]);
  if (isLoading) return <Loader />;
  return (
    <div className="section is-flex is-justify-content-center is-flex-wrap-wrap is-align-content-center">
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>
                <abbr title="firstName">First Name</abbr>
              </th>
              <th>
                <abbr title="lastName">Last Name</abbr>
              </th>
              <th>
                <abbr title="mobile">Mobile</abbr>
              </th>
              <th>
                <abbr title="dose">Dose</abbr>
              </th>
              <th>
                <abbr title="accept">Operation</abbr>
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <RequestRow key={request._id} request={request}>
                <tr>
                  <td>
                    <a href="/">{request.user.firstName}</a>
                  </td>
                  <td>
                    <a href="/">{request.user.lastName}</a>
                  </td>
                  <td>{request.user.phone}</td>
                  <td>1</td>
                  <td>
                    <button className="button is-primary is-outlined is-small">
                      Accept
                    </button>
                  </td>
                </tr>
              </RequestRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
