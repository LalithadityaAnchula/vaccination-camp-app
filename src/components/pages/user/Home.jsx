//React Hooks
import { useState, useContext, useEffect, useRef } from "react";

//contexts
import UserContext from "../../../context/users/UserContext";
import AlertContext from "../../../context/alert/AlertContext";

//Actions
import { getAll } from "../../../context/users/UserAction";

//Components
import AvailableCities from "../../shared/AvailableCities";
import AvailableCamps from "../../shared/AvailableCamps";

//React icons
import { FiSearch } from "react-icons/fi";
import Loader from "../../shared/Loader";
import Alert from "../../shared/Alert";

export default function Home() {
  const { isLoading, dispatch } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);
  const [searchTarget, setSearchTarget] = useState("");
  const prevSearchTarget = useRef("");
  const [citySearchResults, setCitySearchResults] = useState([]);
  const [campsSearchResults, setCampSearchResults] = useState([]);
  const [isSearchResulstNone, setIsSearchResultsNone] = useState(false);
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

  return (
    <>
      <main className="section">
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
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {searchTarget !== "" && citySearchResults.length > 0 && (
              <h2 className="mx-4 my-5 title is-4 has-text-grey">Cities</h2>
            )}
            <AvailableCities role="user" />
            {searchTarget !== "" && campsSearchResults.length > 0 && (
              <>
                <h2 className="mx-4 my-5 title is-4 has-text-grey">Camps</h2>
                <AvailableCamps role="user" />
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}
