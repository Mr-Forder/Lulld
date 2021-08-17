import { useRef, useState, useEffect } from "react";
//add components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
//import our track data
import data from "./data";
import Nav from "./components/Nav";
import Welcome from "./components/Welcome";
//styles
import "./styles/app.scss";
//Animated bg
import { useLottie } from "lottie-react";
import Lottie from "lottie-react";
import lighthouseLandscape from "./img/lighthouse-landscape.json";
import lighthousePortrait from "./img/lighthouse-portrait.json";

function App() {
  //CONDITIONAL BG
  const [bgRender, setBgRender] = useState(lighthouseLandscape);

  window.addEventListener("resize", function () {
    if (window.innerHeight > window.innerWidth) {
      setBgRender(lighthousePortrait);
    } else {
      setBgRender(lighthouseLandscape);
    }
  });

  const audioRef = useRef(null); //const, give it whatever name you like, set it to useRef react func (imported above)
  //state
  const [songs, setSongs] = useState(data()); //pulls data from our util.js file - const songs = an array of objects (songs) from util.js
  const [currentSong, setCurrentSong] = useState(songs[0]); //grabs the first song from out const songs array

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying); // use setIsPlaying as a func (built into react) to set it to the opposite of whatever it is
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
  const [isPlaying, setIsPlaying] = useState(false); //set isplaying as state, set to false cos it shouldnt be playing automatically

  //SHUFFLE MODE
  let last = songs.length; //total number of tracks
  let randoTrack = Math.floor(Math.random() * last); //generate random number within bounds of songs array
  const [random, setRandom] = useState(false); //shuffle button state - either true or false, set by toggling "random" button

  const songEndHandler = async () => {
    //just copied my skip forward functionality so it'll run onEnded
    let currentIndex = songs.findIndex((s) => s.id === currentSong.id); //create currentIndex, set equal to index of array item (song) with id equal to that of current song

    if (!random) await setCurrentSong(songs[(currentIndex + 1) % songs.length]); //set currentsong to current index + 1, with modulus to prevent crash if goes past array length
    if (isPlaying) audioRef.current.play(); //if song isplaying when this happens, play the song we've just skipped to
    if (random) await setCurrentSong(songs[randoTrack]); //if shuffle active, set current song to rando track
    if (isPlaying) audioRef.current.play(); //if song isplaying when this happens, play the song we've just skipped to
  };

  const options = {
    animationData: lighthouseLandscape,
    loop: true,
  };

  const { View } = useLottie(options);

  const [showWelcome, setShowWelcome] = useState(true);

  const welcomeHandler = () => {
    setShowWelcome(!showWelcome);
    console.log(showWelcome);
    audioRef.current.play();
    setIsPlaying(true);
  };

  return (
    //interpolated classname - classname is App - check if library state is active, if so,  add "library-active" class to it, otherwise, do nothing.
    //library-active class jsut adds 30% left margin, squishing main window down when activated. added transition effect in .App css to animate it.
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <div className="anim-bg">
        <Lottie animationData={bgRender} onClick={playSongHandler} />
      </div>

      <div
        className="welcome-container"
        onClick={welcomeHandler}
        style={showWelcome ? { opacity: 1 } : { display: "none" }}
      >
        Welcome! Click here to begin.
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
      <Song
        currentSong={currentSong}
        isPlaying={isPlaying}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        audioRef={audioRef}
      />
      <Player
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongs={setSongs}
        last={last}
        randoTrack={randoTrack}
        random={random}
        setRandom={setRandom}
        playSongHandler={playSongHandler}
      />
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
  );
}

export default App;

//so - const songs is linked to an array of songs, each one an object.
//current song pulls a song from the array - currentsong is then passed down to song.js
