import { useContext } from "react";
import UserContext from "../../context/users/UserContext";
import { bookSlot } from "../../context/users/UserAction";
import { useParams, Link } from "react-router-dom";
import FloatUp from "./FloatUp";
import ExpandOnHover from "./ExpandOnHover";

export default function AdminSlotCard({ slot }) {
  const { isLoading, dispatch, user } = useContext(UserContext);
  const { campId, cityId } = useParams();

  const handleClick = async () => {
    dispatch({ type: "SET_LOADING" });
    const response = await bookSlot(cityId, campId, slot._id, user._id);
    if (response.success) {
      alert("slot booked");
      dispatch({ type: "UNSET_LOADING" });
    } else {
      dispatch({ type: "UNSET_LOADING" });
    }
  };

  return (
    <>
      <ExpandOnHover>
        <FloatUp>
          <div className="card">
            <div className="card-content">
              <div className="content">
                <p className="title is-4 has-text-link ">
                  {new Date(slot.date).toLocaleDateString("el-GR")}
                </p>
                <div className="tags are-large">
                  <span className="tag">{slot.doseType}</span>
                  <span className="tag">{slot.slotType}</span>
                  <span className="tag">{slot.available}</span>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button
                className={`card-footer-item button is-info is-light ${
                  isLoading && "is-loading"
                }`}
                onClick={handleClick}
              >
                Book
              </button>
              <Link
                to={`${slot._id}/requests`}
                className="card-footer-item button is-primary is-light"
              >
                Details
              </Link>
            </div>
          </div>
        </FloatUp>
      </ExpandOnHover>
    </>
  );
}
