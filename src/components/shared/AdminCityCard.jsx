import { Link } from "react-router-dom";
import FloatUp from "./FloatUp";
import ExpandOnHover from "./ExpandOnHover";
import { FcAbout, FcEditImage } from "react-icons/fc";
import { ImStatsDots } from "react-icons/im";
export default function AdminCityCard({ city }) {
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
          <div className="card-footer">
            <Link
              to={`cities/${city._id}/${city.name}/camps`}
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
              to={`cities/${city.name}/stats`}
              className="card-footer-item button is-info is-light"
            >
              <ImStatsDots />
            </Link>
          </div>
        </div>
      </FloatUp>
    </ExpandOnHover>
  );
}
