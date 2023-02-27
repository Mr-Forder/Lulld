import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
  faVolumeDown,
  faRandom,
} from "@fortawesome/free-solid-svg-icons";

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
  last,
  randoTrack,
  random,
  setRandom,
  playSongHandler,
}) => {
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    if (direction === "skip-forward" && !random) {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]); //fix crash once current index skips past last track -
      //utilise modulus operator to make sure that when index matches length of array, it goes back to begining of array
    }
    if (direction === "skip-forward" && random) {
      //set current song to random if shuffle active
      await setCurrentSong(songs[randoTrack]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        //same issue, when index hits -1, it'll error out, so do another if statement -
        await setCurrentSong(songs[songs.length - 1]); //so when index hits -1, instead of erroring out, we set currentSong to equal the last song in the array
        if (isPlaying) audioRef.current.play();
        return; // add return, otherwise previous statement will autorun, which will crash the app
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
    }
  };

  //Styles
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`, //interpolate animation percentege value into css translate so will animate on the fly
    //We then set the style of our animate-style div to interpolated value of this variable (on line)
  };

  return (
    <div className="player">
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler(`skip-back`)}
          className="skip-back"
          size="1x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClickCapture={playSongHandler}
          className="play"
          size="1x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler(`skip-forward`)}
          className="skip-forward"
          size="1x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
