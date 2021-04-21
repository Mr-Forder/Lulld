import react, {useRef, useState} from 'react';//import react, useRef 
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';//import fontawesome
import {faPlay, faAngleLeft, faAngleRight, faPause} from '@fortawesome/free-solid-svg-icons';//import icons - just fa-play icon etc

const Player = ({currentSong, isPlaying, setIsPlaying}) => {
//useRef
const audioRef = useRef(null)//const, give it whatever name you like, set it to useRef react func (imported above)
//event handlers
const playSongHandler = () => {
if (isPlaying){
audioRef.current.pause();
setIsPlaying(!isPlaying);// use setIsPlaying as a func (built into react) to set it to the opposite of whatever it is
}else{
    audioRef.current.play();
    setIsPlaying(!isPlaying)
}
};
const timeUpdateHandler =(e) =>{
const current = e.target.currentTime;
const duration = e.target.duration;
setSongInfo({...songInfo, currentTime: current, duration: duration})
};
const getTime = (time) => {
 return(
    Math.floor(time/60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
 )   
}
const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({...songInfo, currentTime:e.target.value})

};
//STATE
const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
});

    return(
<div className="player">
<div className="time-control">
<p>{getTime(songInfo.currentTime)}</p>
<input min={0} max={songInfo.duration} value={songInfo.currentTime} onChange={dragHandler} type="range"/>
<p>{getTime(songInfo.duration)}</p>
</div>
<div className="play-control">
   
    <FontAwesomeIcon classname="skip-back" size="2x" icon={faAngleLeft}/>
    <FontAwesomeIcon onClick={playSongHandler} classname="play" size="2x"icon={isPlaying ? faPause : faPlay}/>
    <FontAwesomeIcon classname="skip-forward" size="2x"icon={faAngleRight}/>
</div>
<audio onTimeUpdate={timeUpdateHandler}  ref ={audioRef} src={currentSong.audio} onLoadedMetadata={timeUpdateHandler}></audio>
</div>
    );
};

export default Player;


//pass down currentsong from app, like we did with song.js - set object.audio as audio source
//play button onclick set to playsonghandler func -
//// set audio source as current song.audio from object - ref set to audioref
//set play button to use PLAY METHOD (built in) to play audioref.current (which is the url of the audio)