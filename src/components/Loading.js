import Lottie from "lottie-react";
import loaderAni from "../img/loader.json";
const Loading = () => {
  return (
    <div className="loading">
      <div className="aniloader">
        <Lottie animationData={loaderAni} />
      </div>
    </div>
  );
};

export default Loading;
