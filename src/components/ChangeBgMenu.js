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
  planePortrait,
  lighthousePortrait,
  roadPortrait,
  setBgClass,
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
                  if (window.innerHeight > window.innerWidth) {
                    //portrait
                    setBgRender(camperVanLandscape);
                    setBgClass("camper-portrait");
                    setBgChangeMenu(!bgChangeMenu);
                  } else {
                    //landscape
                    setBgRender(camperVanLandscape);
                    setBgClass("camper-landscape");
                    setBgChangeMenu(!bgChangeMenu);
                  }
                }}
              ></img>
            </motion.div>
            <motion.div variants={bgMenuAni} className="thumb-big">
              <img
                src={planeThumbBig}
                onClick={() => {
                  if (window.innerHeight > window.innerWidth) {
                    //portrait
                    setBgRender(planePortrait);
                    setBgChangeMenu(!bgChangeMenu);
                    setBgClass("plane-portrait");
                  } else {
                    //landscape
                    setBgRender(planeLandscape);
                    setBgClass("plane-landscape");
                    setBgChangeMenu(!bgChangeMenu);
                  }
                }}
              ></img>
            </motion.div>

            <motion.div variants={bgMenuAni} className="thumb-big">
              <img
                src={lighthouseThumbBig}
                onClick={() => {
                  if (window.innerHeight > window.innerWidth) {
                    //portrait
                    setBgRender(lighthousePortrait);
                    setBgChangeMenu(!bgChangeMenu);
                    setBgClass("lighthouse-portrait");
                  } else {
                    //landscape
                    setBgRender(lighthouseLandscape);
                    setBgClass("lighthouse-landscape");
                    setBgChangeMenu(!bgChangeMenu);
                  }
                }}
              ></img>
            </motion.div>

            <motion.div variants={bgMenuAni} className="thumb-big">
              <img
                src={cityThumbBig}
                onClick={() => {
                  if (window.innerHeight > window.innerWidth) {
                    //portrait
                    setBgRender(cityLandscape);
                    setBgChangeMenu(!bgChangeMenu);
                    setBgClass("city-portrait");
                  } else {
                    //landscape
                    setBgRender(cityLandscape);
                    setBgClass("city-landscape");
                    setBgChangeMenu(!bgChangeMenu);
                  }
                }}
              ></img>
            </motion.div>

            <motion.div variants={bgMenuAni} className="thumb-big">
              <img
                src={roadThumbBig}
                onClick={() => {
                  if (window.innerHeight > window.innerWidth) {
                    //portrait
                    setBgRender(roadPortrait);
                    setBgChangeMenu(!bgChangeMenu);
                    setBgClass("road-portrait");
                  } else {
                    //landscape
                    setBgRender(roadLandscape);
                    setBgClass("road-landscape");
                    setBgChangeMenu(!bgChangeMenu);
                  }
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
