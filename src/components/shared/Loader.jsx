import { ThreeDots } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="my-2 is-flex is-justify-content-center">
      <ThreeDots
        ariaLabel="loading-indicator"
        height={60}
        width={70}
        strokeWidth={5}
        strokeWidthSecondary={1}
        color="green"
        secondaryColor="white"
      />
    </div>
  );
}
