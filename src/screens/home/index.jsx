import { Player } from "@remotion/player";
import React, { useEffect, useRef } from "react";
import "./home.css";
import HomeVideo from "./HomeVideo";

function Home() {
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.mute();
      playerRef.current.play();
    }
  }, [playerRef]);

  return (
    <div id="homePlayerContainer">
      <Player
        ref={playerRef}
        component={HomeVideo}
        durationInFrames={1000}
        compositionWidth={window.innerWidth}
        compositionHeight={window.innerHeight}
        inFrame={Math.floor(Math.random() * 1000)}
        fps={30}
        spaceKeyToPlayOrPause={false}
        playbackRate={0.35}
        loop
      />
    </div>
  );
}

export default Home;
