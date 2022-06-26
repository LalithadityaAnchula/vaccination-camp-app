//React Hooks
import { useState, useContext, useEffect } from "react";

//Router dom imports
import { useNavigate } from "react-router-dom";

//contexts
import UserContext from "../../../context/users/UserContext";
import useAuth from "../../../hooks/useAuth";

//Actions
import { getAll } from "../../../context/users/UserAction";

//Components
import AvailableCities from "../../shared/AvailableCities";
import AvailableCamps from "../../shared/AvailableCamps";

//React icons
import { FiSearch } from "react-icons/fi";
import Loader from "../../shared/Loader";

export default function Home() {
  const navigate = useNavigate();
  const { isLoading, dispatch } = useContext(UserContext);
  const { setAuth } = useAuth();
  const [searchTarget, setSearchTarget] = useState("");
  const [citySearchResults, setCitySearchResults] = useState([]);
  const [campsSearchResults, setCampSearchResults] = useState([]);
  const isSearchTargetValid = new RegExp("[a-zA-Z]", "i").test(searchTarget);

  useEffect(() => {
    if (isSearchTargetValid || searchTarget === "") {
      dispatch({ type: "SET_LOADING" });
      const fetchResults = async () => {
        const response = await getAll(searchTarget);
        if (response.success) {
          setCitySearchResults(response.data.cities.data);
          setCampSearchResults(response.data.camps.data);
          dispatch({ type: "GET_CITIES", payload: response.data.cities.data });
          dispatch({ type: "GET_CAMPS", payload: response.data.camps.data });
          setAuth((prevValue) => ({ ...prevValue, role: response.role }));
        }
      };
      fetchResults();
    }
  }, [dispatch, navigate, searchTarget, isSearchTargetValid, setAuth]);

  return (
    <>
      <main className="container">
        <div className="my-6 columns">
          <div className="column is-half">
            <div className="field">
              <div
                className={`control is-large has-icons-left ${
                  isLoading && "is-loading"
                }`}
              >
                <input
                  type="text"
                  className={`input is-medium is-rounded ${
                    !isSearchTargetValid && searchTarget && "is-danger"
                  }`}
                  value={searchTarget}
                  onChange={(e) => setSearchTarget(e.target.value)}
                />
                <p className="fix-height-16 help is-danger has-text-centered">
                  {!isSearchTargetValid &&
                    searchTarget !== "" &&
                    "Invalid search target"}
                </p>
                <span className="icon is-large is-left">
                  <FiSearch color="blue" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {searchTarget !== "" && citySearchResults.length > 0 && (
            <h2 className="mx-6 my-5 title is-4 has-text-grey">Cities</h2>
          )}
          <AvailableCities />
          {searchTarget !== "" && campsSearchResults.length > 0 && (
            <>
              <h2 className="mx-6 my-5 title is-4 has-text-grey">Camps</h2>
              <AvailableCamps />
            </>
          )}
        </>
      )}
    </>
  );
}
