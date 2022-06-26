import SlotCard from "./SlotCard";
import { useContext } from "react";
import UserContext from "../../context/users/UserContext";
export default function AvailableSlots() {
  const { slots, user } = useContext(UserContext);
  return (
    <div className="mx-6 my-4">
      <div className="columns is-multiline">
        {slots
          .filter((slot) => slot._id !== user?.activeSlot?._id)
          .map((slot) => {
            return (
              <div key={slot._id} className="column is-one-quarter">
                <SlotCard slot={slot} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
