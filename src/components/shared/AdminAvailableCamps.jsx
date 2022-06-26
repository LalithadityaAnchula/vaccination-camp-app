import AdminCampCard from "./AdminCampCard";
import { useContext } from "react";
import UserContext from "../../context/users/UserContext";

export default function Camps() {
  const { camps } = useContext(UserContext);
  return (
    <>
      <div className="mx-6 my-4">
        <div className="columns is-multiline">
          {camps.map((camp) => {
            return (
              <div key={camp._id} className="column is-one-quarter">
                <AdminCampCard camp={camp} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
