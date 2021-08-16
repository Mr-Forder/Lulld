const Song = ({ currentSong, isPlaying, audioRef, songInfo, setSongInfo }) => {
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`, //interpolate animation percentege value into css translate so will animate on the fly
    //We then set the style of our animate-style div to interpolated value of this variable (on line)
  };

  return (
    <div className="song-container">
      <div className="song-img">
        <img
          className={isPlaying ? "rotateSong" : ""}
          alt={currentSong.name}
          src={currentSong.cover}
        ></img>
      </div>
      <div className="song-info">
        <h4>Now Playing:</h4>
        <h2>{currentSong.name}</h2>
        <h3>{currentSong.artist}</h3>
      </div>
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>

        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
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
    </div>
  );
};

export default Song;

//currentsong is passed down from app.js, main body references key/value pairs within song object
