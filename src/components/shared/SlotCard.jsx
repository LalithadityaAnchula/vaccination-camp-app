import { useContext } from "react";
import UserContext from "../../context/users/UserContext";
import { bookSlot, getUser } from "../../context/users/UserAction";
import { useParams } from "react-router-dom";
import FloatUp from "./FloatUp";
import ExpandOnHover from "./ExpandOnHover";
export default function SlotCard({ slot }) {
  const { isLoading, dispatch, user } = useContext(UserContext);
  const { campId, cityId } = useParams();

  const handleClick = async () => {
    dispatch({ type: "SET_LOADING" });
    const response = await bookSlot(cityId, campId, slot._id, user._id);
    if (response.success) {
      dispatch({ type: "UNSET_LOADING" });
      const userResponse = await getUser();
      dispatch({ type: "GET_USER", payload: userResponse.data });
    } else {
      dispatch({ type: "UNSET_LOADING" });
    }
  };

  return (
    <>
      <ExpandOnHover>
        <FloatUp>
          <div
            className={`card ${
              user?.activeSlot !== null &&
              user?.activeSlot?._id === slot._id &&
              "has-background-primary-light"
            }`}
          >
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
              {user?.activeSlot ? (
                <button
                  className={`card-footer-item button is-info is-light ${
                    isLoading && "is-loading"
                  }`}
                  disabled
                >
                  Book
                </button>
              ) : (
                <button
                  className={`card-footer-item button is-info is-light ${
                    isLoading && "is-loading"
                  }`}
                  onClick={handleClick}
                >
                  Book
                </button>
              )}
            </div>
          </div>
        </FloatUp>
      </ExpandOnHover>
    </>
  );
}
