import { Link } from "react-router-dom";
import FloatUp from "./FloatUp";
import ExpandOnHover from "./ExpandOnHover";
import { FcAbout, FcEditImage } from "react-icons/fc";
import { ImStatsDots } from "react-icons/im";
export default function CityCard({ city, role }) {
  return (
    <ExpandOnHover>
      <FloatUp>
        <div className="card">
          <div className="card-content">
            <div className="content">
              <p className="title is-4 has-text-link ">{city.name}</p>
              <p className="subtitle is-7 has-text-grey">
                {city.isMetroPolitan ? "Metropolitan" : "Non Metropolitan"}
              </p>
            </div>
          </div>
          {role === "admin" ? (
            <div className="card-footer">
              <Link
                to={`cities/${city._id}/camps`}
                className="card-footer-item button is-info is-light"
              >
                <FcAbout />
              </Link>
              <Link
                to={`cities/${city._id}`}
                className="card-footer-item button is-info is-light"
              >
                <FcEditImage />
              </Link>
              <Link
                to={`cities/${city._id}/stats`}
                className="card-footer-item button is-info is-light"
              >
                <ImStatsDots />
              </Link>
            </div>
          ) : (
            <div className="card-footer">
              <Link
                to={`/cities/${city._id}/camps`}
                className="card-footer-item button is-info is-light"
              >
                Camps
              </Link>
            </div>
          )}
        </div>
      </FloatUp>
    </ExpandOnHover>
  );
}
