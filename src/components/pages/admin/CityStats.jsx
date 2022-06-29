import UserContext from "../../../context/users/UserContext";
import { getStatsInCity } from "../../../context/users/AdminAction";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../shared/Loader";

export default function CityStats() {
  const { cityId } = useParams();
  const { isLoading, dispatch, stats } = useContext(UserContext);

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const fetchStats = async () => {
      const response = await getStatsInCity(cityId);
      if (response.success) {
        dispatch({ type: "SET_STATS", payload: response.data });
      } else dispatch({ type: "UNSET_LOADING" });
    };
    fetchStats();
  }, [dispatch, cityId]);

  if (isLoading) return <Loader />;

  const complete =
    (Math.floor(stats?.vaccinated) / Math.floor(stats?.population)) * 100;
  const partial =
    (Math.floor(stats?.partiallyVaccinated) / Math.floor(stats?.population)) *
    100;
  const nonVaccinated =
    (Math.floor(stats?.nonVaccinated) / Math.floor(stats?.population)) * 100;

  return (
    <>
      <section className="section">
        <div className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">First Dose</p>
              <p className="title">{stats?.partiallyVaccinated}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Second Dose</p>
              <p className="title">{stats?.vaccinated}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Population</p>
              <p className="title">{stats?.population}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Non Vaccinated</p>
              <p className="title">{stats?.nonVaccinated}</p>
            </div>
          </div>
        </div>
        <div className="section">
          <h2 className="subtitle is-6 has-text-grey">Partially Vaccinated</h2>
          <progress
            className="progress is-warning"
            value={partial.toString()}
            max="100"
          ></progress>
        </div>
        <div className="section">
          <h2 className="subtitle is-6 has-text-grey">Completely Vaccinated</h2>
          <progress
            style={{ transition: "all 0.5s ease-in-out" }}
            className="progress is-success"
            value={complete.toString()}
            max="100"
          ></progress>
        </div>
        <div className="section">
          <h2 className="subtitle is-6 has-text-grey">Completely Vaccinated</h2>
          <progress
            style={{ transition: "all 0.5s ease-in-out" }}
            className="progress is-danger"
            value={nonVaccinated.toString()}
            max="100"
          ></progress>
        </div>
      </section>
    </>
  );
}
