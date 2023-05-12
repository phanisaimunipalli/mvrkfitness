import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const video = videoRef.current;

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  const handlePlayPause = () => {
    const video = videoRef.current;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div className="banner">
      <video
        ref={videoRef}
        src="/gymintro.mp4"
        muted
        loop
        onClick={handlePlayPause}
      />
      <div className="banner-content">
        <h1 className="lg:text-5xl uppercase md:text-4xl text-3xl font-extrabold text-white text-center">
        🏋️ Maverick Fitness 🏋️
        </h1>
        <h3 className="lg:text-5xl uppercase md:text-4xl text-3xl font-extrabold text-white text-center">
          Every step is progress, Start Today and never stop!
        </h3>
        <h4 className="lg:text-2xl uppercase md:text-4xl text-3xl font-extrabold text-white text-center">
          📍 San Jose, Santa Clara, SFO
        </h4>
      </div>
      {!isPlaying && (
        <div className="play-button" onClick={handlePlayPause}>
          <i className="fas fa-play"></i>
        </div>
      )}
    </div>
  );
};

export default Banner;
