import AvailableSlots from "../../shared/AvailableSlots";
import UserContext from "../../../context/users/UserContext";
import { getSlots, getUser } from "../../../context/users/UserAction";
import { useContext, useEffect } from "react";
import Loader from "../../shared/Loader";
import { useNavigate, useParams } from "react-router-dom";

export default function Slots() {
  const navigate = useNavigate();
  const { isLoading, dispatch } = useContext(UserContext);
  const { cityId, campId, campName } = useParams();
  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const fetchSlotsAndUsers = async () => {
      const userResponse = await getUser();
      const response = await getSlots(cityId, campId);
      if (response.success) {
        dispatch({ type: "GET_SLOTS", payload: response.data });
        dispatch({ type: "GET_USER", payload: userResponse.data });
      }
    };
    fetchSlotsAndUsers();
  }, [dispatch, navigate, campId, cityId]);

  return (
    <>
      <div className="fix-height-loader">{isLoading && <Loader />}</div>
      <div className="section">
        <h1 className="title has-text-grey">{campName}</h1>
      </div>
      <AvailableSlots />
    </>
  );
}
