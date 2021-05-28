export const playAudio = (isPlaying, audioRef) => {
  if (isPlaying) {
    const playPromise = audioRef.current.play();
    if (isPlaying !== undefined) {
      playPromise.then(() => {
        audioRef.current.play();
      });
    }
  }
};
