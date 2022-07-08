//Components
import AvailableSlots from "../../shared/AvailableSlots";
import Loader from "../../shared/Loader";
import Alert from "../../shared/Alert";
//contexts
import UserContext from "../../../context/users/UserContext";
import AlertContext from "../../../context/alert/AlertContext";
//actions
import { getSlots } from "../../../context/users/UserAction";
import { createSlot } from "../../../context/users/AdminAction";
//React icons
import { CgTimer, CgCalendarDates } from "react-icons/cg";
import { TbNumbers } from "react-icons/tb";
//router dom imports
import { useNavigate, useParams } from "react-router-dom";
//React hooks
import { useContext, useEffect, useState } from "react";

export default function AdminSlots() {
  const navigate = useNavigate();
  const { isLoading, dispatch } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);
  const { cityId, campId, campName } = useParams();
  const initialState = {
    date: new Date().toLocaleDateString("en-ca"),
    doseType: 1,
    slotType: "morning",
  };
  const [slot, setSlot] = useState(initialState);
  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const fetchSlots = async () => {
      const response = await getSlots(cityId, campId);
      if (response.success)
        dispatch({ type: "GET_SLOTS", payload: response.data });
      else navigate("/login");
    };
    fetchSlots();
  }, [dispatch, navigate, campId, cityId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING" });
    const response = await createSlot(cityId, campId, slot);
    if (response.success) {
      dispatch({ type: "ADD_SLOT", payload: response.data });
    } else {
      dispatch({ type: "UNSET_LOADING" });
      setAlert(response.msg, "danger");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="section">
        <h1 className="title pb-4">{campName}</h1>
        <div className="columns">
          <div className="column is-narrow">
            <div className="field">
              <label htmlFor="date" className="label">
                Date
              </label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input px-6"
                  type="date"
                  placeholder="date"
                  value={slot.date}
                  min={new Date().toLocaleDateString("en-ca")}
                  onChange={(e) =>
                    setSlot((prevValue) => ({
                      ...prevValue,
                      date: e.target.value,
                    }))
                  }
                />
                <div className="help is-danger has-text-centered">
                  <Alert />
                </div>
                <span className="icon is-small is-left">
                  <CgCalendarDates />
                </span>
                <span className="icon is-small is-right"></span>
              </div>
            </div>
          </div>
          <div className="column is-narrow">
            <div className="field">
              <label htmlFor="slotType" className="label">
                Slot type
              </label>
              <div className="control has-icons-left has-icons-right">
                <div className="select">
                  <select
                    name="slotType"
                    className="select"
                    value={slot.slotType}
                    onChange={(e) =>
                      setSlot((prevValue) => ({
                        ...prevValue,
                        slotType: e.target.value,
                      }))
                    }
                  >
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                  </select>
                </div>
                <span className="icon is-small is-left">
                  <CgTimer />
                </span>
                <span className="icon is-small is-right"></span>
              </div>
            </div>
          </div>
          <div className="column is-narrow">
            <div className="field">
              <label htmlFor="doseType" className="label">
                Dose type
              </label>
              <div className="control has-icons-left has-icons-right">
                <div className="select">
                  <select
                    name="slotType"
                    className="select"
                    value={slot.doseType}
                    onChange={(e) =>
                      setSlot((prevValue) => ({
                        ...prevValue,
                        doseType: e.target.value,
                      }))
                    }
                  >
                    <option value="1">One</option>
                    <option value="2">Two</option>
                  </select>
                </div>
                <span className="icon is-small is-left">
                  <TbNumbers />
                </span>
                <span className="icon is-small is-right"></span>
              </div>
            </div>
          </div>
          <div className="column is-narrow">
            <div className="field">
              <div className="control" style={{ marginTop: "32px" }}>
                <button className="button is-info">Add Slot</button>
              </div>
            </div>
          </div>
        </div>
        <section style={{ height: "20px" }}>{isLoading && <Loader />}</section>
        <AvailableSlots role="admin" />
      </form>
    </>
  );
}
