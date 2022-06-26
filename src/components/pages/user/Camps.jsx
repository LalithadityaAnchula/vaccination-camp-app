import AvailableCamps from "../../shared/AvailableCamps";
import UserContext from "../../../context/users/UserContext";
import { getCamps } from "../../../context/users/UserAction";
import { useContext, useEffect } from "react";
import Loader from "../../shared/Loader";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export default function Camps() {
  const navigate = useNavigate();
  const { cityName } = useParams();
  const { isLoading, dispatch } = useContext(UserContext);
  const { setAuth } = useAuth();
  const { cityId } = useParams();

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const fetchCamps = async () => {
      const response = await getCamps("", cityId);
      if (response.success) {
        dispatch({ type: "GET_CAMPS", payload: response.data });
        setAuth((prevValue) => ({ ...prevValue, role: response.role }));
      }
    };
    fetchCamps();
  }, [dispatch, navigate, cityId, setAuth]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="section">
            <h1 className="title has-text-grey">{cityName}</h1>
          </div>
          <AvailableCamps />
        </>
      )}
    </>
  );
}
