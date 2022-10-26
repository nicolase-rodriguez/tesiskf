import { Player } from "@remotion/player";
import React, { useEffect, useRef, useState } from "react";
import Mainvideo from "./components1/mainvideo";
import "./app.css"

 const App = () => {
  const [ ispaused, setispaused ] = useState(false)
  const playerRef = useRef(null);
 
useEffect(() => {
  const { current } = playerRef;
  if (!current) {
    return;
  }
  const playlistener = () => {
    setispaused(false)
  };
  const pauselistener = () => {
    setispaused(true)
  };
  current.addEventListener("play", playlistener);
  current.addEventListener("pause", pauselistener);
  return () => {
    current.removeEventListener("play", playlistener);
    current.removeEventListener("pause", pauselistener);
  };
}, []);
  return (
    <>
    { ispaused &&<div className="background"> </div>}
    <Player
      ref={playerRef}
      component={Mainvideo}
      durationInFrames={120}
      compositionWidth={1920}
      compositionHeight={1080}
      fps={30}
      controls
      style={{maxWidth:"100vw", maxHeight:"100vh"}}
    />
    </>
  );
};

export default App