import AdminAvailableCamps from "../../shared/AdminAvailableCamps";
import UserContext from "../../../context/users/UserContext";
import { getCamps } from "../../../context/users/UserAction";
import { createCamp } from "../../../context/users/AdminAction";
import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GiCampingTent } from "react-icons/gi";
import { RiSyringeFill } from "react-icons/ri";
import { MdLocationOn } from "react-icons/md";
import Loader from "../../shared/Loader";

export default function AdminCamps() {
  const navigate = useNavigate();
  const { isLoading, dispatch } = useContext(UserContext);
  const { cityId, cityName } = useParams();

  const [camp, setCamp] = useState({
    vaccinationStock: {
      firstDose: 0,
      secondDose: 0,
    },
    address: "",
    name: "",
    city: cityId,
  });

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
    } else dispatch({ type: "UNSET_LOADING" });
  };

  return (
    <>
      <div className="section">
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
              <div className="field" style={{ marginTop: "32px" }}>
                <button className="button is-info">Add</button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {isLoading ? <Loader /> : <AdminAvailableCamps />}
    </>
  );
}
