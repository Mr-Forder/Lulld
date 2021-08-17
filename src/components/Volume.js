import React from "react";

const Volume = () => {
  return (
    <div>
      <FontAwesomeIcon
        onClick={() => setActiveVolume(!activeVolume)}
        icon={faVolumeDown}
      />
      <div className="button">
        {activeVolume && (
          <input
            className="button"
            onChange={changeVolume}
            max="1"
            min="0"
            step="0.01"
            type="range"
            value={audioRef.current.volume}
          />
        )}
      </div>
    </div>
  );
};

export default Volume;
