import { Player } from "@remotion/player";
import React, { useEffect, useRef, useState } from "react";
import Mainvideo from "./components1/mainvideo";
import "./app.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faPlay, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import Controls from "./components1/controlplayer";

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
    { ispaused &&<div className="background"> 
    <h1 class="tittle">TITULO VIDEO</h1>
    <div class="linetittle"> </div>
    <div class="description">
    <h4> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into  </h4>
    </div>
    <div class="controls">
    <FontAwesomeIcon icon={faPlay} />
    <FontAwesomeIcon icon={faVolumeUp} />
    <div class="time"> </div>
    <FontAwesomeIcon icon={faExpand} />
    </div>
    </div>}
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