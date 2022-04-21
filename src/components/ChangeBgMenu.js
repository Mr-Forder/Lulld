import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import camperThumbBig from "../img/camper-thumb-big.jpg";
import roadThumbBig from "../img/road-thumb-big.jpg";
import cityThumbBig from "../img/city-thumb-big.jpg";
import lighthouseThumbBig from "../img/lighthouse-thumb-big.jpg";
import planeThumbBig from "../img/plane-thumb-big.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../components/Loading";
import {
  faBars,
  faTimes,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const ChangeBgMenu = ({
  setBgRender,
  camperVanLandscape,
  planeLandscape,
  lighthouseLandscape,
  cityLandscape,
  bgChangeMenu,
  setBgChangeMenu,
  roadLandscape,
  planePortrait,
  lighthousePortrait,
  roadPortrait,
  setBgClass,
}) => {
  const bgMenuAni = {
    hidden: { opacity: 0, y: -50 },
    show: {
      opacity: 1,
      y: -0,
      transition: { duration: 0.1, ease: "easeOut", staggerChildren: 0.1 },
    },
  };

  const [bgLoading, setBgLoading] = useState(false);
  return (
    <>
      {bgLoading && (
        <motion.div className="bg-loader">
          <Loading />
        </motion.div>
      )}

      <>
        <motion.div
          layout
          className="choose-bg"
          onClick={() => {
            setBgChangeMenu(!bgChangeMenu);
          }}
        >
          <FontAwesomeIcon
            icon={bgChangeMenu ? faTimes : faChevronDown}
            color="#ed118a"
          />
        </motion.div>

        <AnimatePresence>
          {bgChangeMenu && (
            <motion.div
              variants={bgMenuAni}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -25 }}
              className="thumbs-big"
              key="bg-change-menu "
            >
              <motion.div variants={bgMenuAni} className="thumb-big">
                <img
                  src={camperThumbBig}
                  onClick={() => {
                    if (window.innerHeight > window.innerWidth) {
                      //portrait
                      setBgLoading(true);
                      setTimeout(function () {
                        setBgLoading(false);
                      }, 2000);
                      setBgRender(camperVanLandscape);
                      setBgClass("camper-portrait");
                      setBgChangeMenu(!bgChangeMenu);
                    } else {
                      //landscape
                      setBgLoading(true);
                      setTimeout(function () {
                        setBgLoading(false);
                      }, 2000);
                      setBgRender(camperVanLandscape);
                      setBgClass("camper-landscape");
                      setBgChangeMenu(!bgChangeMenu);
                    }
                  }}
                ></img>
              </motion.div>

              {/* <motion.div variants={bgMenuAni} className="thumb-big">
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
            </motion.div> */}

              <motion.div variants={bgMenuAni} className="thumb-big">
                <img
                  src={cityThumbBig}
                  onClick={() => {
                    if (window.innerHeight > window.innerWidth) {
                      //portrait
                      setBgLoading(true);
                      setTimeout(function () {
                        setBgLoading(false);
                      }, 2000);
                      setBgRender(cityLandscape);
                      setBgClass("city-portrait");
                      setBgChangeMenu(!bgChangeMenu);
                    } else {
                      //landscape
                      setBgLoading(true);
                      setTimeout(function () {
                        setBgLoading(false);
                      }, 2000);
                      setBgRender(cityLandscape);
                      setBgClass("");
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
                      setBgLoading(true);
                      setTimeout(function () {
                        setBgLoading(false);
                      }, 2000);
                      setBgRender(lighthousePortrait);
                      setBgChangeMenu(!bgChangeMenu);
                      setBgClass("lighthouse-portrait");
                    } else {
                      //landscape
                      setBgLoading(true);
                      setTimeout(function () {
                        setBgLoading(false);
                      }, 2000);
                      setBgRender(lighthouseLandscape);
                      setBgClass("lighthouse-landscape");
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
                      setBgLoading(true);
                      setTimeout(function () {
                        setBgLoading(false);
                      }, 2000);
                      setBgRender(roadPortrait);
                      setBgChangeMenu(!bgChangeMenu);
                      setBgClass("road-portrait");
                    } else {
                      //landscape
                      setBgLoading(true);
                      setTimeout(function () {
                        setBgLoading(false);
                      }, 2000);
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
    </>
  );
};

export default ChangeBgMenu;
