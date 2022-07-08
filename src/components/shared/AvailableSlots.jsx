import SlotCard from "./SlotCard";
import AdminSlotCard from "./AdminSlotCard";
import { useContext } from "react";
import UserContext from "../../context/users/UserContext";

export default function AvailableSlots({ role }) {
  const { slots, user } = useContext(UserContext);
  return (
    <div className="columns is-multiline">
      {slots.length > 0 &&
        slots
          .filter((slot) => slot._id !== user?.activeSlot?._id)
          .map((slot) => {
            return (
              <div key={slot._id} className="column is-one-quarter">
                {role === "admin" ? (
                  <AdminSlotCard slot={slot} inProfile={false} />
                ) : (
                  <SlotCard slot={slot} />
                )}
              </div>
            );
          })}

      {slots.length === 0 && (
        <div className="column is-half  has-text-centered">
          <h1 className="title is-2 has-text-grey">
            No slots results found for you
          </h1>
        </div>
      )}
    </div>
  );
}
