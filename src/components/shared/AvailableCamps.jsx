import CampCard from "./CampCard";
import { useContext } from "react";
import UserContext from "../../context/users/UserContext";
export default function AvailableCamps({ role }) {
  const { camps } = useContext(UserContext);

  return (
    <div className="columns is-multiline">
      {camps.length !== 0 &&
        camps.map((camp) => {
          return (
            <div key={camp._id} className="column is-one-quarter">
              <CampCard camp={camp} role={role} />
            </div>
          );
        })}
    </div>
  );
}
