const Song = ({ currentSong, isPlaying }) => {
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
    </div>
  );
};

export default Song;

//currentsong is passed down from app.js, main body references key/value pairs within song object
