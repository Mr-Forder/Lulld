
import react, {useState} from "react";
//add components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
//import our track data
import data from "./util";
//add styles
import './styles/app.scss'

function App(){
  //state
  const [songs, setSongs] = useState(data());//pulls data from our util.js file - const songs = an array of objects (songs) from util.js
  const [currentSong, setCurrentSong] = useState(songs[0]);//grabs the first song from out const songs array
  const [isPlaying, setIsPlaying] = useState(false);//set isplaying as state, set to false cos it shouldnt be playing automatically

  return (
    <div className="App">
   <Song currentSong={currentSong}/>
   <Player isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong}/>
   <Library songs={songs} setCurrentSong={setCurrentSong}/>
    </div>
  );
}

export default App;


//so - const songs is linked to an array of songs, each one an object.
//current song pulls a song from the array - currentsong is then passed down to song.js