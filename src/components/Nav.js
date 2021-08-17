import React from "react";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic,
  faVolumeDown,
  faRandom,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

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
      <div className="nav-container">
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
        </div>
      </div>
    </nav>
  );
};

export default Nav;
