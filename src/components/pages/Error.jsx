import { TbError404 } from "react-icons/tb";

export default function Error() {
  return (
    <div className="is-flex is-align-items-center is-justify-content-center is-flex-direction-column">
      <TbError404 size="400" />
      <h1 className="title is-1">
        <strong>Page not found</strong>
      </h1>
    </div>
  );
}
