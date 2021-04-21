import react, { useRef, useState } from "react";
//add components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
//import our track data
import data from "./util";
//add styles
import "./styles/app.scss";

function App() {
  const audioRef = useRef(null); //const, give it whatever name you like, set it to useRef react func (imported above)
  //state
  const [songs, setSongs] = useState(data()); //pulls data from our util.js file - const songs = an array of objects (songs) from util.js
  const [currentSong, setCurrentSong] = useState(songs[0]); //grabs the first song from out const songs array
  const [isPlaying, setIsPlaying] = useState(false); //set isplaying as state, set to false cos it shouldnt be playing automatically
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration: duration });
  };
  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
      />
      <Library
        isPlaying={isPlaying}
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        currentSong={currentSong}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onLoadedMetadata={timeUpdateHandler}
      ></audio>
    </div>
  );
}

export default App;

//so - const songs is linked to an array of songs, each one an object.
//current song pulls a song from the array - currentsong is then passed down to song.js
