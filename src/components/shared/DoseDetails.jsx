import { FaCloudDownloadAlt } from "react-icons/fa";

export default function DoseDetails({ doseDetails }) {
  const handleDownload = () => {
    let dosetype = doseDetails?.doseType;
    if (doseDetails?.doseType === 1) {
      dosetype = "firstDose";
    } else if (doseDetails?.doseType === 2) {
      dosetype = "secondDose";
    }
    window.open(
      process.env.REACT_APP_BASE_URL + `/downloads/certificate/${dosetype}`
    );
  };

  return (
    <div className="card">
      <div className="card-content">
        <div className="level is-mobile">
          <div className="level-left">
            <div className="level-item">
              <h1 className="title is-4 has-text-primary">
                {new Date(doseDetails?.date).toLocaleDateString("el-GR")}
              </h1>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <button
                className="button is-light is-small"
                onClick={handleDownload}
              >
                <FaCloudDownloadAlt />
              </button>
            </div>
          </div>
        </div>
        <div className="level is-mobile">
          <div className="level-left">
            <div className="level-item">
              <strong>City</strong>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">{doseDetails?.camp?.city?.name}</div>
          </div>
        </div>
        <div className="level is-mobile">
          <div className="level-left">
            <div className="level-item">
              <strong>Camp</strong>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">{doseDetails?.camp?.name}</div>
          </div>
        </div>
        <div className="level is-mobile">
          <div className="level-left">
            <div className="level-item">
              <strong>Session</strong>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">{doseDetails?.slotType}</div>
          </div>
        </div>
        <div className="block">{doseDetails?.camp?.address}</div>
      </div>
    </div>
  );
}
