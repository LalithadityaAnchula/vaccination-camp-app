import { Link } from "react-router-dom";
import FloatUp from "./FloatUp";
import ExpandOnHover from "./ExpandOnHover";

export default function AdminCampCard({ camp, role }) {
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
          {role === "admin" ? (
            <div className="card-footer">
              {camp.city._id === undefined ? (
                <>
                  <Link
                    to={`${camp._id}/slots`}
                    className="card-footer-item button is-info is-light"
                  >
                    slots
                  </Link>
                  <Link
                    to={`${camp._id}`}
                    className="card-footer-item button is-primary is-light"
                  >
                    camp
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={`cities/${camp.city._id}/camps/${camp._id}/slots`}
                    className="card-footer-item button is-info is-light"
                  >
                    slots
                  </Link>
                  <Link
                    to={`cities/${camp.city._id}/camps/${camp._id}`}
                    className="card-footer-item button is-primary is-light"
                  >
                    camp
                  </Link>
                </>
              )}
            </div>
          ) : (
            <div className="card-footer">
              {camp.city._id === undefined ? (
                <>
                  <Link
                    to={`${camp._id}/slots`}
                    className="card-footer-item button is-info is-light"
                  >
                    slots
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={`cities/${camp.city._id}/camps/${camp._id}/slots`}
                    className="card-footer-item button is-info is-light"
                  >
                    slots
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </FloatUp>
    </ExpandOnHover>
  );
}
