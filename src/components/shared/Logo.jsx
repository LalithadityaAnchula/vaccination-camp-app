import logo from "../../assets/images/logo.png";

export default function Logo() {
  return (
    <figure className="image is-128x128 level-item">
      <img
        style={{ width: "40px", height: "40px" }}
        className="level-item"
        src={logo}
        alt="logo"
      />
    </figure>
  );
}
