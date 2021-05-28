import react, { useEffect } from "react"; //import react, useRef
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //import fontawesome
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons"; //import icons - just fa-play icon etc
import { playAudio } from "../util";
const Player = ({
  audioRef,
  currentSong,
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
  songs,
  setCurrentSong,
  setSongs,
}) => {
  //useRef

  //event handlers

  //UseEffect
  useEffect(() => {});
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

  const skipTrackHandler = (direction) => {
    const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    const songsLength = songs.length;
    let index;
    if (direction === "skip-back") {
      const prevIndex = (currentIndex - 1) % songsLength;
      if (prevIndex === -1) {
        index = songs.length - 1;
      } else {
        index = (currentIndex - 1) % songsLength;
      }
    } else if ("skip-forward") {
      index = (currentIndex + 1) % songsLength;
      setCurrentSong();
    }
    playAudio(isPlaying, audioRef);
    const songObj = songs[index];
    setCurrentSong(songObj);

    const newSongs = songs.map((s) => {
      if (s.id === songObj.id) {
        return {
          ...s,
          active: true,
        };
      } else {
        return {
          ...s,
          active: false,
        };
      }
    });

    setSongs(newSongs);
  };
  //Styles
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`, //interpolate animation percentege value into css translate so will animate on the fly
    //We then set the style of our animate-style div to interpolated value of this variable (on line)
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>

        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{getTime(songInfo.duration || 0)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler(`skip-back`)}
          classname="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          classname="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler(`skip-forward`)}
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
