import { motion } from "framer-motion";
import Lottie from "lottie-react";
const AniBg = ({ bgRender, bgClass, playSongHandler }) => {
  return (
    <motion.div
      className="anim-bg"
      animate={{ opacity: 1, transition: { duration: 1 } }}
      initial={{ opacity: 0 }}
    >
      <div
        className={(() => {
          switch (bgClass) {
            case "camper-portrait" || "camper-landscape":
              return "camper-container";
            case "city-portrait" || "city-landscape":
              return "city-container";
            case "road-portrait" || "road-landscape":
              return "road-container";

            default:
              return "";
          }
        })()}
      >
        <Lottie
          className={bgClass}
          animationData={bgRender}
          onClick={playSongHandler}
        />
      </div>
    </motion.div>
  );
};

export default AniBg;
