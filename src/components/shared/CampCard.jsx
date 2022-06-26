import { Link } from "react-router-dom";
import FloatUp from "./FloatUp";
import ExpandOnHover from "./ExpandOnHover";

export default function CampCard({ camp }) {
  return (
    <ExpandOnHover>
      <FloatUp>
        <div className="card">
          <div className="card-content">
            <div className="content">
              <p className="title is-4 has-text-link ">{camp.name}</p>
              <p className="subtitle is-7 has-text-grey">{camp.address}</p>
            </div>
          </div>
          <div className="card-footer">
            {camp.city._id === undefined ? (
              <>
                <Link
                  to={`${camp._id}/${camp.name}/slots`}
                  className="card-footer-item button is-info is-light"
                >
                  slots
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={`cities/${camp.city._id}/${camp.city.name}/camps/${camp._id}/${camp.name}/slots`}
                  className="card-footer-item button is-info is-light"
                >
                  slots
                </Link>
              </>
            )}
          </div>
        </div>
      </FloatUp>
    </ExpandOnHover>
  );
}
