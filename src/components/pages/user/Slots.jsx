import AvailableSlots from "../../shared/AvailableSlots";
import UserContext from "../../../context/users/UserContext";
import AlertContext from "../../../context/alert/AlertContext";
import { getSlots, getUser } from "../../../context/users/UserAction";
import { useContext, useEffect } from "react";
import Loader from "../../shared/Loader";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../shared/Alert";

export default function Slots() {
  const navigate = useNavigate();
  const { isLoading, dispatch } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);
  const { cityId, campId } = useParams();
  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const fetchSlotsAndUsers = async () => {
      const userResponse = await getUser();
      const response = await getSlots(cityId, campId);
      if (response.success) {
        dispatch({ type: "GET_SLOTS", payload: response.data });
        dispatch({ type: "GET_USER", payload: userResponse.data });
      } else {
        dispatch({ type: "UNSET_LOADING" });
        console.log(response.msg);
        setAlert(response.msg, "danger");
      }
    };
    fetchSlotsAndUsers();
  }, [dispatch, navigate, campId, cityId, setAlert]);

  return (
    <>
      <div className="fix-height-loader">{isLoading && <Loader />}</div>
      <Alert />
      <main className="section">
        <AvailableSlots role="user" />
      </main>
    </>
  );
}
