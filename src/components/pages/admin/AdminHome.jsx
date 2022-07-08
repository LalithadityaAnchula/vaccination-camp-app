//Components
import AdminAvailableCities from "../../shared/AdminAvailableCities";
import AdminAvailableCamps from "../../shared/AdminAvailableCamps";
import FloatDown from "../../shared/FloatDown";
import Loader from "../../shared/Loader";
import Alert from "../../shared/Alert";
//contexts
import UserContext from "../../../context/users/UserContext";
import AlertContext from "../../../context/alert/AlertContext";
//Actions
import { getAll } from "../../../context/users/UserAction";
import { createCity } from "../../../context/users/AdminAction";
//React icons
import { FiSearch } from "react-icons/fi";
import { MdLocationCity } from "react-icons/md";
//React Hooks
import { useState, useContext, useEffect, useRef } from "react";

export default function AdminHome() {
  const { isLoading, dispatch } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);
  const [searchTarget, setSearchTarget] = useState("");
  const prevSearchTarget = useRef("");
  const [citySearchResults, setCitySearchResults] = useState([]);
  const [campsSearchResults, setCampSearchResults] = useState([]);
  const [isSearchResulstNone, setIsSearchResultsNone] = useState(false);
  const [isMetroPolitan, setIsMetroPolitan] = useState(false);
  const isSearchTargetValid = /^[a-zA-Z]+$/.test(searchTarget);

  useEffect(() => {
    if (
      (isSearchTargetValid &&
        searchTarget.length >= 3 &&
        !isSearchResulstNone) ||
      searchTarget === ""
    ) {
      dispatch({ type: "SET_LOADING" });
      const fetchResults = async () => {
        const response = await getAll(searchTarget);
        if (response.success) {
          setCitySearchResults(response.data.cities.data);
          setCampSearchResults(response.data.camps.data);
          const noResults =
            response.data.cities.data.length === 0 &&
            response.data.camps.data.length === 0;

          prevSearchTarget.current = noResults ? searchTarget : "";

          setIsSearchResultsNone(
            noResults
              ? searchTarget.startsWith(prevSearchTarget.current)
              : false
          );

          dispatch({ type: "GET_CITIES", payload: response.data.cities.data });
          dispatch({ type: "GET_CAMPS", payload: response.data.camps.data });
        } else {
          setAlert(response.msg, "danger");
        }
      };
      fetchResults();
    } else if (isSearchResulstNone) {
      setIsSearchResultsNone(searchTarget.startsWith(prevSearchTarget.current));
    }
  }, [
    dispatch,
    searchTarget,
    isSearchTargetValid,
    setAlert,
    isSearchResulstNone,
  ]);

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING" });
    const response = await createCity({
      name: searchTarget,
      isMetroPolitan,
    });
    if (response.success) {
      dispatch({ type: "ADD_CITY", payload: response.data });
    } else {
      dispatch({ type: "UNSET_LOADING" });
      setAlert(response.msg, "danger");
    }
    setSearchTarget("");
  };

  return (
    <>
      <main className="container">
        <div className="section columns">
          <div className="column is-half is-offset-one-quarter">
            <FloatDown>
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
                  <div className="fix-height-16 help is-danger has-text-centered">
                    {!isSearchTargetValid &&
                      searchTarget !== "" &&
                      "Invalid search target"}
                    <Alert />
                  </div>
                  <span className="icon is-large is-left">
                    <FiSearch color="blue" />
                  </span>
                </div>
              </div>
            </FloatDown>
          </div>
        </div>
        {citySearchResults.length === 0 &&
          searchTarget !== "" &&
          isSearchTargetValid && (
            <>
              <h2 className="subtitle has-text-primary has-text-centered">
                No "{searchTarget}" city, add it ?
              </h2>
              <div className="is-flex is-justify-content-center is-flex-wrap-wrap is-align-content-center">
                <div className="field has-addons">
                  <div className="control has-icons-left">
                    <div className="select">
                      <select
                        name="cityType"
                        className="select"
                        value={isMetroPolitan}
                        onChange={(e) => setIsMetroPolitan(e.target.value)}
                      >
                        <option value={false}>Non Metropolitan</option>
                        <option value={true}>Metropolitan</option>
                      </select>
                    </div>
                    <span className="icon is-small is-left">
                      <MdLocationCity />
                    </span>
                  </div>
                  <div className="control">
                    <button
                      onClick={handleClick}
                      className="button is-success is-outlined"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
      </main>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {searchTarget !== "" && citySearchResults.length > 0 && (
            <h2 className="mx-6 my-5 title is-4 has-text-grey">Cities</h2>
          )}
          <AdminAvailableCities />
          {searchTarget !== "" && campsSearchResults.length > 0 && (
            <>
              <h2 className="mx-6 my-5 title is-4 has-text-grey">Camps</h2>
              <AdminAvailableCamps />
            </>
          )}
        </>
      )}
    </>
  );
}
