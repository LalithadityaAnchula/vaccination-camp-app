import { useContext } from "react";
import AlertContext from "../../context/alert/AlertContext";

export default function Alert() {
  const { alert } = useContext(AlertContext);
  return (
    <div
      className="fix-height-alert help is-danger has-text-centered my-2"
      style={{ visibility: alert ? "visible" : "visible" }}
    >
      {alert?.message}
    </div>
  );
}
