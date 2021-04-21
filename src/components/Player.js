import react, { useState } from "react"; //import react, useRef
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //import fontawesome
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons"; //import icons - just fa-play icon etc

const Player = ({
  audioRef,
  currentSong,
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
}) => {
  //useRef

  //event handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying); // use setIsPlaying as a func (built into react) to set it to the opposite of whatever it is
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  //STATE

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range"
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon classname="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon
          onClick={playSongHandler}
          classname="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          classname="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;

//pass down currentsong from app, like we did with song.js - set object.audio as audio source
//play button onclick set to playsonghandler func -
//// set audio source as current song.audio from object - ref set to audioref
//set play button to use PLAY METHOD (built in) to play audioref.current (which is the url of the audio)
