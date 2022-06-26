import CityCard from "./AdminCityCard";
import UserContext from "../../context/users/UserContext";
import { useContext } from "react";
export default function AdminAvailableCities() {
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
