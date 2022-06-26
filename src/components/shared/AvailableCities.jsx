import CityCard from "./CityCard";
import UserContext from "../../context/users/UserContext";
import { useContext } from "react";
export default function AvailabaleCities() {
  const { cities } = useContext(UserContext);
  return (
    <>
      <div className="mx-6 my-4">
        <div className="columns is-multiline">
          {cities.map((city) => {
            return (
              <div key={city._id} className="column is-one-quarter">
                <CityCard city={city} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
