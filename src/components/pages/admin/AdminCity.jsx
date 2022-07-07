//components
import Loader from "../../shared/Loader";
import Alert from "../../shared/Alert";
//contexts
import UserContext from "../../../context/users/UserContext";
import AlertContext from "../../../context/alert/AlertContext";
//actions
import { getCity } from "../../../context/users/UserAction";
import { updateCity } from "../../../context/users/AdminAction";
//React icons
import { FaCity } from "react-icons/fa";
import { BsCalendar2Date } from "react-icons/bs";
//router dom imports
import { useNavigate, useParams } from "react-router-dom";
import { MdLocationCity, MdOutlineEmojiPeople } from "react-icons/md";
//React hooks
import { useState, useContext, useEffect } from "react";

export default function AdminCity() {
  const navigate = useNavigate();
  const { isLoading, dispatch, user } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);
  const [city, setCity] = useState({
    name: "",
    population: 10,
    isMetroPolitan: false,
  });

  const { cityId } = useParams();

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const fetchCity = async (cityId) => {
      const response = await getCity(cityId);
      if (response.success) {
        setCity(response.data);
        dispatch({ type: "GET_CITY" });
      } else navigate("/login");
    };
    fetchCity(cityId);
  }, [dispatch, user, cityId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING" });
    const response = await updateCity(cityId, city);
    if (response.success) {
      setCity(response.data);
      dispatch({ type: "UNSET_LOADING" });
    } else {
      dispatch({ type: "UNSET_LOADING" });
      setAlert(response.msg, "danger");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="section">
        <h1 className="title pb-4 has-text-grey">Update City</h1>
        <div className="columns is-multiline">
          <div className="column is-one-third">
            <div className="field">
              <label className="label is-medium">City Name</label>
              <div className="control has-icons-left">
                <input
                  className="input is-medium"
                  type="text"
                  placeholder="Name of city"
                  value={city.name}
                  onChange={(e) =>
                    setCity((prevValue) => ({
                      ...prevValue,
                      name: e.target.value,
                    }))
                  }
                  required
                />
                <div className="help is-danger has-text-centered">
                  <Alert />
                </div>
                <span className="icon is-small is-left">
                  <FaCity />
                </span>
              </div>
            </div>
          </div>
          <div className="column is-one-third">
            <div className="field">
              <label className="label is-medium">Population</label>
              <div className="control has-icons-left">
                <input
                  className="input is-medium"
                  type="text"
                  placeholder="Population"
                  value={city.population}
                  min="0"
                  onChange={(e) =>
                    setCity((prevValue) => ({
                      ...prevValue,
                      population: e.target.value,
                    }))
                  }
                />
                <span className="icon is-small is-left">
                  <MdOutlineEmojiPeople />
                </span>
              </div>
            </div>
          </div>
          <div className="column is-one-third">
            <div className="field">
              <label htmlFor="cityType" className="label is-medium">
                City type
              </label>
              <div className="control has-icons-left">
                <div className="select is-medium">
                  <select
                    name="cityType"
                    className="select is-medium"
                    value={city.isMetroPolitan}
                    onChange={(e) =>
                      setCity((prevValue) => ({
                        ...prevValue,
                        isMetroPolitan: e.target.value,
                      }))
                    }
                  >
                    <option value={true}>Metropolitan</option>
                    <option value={false}>Non Metropolitan</option>
                  </select>
                </div>
                <span className="icon is-small is-left">
                  <MdLocationCity />
                </span>
              </div>
            </div>
          </div>
          <div className="column is-one-third">
            <div className="field">
              <label className="label is-medium">Created On</label>
              <div className="control has-icons-left">
                <input
                  className="input is-medium"
                  type="text"
                  placeholder="date"
                  value={new Date().toLocaleDateString("en-US")}
                  readOnly
                />
                <span className="icon is-small is-left">
                  <BsCalendar2Date />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="level">
          <div className="level-item">
            {isLoading ? (
              <Loader />
            ) : (
              <button className={"button is-info is-medium"}>
                Update Changes
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
