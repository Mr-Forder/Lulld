import React from "react";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faMusic,
  faVolumeDown,
  faRandom,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
//framer
import { motion } from "framer-motion";

const Nav = ({
  setLibraryStatus,
  libraryStatus,
  audioRef,
  songInfo,
  setSongInfo,
  random,
  setRandom,
  songs,
}) => {
  let last = songs.length; //total number of tracks
  let randoTrack = Math.floor(Math.random() * last); //generate random number within bounds of songs array

  const [activeVolume, setActiveVolume] = useState(false);
  const changeVolume = (e) => {
    let value = e.target.value;
    audioRef.current.volume = value;
    setSongInfo({ ...songInfo, volume: value });
  };
  return (
    <nav>
      <motion.div
        className="nav-container"
        animate={{ opacity: 1, transition: { duration: 2 } }}
        initial={{ opacity: 0 }}
      >
        <div>
          <button onClick={() => setLibraryStatus(!libraryStatus)}>
            <FontAwesomeIcon icon={libraryStatus ? faTimes : faBars} />
          </button>
        </div>
        <div>
          <div className="button">
            <FontAwesomeIcon
              className="button"
              style={random ? { opacity: 1 } : { opacity: 0.3 }}
              onClick={() => setRandom(!random)} //toggle shuffle
              className="random"
              size="1x"
              icon={faRandom}
            />
          </div>
          <div className="button">
            <a href="https://twitter.com/lu11d">
              <FontAwesomeIcon
                className="button"
                className="random"
                size="1x"
                icon={faTwitter}
              />
            </a>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Nav;
