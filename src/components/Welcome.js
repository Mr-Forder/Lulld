import { React, useState } from "react";

const Welcome = (audioRef, isPlaying, setIsPlaying) => {
  const [showWelcome, setShowWelcome] = useState(true);

  const welcomeHandler = () => {
    setShowWelcome(!showWelcome);
  };

  return (
    <div>
      <div className="welcome-container" onClick={welcomeHandler}></div>
    </div>
  );
};

export default Welcome;
