import { useState, useEffect } from "react";

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const togglePlayback = () => setPlaying(!playing);

  useEffect(() => {
    if (playing) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [playing]);

  useEffect(() => {
    audio.pause();
    setPlaying(false);
    audio.src = url;
  }, [url]);

  const handleEnded = () => {
    setPlaying(false);
    audio.pause();
  };

  useEffect(() => {
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    return () => {
      handleEnded();
    };
  }, []);

  return [playing, togglePlayback];
};

export default useAudio;
