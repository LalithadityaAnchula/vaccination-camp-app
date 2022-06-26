import AdminSlotCard from "./AdminSlotCard";
import { useContext } from "react";
import UserContext from "../../context/users/UserContext";
export default function AvailableSlots() {
  const { slots } = useContext(UserContext);
  return (
    <div className="mx-6 my-4">
      <div className="columns is-multiline">
        {slots.length !== 0 &&
          slots.map((slot) => {
            return (
              <div key={slot._id} className="column is-one-quarter">
                <AdminSlotCard slot={slot} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
