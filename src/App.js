import { useRef, useState, useEffect } from "react";
//add components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
//import our track data
import data from "./data";
import Nav from "./components/Nav";
import ChangeBgMenu from "./components/ChangeBgMenu";
//styles
import "./styles/app.scss";
//framer
import { motion } from "framer-motion";
import tape from "./img/drip.json";
//Animated bg

import Lottie from "lottie-react";
//LANDSCAPE BGS
import lighthouseLandscape from "./img/lighthouse-landscape.json";
import camperVanLandscape from "./img/camper.json";
import planeLandscape from "./img/plane-landscape.json";
import cityLandscape from "./img/city-landscape.json";
import roadLandscape from "./img/road-nocar.json";

//PORTRAIT BGS
import lighthousePortrait from "./img/lighthouse-portrait.json";
import planePortrait from "./img/plane-portrait.json";
import roadPortrait from "./img/road-portrait.json";

//device detection

//loading
import Loading from "./components/Loading";
import AniBg from "./components/AniBg";
//CREATE RANDOM PLAYLIST
function App() {
  //loading screen

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2200); //TODO: extend me to do a PROPA animated loader
  }, []);

  function getRandom(arr, n) {
    let result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      let x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }
  const [tooltip, setTooltip] = useState();
  const randomList = getRandom(data(), 30);

  const audioRef = useRef(null);
  //state
  const [songs, setSongs] = useState(randomList);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  //bg menu change
  const [bgChangeMenu, setBgChangeMenu] = useState(false);

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //calcuate percentage
    const roundedCurrent = Math.round(current); //rounds up current time to full number
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100); //divide rounded current by rounded duration to create percentage value

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animationPercentage: animation,
    });
  };
  const [isPlaying, setIsPlaying] = useState(false);

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

  //SHUFFLE MODE
  let last = songs.length;
  let randoTrack = Math.floor(Math.random() * last); //generate random number within bounds of songs array
  const [random, setRandom] = useState(false); //shuffle button state

  const songEndHandler = async () => {
    //just copied my skip forward functionality so it'll run onEnded
    let currentIndex = songs.findIndex((s) => s.id === currentSong.id); //create currentIndex, set equal to index of array item (song) with id equal to that of current song

    if (!random) await setCurrentSong(songs[(currentIndex + 1) % songs.length]); //set currentsong to current index + 1, with modulus to prevent crash if goes past array length
    if (isPlaying) audioRef.current.play(); //if song isplaying when this happens, play the song we've just skipped to
    if (random) await setCurrentSong(songs[randoTrack]); //if shuffle active, set current song to rando track
    if (isPlaying) audioRef.current.play(); //if song isplaying when this happens, play the song we've just skipped to
  };

  const [showWelcome, setShowWelcome] = useState(false);

  //CONDITIONAL BG

  const [bgRender, setBgRender] = useState(camperVanLandscape);
  const [bgClass, setBgClass] = useState("camper-landscape");

  useEffect(() => {
    if (window.innerHeight > window.innerWidth) {
      //portrait
      setBgClass("camper-portrait");
    } else {
      //landscape

      setBgClass("camper-landscape");
    }
  }, []);

  //set landscape or portrait on window resize
  window.addEventListener("resize", function () {
    if (window.innerHeight > window.innerWidth) {
      //     //     //portrait
      setBgRender(camperVanLandscape);
      setBgClass("camper-portrait");
    } else {
      //     //     //landscape
      setBgRender(camperVanLandscape);
      setBgClass("camper-landscape");
    }
  });
  //TICKERTAPE
  const welcomeHandler = () => {
    setShowWelcome(!showWelcome);
    setTickerTape(!setTickerTape);
  };

  const [tickerTape, setTickerTape] = useState(true);
  //begin tickertape

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerTape(!tickerTape);
    }, 30000);
    return () => clearInterval(interval);
  }, [tickerTape]);

  //Close tickertape
  useEffect(() => {
    if (tickerTape) {
      const interval = setInterval(() => {
        setTickerTape(!tickerTape);
      }, 24000);
      return () => clearInterval(interval);
    }
  }, []);
  //tooltip timings
  useEffect(() => {
    setTimeout(() => setTooltip(true), 7000);
  }, []);

  //display upcoming song
  const [nextSong, setNextSong] = useState(null);
  const [nextSongName, setNextSongName] = useState(null);
  useEffect(() => {
    const index = songs.findIndex(
      (element) => element.name === currentSong.name
    );
    setNextSong(index + 1);
    setNextSongName(songs[`${index + 1}` % songs.length]);
  }, [currentSong]);
  return (
    <>
      {!loading ? (
        // check if library state is active, if so,  add "library-active" class to it, otherwise, do nothing.
        //library-active class adds 30% left margin, squishing main window down when activated. added transition effect in .App css to animate it.
        <div className={`App ${libraryStatus ? "library-active" : ""}`}>
          <AniBg
            bgRender={bgRender}
            bgClass={bgClass}
            playSongHandler={playSongHandler}
          />

          <motion.div
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            initial={{ opacity: 0 }}
          >
            <div
              className={`${
                tickerTape ? "tickertape visible" : "tickertape hidden"
              }`}
              onClick={welcomeHandler}
            >
              <div className="ticker-img">
                <Lottie animationData={tape} />
              </div>
              <p className="marquee">
                {!random ? (
                  <span>
                    Welcome to Lulld - Non stop Lo-fi. A unique playlist every
                    time. Next up:{" "}
                    <strong className="pink">{nextSongName.name}</strong> by{" "}
                    <strong className="blue">{nextSongName.artist}</strong>...
                  </span>
                ) : (
                  <span>
                    Welcome to Lulld - Non stop Lo-fi. A unique playlist every
                    time. <strong className="pink">Shuffle</strong> playback is
                    currently active!
                  </span>
                )}
              </p>
            </div>
          </motion.div>

          <div
            className={`${showWelcome ? "welcome visible" : "welcome hidden"}`}
            onClick={welcomeHandler}
          >
            <div className="about-container">
              <div className="tape">
                <Lottie animationData={tape} />
              </div>
            </div>
          </div>
          <Nav
            libraryStatus={libraryStatus}
            setLibraryStatus={setLibraryStatus}
            audioRef={audioRef}
            songInfo={songInfo}
            setSongInfo={setSongInfo}
            random={random}
            setRandom={setRandom}
            songs={songs}
          />

          <motion.div
            animate={{ opacity: 1, transition: { duration: 1 } }}
            initial={{ opacity: 0 }}
            className="main-controls"
          >
            <Song
              currentSong={currentSong}
              isPlaying={isPlaying}
              setSongInfo={setSongInfo}
              songInfo={songInfo}
              audioRef={audioRef}
              playSongHandler={playSongHandler}
              songs={songs}
              setSongs={setSongs}
              random={random}
              setCurrentSong={setCurrentSong}
              randoTrack={randoTrack}
              skipTrackHandler={skipTrackHandler}
            />
            {tooltip && (
              <motion.div
                className="onboard-container"
                animate={{ opacity: 1, transition: { duration: 0.5 } }}
                initial={{ opacity: 0 }}
              >
                <div className="onboard-arrow"></div>
                <div className="onboard">
                  <p>Click or tap here to choose a background</p>
                </div>
              </motion.div>
            )}

            <ChangeBgMenu
              loading={loading}
              setLoading={setLoading}
              bgChangeMenu={bgChangeMenu}
              setBgChangeMenu={setBgChangeMenu}
              setBgClass={setBgClass}
              lighthousePortrait={lighthousePortrait}
              planePortrait={planePortrait}
              roadPortrait={roadPortrait}
              setBgRender={setBgRender}
              camperVanLandscape={camperVanLandscape}
              planeLandscape={planeLandscape}
              lighthouseLandscape={lighthouseLandscape}
              cityLandscape={cityLandscape}
              roadLandscape={roadLandscape}
              audioRef={audioRef}
            />
          </motion.div>

          <Library
            isPlaying={isPlaying}
            audioRef={audioRef}
            songs={songs}
            setCurrentSong={setCurrentSong}
            currentSong={currentSong}
            libraryStatus={libraryStatus}
          />
          <audio
            onTimeUpdate={timeUpdateHandler}
            ref={audioRef}
            src={currentSong.audio}
            onLoadedMetadata={timeUpdateHandler}
            onEnded={songEndHandler}
          ></audio>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;
