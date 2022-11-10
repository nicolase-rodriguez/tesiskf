import {
  faExpand,
  faPlay,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Player } from "@remotion/player";
import React, { useContext, useEffect, useRef, useState } from "react";
import Controls from "../../components1/controlplayer";
import { Context } from "../../App";
import Mainvideo from "../../components1/mainvideo";
import "./mainPlayer.css";

const MainPlayer = () => {
  const [ispaused, setispaused] = useState(false);
  const playerRef = useRef(null);
  const state = useContext(Context)
  console.log(state)
  
  useEffect(() => {
    const { current } = playerRef;
    if (!current) {
      return;
    }
    const playlistener = () => {
      setispaused(false);
    };
    const pauselistener = () => {
      setispaused(true);
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
      {ispaused && (
        <div className="background">
          <h1 class="tittle">TITULO VIDEO</h1>
          <div class="linetittle"> </div>
          <div class="description">
            <h4>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into{" "}
            </h4>
          </div>
         <Controls playerRef={playerRef} ispaused={ispaused}/>
        </div>
      )}
      <Player
        ref={playerRef}
        component={Mainvideo}
        durationInFrames={120}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={30}
        style={{ maxWidth: "100vw", maxHeight: "100vh" }}
      />
      <Controls playerRef={playerRef} ispaused={ispaused}/>
    </>
  );
};

export default MainPlayer;
