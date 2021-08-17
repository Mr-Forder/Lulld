import { React, useState } from "react";

const Welcome = (audioRef, isPlaying, setIsPlaying) => {
  const [showWelcome, setShowWelcome] = useState(true);

  const welcomeHandler = () => {
    console.log(`hai`);
    setShowWelcome(!showWelcome);
    console.log(showWelcome);
  };

  return (
    <div>
      <div className="welcome-container" onClick={welcomeHandler}>
        Welcome! Click here.
      </div>
    </div>
  );
};

export default Welcome;
