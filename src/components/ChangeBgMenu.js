import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import camperThumbBig from "../img/camper-thumb-big.jpg";
import roadThumbBig from "../img/road-thumb-big.jpg";
import cityThumbBig from "../img/city-thumb-big.jpg";
import lighthouseThumbBig from "../img/lighthouse-thumb-big.jpg";
import planeThumbBig from "../img/plane-thumb-big.jpg";

const ChangeBgMenu = ({
  setBgRender,
  camperVanLandscape,
  planeLandscape,
  lighthouseLandscape,
  cityLandscape,
  roadLandscape,
}) => {
  const [bgChangeMenu, setBgChangeMenu] = useState(false);

  const bgMenuAni = {
    hidden: { opacity: 0, y: -50 },
    show: {
      opacity: 1,
      y: -0,
      transition: { duration: 0.1, ease: "easeOut", staggerChildren: 0.1 },
    },
  };
  return (
    <>
      <motion.div
        transition={{ layout: { type: "spring" } }}
        layout
        className="choose-bg"
        onClick={() => {
          setBgChangeMenu(!bgChangeMenu);
        }}
      >
        Choose BG!
      </motion.div>
      <AnimatePresence>
        {bgChangeMenu && (
          <motion.div
            variants={bgMenuAni}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -50 }}
            className="thumbs-big"
            key="bg-change-menu "
          >
            <motion.div variants={bgMenuAni} className="thumb-big">
              <img
                src={camperThumbBig}
                onClick={() => {
                  setBgRender(camperVanLandscape);
                  setBgChangeMenu(!bgChangeMenu);
                }}
              ></img>
            </motion.div>
            <motion.div variants={bgMenuAni} className="thumb-big">
              <img
                src={planeThumbBig}
                onClick={() => {
                  setBgRender(planeLandscape);
                  setBgChangeMenu(!bgChangeMenu);
                }}
              ></img>
            </motion.div>
            <motion.div variants={bgMenuAni} className="thumb-big">
              <img
                src={lighthouseThumbBig}
                onClick={() => {
                  setBgRender(lighthouseLandscape);
                  setBgChangeMenu(!bgChangeMenu);
                }}
              ></img>
            </motion.div>
            <motion.div variants={bgMenuAni} className="thumb-big">
              <img
                src={cityThumbBig}
                onClick={() => {
                  setBgRender(cityLandscape);
                  setBgChangeMenu(!bgChangeMenu);
                }}
              ></img>
            </motion.div>
            <motion.div variants={bgMenuAni} className="thumb-big">
              <img
                src={roadThumbBig}
                onClick={() => {
                  setBgRender(roadLandscape);
                  setBgChangeMenu(!bgChangeMenu);
                }}
              ></img>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChangeBgMenu;
