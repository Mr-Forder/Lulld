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
        className={`${
          bgClass === "camper-portrait" || "camper-landscape"
            ? "camper-container"
            : ""
        }`}
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
