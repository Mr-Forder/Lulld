import react from 'react';

const Song = ({currentSong}) => {
    return(
<div className="song-container">
<img class="song-cover" alt={currentSong.name}src={currentSong.cover}></img>
<h2>{currentSong.name}</h2>
<h3>{currentSong.artist}</h3>

</div>
    );
};

export default Song;

//currentsong is passed down from app.js, main body references key/value pairs within song object