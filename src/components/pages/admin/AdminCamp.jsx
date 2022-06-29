import Loader from "../../shared/Loader";
import Alert from "../../shared/Alert";
import UserContext from "../../../context/users/UserContext";
import AlertContext from "../../../context/alert/AlertContext";
import { getCamp } from "../../../context/users/UserAction";
import { updateCamp } from "../../../context/users/AdminAction";
import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdLocationCity, MdOutlineEmojiPeople } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";
import { RiSyringeFill } from "react-icons/ri";

export default function AdminCamp() {
  const navigate = useNavigate();
  const { isLoading, dispatch, user } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);
  const [camp, setCamp] = useState({
    vaccinationStock: {
      firstDose: 0,
      secondDose: 0,
    },
    name: "camp",
    population: 0,
  });
  const { campId, cityId } = useParams();
  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const fetchCamp = async (campId) => {
      const response = await getCamp(cityId, campId);
      if (response.success) {
        setCamp(response.data);
        dispatch({ type: "GET_CAMP" });
      }
    };
    fetchCamp(campId);
  }, [dispatch, user, campId, navigate, cityId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING" });
    const response = await updateCamp(cityId, campId, camp);
    if (response.success && response.role === "admin") {
      setCamp(response.data);
      dispatch({ type: "UPDATE_CAMP", payload: response.data });
    } else {
      dispatch({ type: "UNSET_LOADING" });
      setAlert(response.msg, "danger");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="section">
      <h1 className="title pb-4 has-text-grey">Update camp</h1>
      <div className="columns is-multiline">
        <div className="column is-one-third">
          <div className="field">
            <label className="label is-medium">Camp Name</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input is-medium"
                type="text"
                placeholder="Extra small"
                value={camp.name}
                onChange={(e) =>
                  setCamp((prevValue) => ({
                    ...prevValue,
                    name: e.target.value,
                  }))
                }
              />
              <p className="help is-danger has-text-centered">
                <Alert />
              </p>
              <span className="icon is-small is-left">
                <MdLocationCity />
              </span>
            </div>
          </div>
        </div>
        <div className="column is-one-third">
          <div className="field">
            <label className="label is-medium">Created On</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input is-medium"
                type="text"
                placeholder="Extra small"
                value={new Date().toLocaleDateString("en-US")}
                readOnly
              />
              <span className="icon is-small is-left">
                <BsCalendar2Date />
              </span>
            </div>
          </div>
        </div>
        <div className="column is-one-third">
          <div className="field">
            <label className="label is-medium">Population</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input is-medium"
                type="number"
                placeholder="Extra small"
                value={camp.population}
                onChange={(e) =>
                  setCamp((prevValue) => ({
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
            <label className="label is-medium">Dose 1</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input is-medium"
                type="number"
                placeholder="Extra small"
                value={camp.vaccinationStock.firstDose}
                onChange={(e) =>
                  setCamp((prevValue) => ({
                    ...prevValue,
                    vaccinationStock: {
                      ...prevValue.vaccinationStock,
                      firstDose: e.target.value,
                    },
                  }))
                }
              />
              <span className="icon is-small is-left">
                <RiSyringeFill />
              </span>
            </div>
          </div>
        </div>
        <div className="column is-one-third">
          <div className="field">
            <label className="label is-medium">Dose 2</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input is-medium"
                type="number"
                placeholder="Extra small"
                value={camp.vaccinationStock.secondDose}
                onChange={(e) =>
                  setCamp((prevValue) => ({
                    ...prevValue,
                    vaccinationStock: {
                      ...prevValue.vaccinationStock,
                      secondDose: e.target.value,
                    },
                  }))
                }
              />
              <span className="icon is-small is-left">
                <RiSyringeFill />
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
  );
}
