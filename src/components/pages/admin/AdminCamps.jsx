//Components
import AvailableCamps from "../../shared/AvailableCamps";
import Loader from "../../shared/Loader";
import Alert from "../../shared/Alert";
//contexts
import UserContext from "../../../context/users/UserContext";
import AlertContext from "../../../context/alert/AlertContext";
//actions
import { getCamps } from "../../../context/users/UserAction";
import { createCamp } from "../../../context/users/AdminAction";
//React icons
import { GiCampingTent } from "react-icons/gi";
import { RiSyringeFill } from "react-icons/ri";
import { MdLocationOn } from "react-icons/md";
//router dom imports
import { useNavigate, useParams } from "react-router-dom";
//React hooks
import { useState, useContext, useEffect } from "react";

export default function AdminCamps() {
  const navigate = useNavigate();
  const { isLoading, dispatch } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);
  const { cityId, cityName } = useParams();
  const initialState = {
    vaccinationStock: {
      firstDose: 0,
      secondDose: 0,
    },
    address: "",
    name: "",
    city: cityId,
  };
  const [camp, setCamp] = useState(initialState);

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const fetchCamps = async () => {
      const response = await getCamps("", cityId);
      if (response.success)
        dispatch({ type: "GET_CAMPS", payload: response.data });
    };
    fetchCamps();
  }, [dispatch, navigate, cityId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING" });
    const response = await createCamp(cityId, camp);
    if (response.success) {
      dispatch({ type: "ADD_CAMP", payload: response.data });
      setCamp(initialState);
    } else {
      dispatch({ type: "UNSET_LOADING" });
      setAlert(response.msg, "danger");
    }
  };

  return (
    <>
      <main className="section">
        <h1 className="title pb-4">{cityName}</h1>
        <form onSubmit={handleSubmit}>
          <div className="columns is-multiline">
            <div className="column is-narrow">
              <div className="field">
                <label htmlFor="campName" className="label">
                  Camp Name
                </label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className={`input ${isLoading && "is-loading"}`}
                    type="text"
                    placeholder="Camp name"
                    value={camp.name}
                    onChange={(e) =>
                      setCamp((prevValue) => ({
                        ...prevValue,
                        name: e.target.value,
                      }))
                    }
                  />
                  <div className="help is-danger has-text-centered">
                    <Alert />
                  </div>
                  <span className="icon is-small is-left">
                    <GiCampingTent />
                  </span>
                  <span className="icon is-small is-right"></span>
                </div>
              </div>
            </div>
            <div className="column is-narrow">
              <div className="field">
                <label className="label" htmlFor="firstDose">
                  Dose 1
                </label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="number"
                    placeholder="0"
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
            <div className="column is-narrow">
              <div className="field">
                <label className="label" htmlFor="secondDose">
                  Dose 2
                </label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="number"
                    placeholder="0"
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
            <div className="column is-one-third">
              <div className="field">
                <label htmlFor="address" className="label">
                  Address
                </label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className={`input ${isLoading && "is-loading"}`}
                    type="text"
                    placeholder="Address"
                    value={camp.address}
                    onChange={(e) =>
                      setCamp((prevValue) => ({
                        ...prevValue,
                        address: e.target.value,
                      }))
                    }
                  />
                  <span className="icon is-small is-left">
                    <MdLocationOn />
                  </span>
                  <span className="icon is-small is-right"></span>
                </div>
              </div>
            </div>
            <div className="column is-narrow">
              <div className="field">
                <button className="button is-info">Add</button>
              </div>
            </div>
          </div>
        </form>
        <section style={{ height: "20px" }}>{isLoading && <Loader />}</section>
        <AvailableCamps role="admin" />
      </main>
    </>
  );
}
