import {
  faExpand,
  faPlay,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Player } from "@remotion/player";
import React, { useContext, useEffect, useRef, useState } from "react";
import Mainvideo from "./mainvideo";
import "./mainPlayer.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import VideosData from "../../data/videos.json";
import { getVideoMetadata } from "@remotion/media-utils";

const MainPlayer = () => {
  const [ispaused, setispaused] = useState(false);
  const playerRef = useRef(null);
  const { state } = useContext(Context);
  const [videoList, setVideoList] = useState(VideosData);
  const [currentVideo, setCurrentVideo] = useState(undefined);
  const navigate = useNavigate();
  const [videoDuration, setVideoDuration] = useState(0);

  useEffect(() => {
    if (!state.nameNumber) navigate("/");
    setCurrentVideo(
      videoList.reduce(
        (rVideo, cVideo) =>
          Math.abs(rVideo.value - state.nameNumber) >
          Math.abs(cVideo.value - state.nameNumber)
            ? cVideo
            : rVideo,
        videoList[0]
      )
    );
  }, [state.nameNumber]);

  useEffect(() => {
    if (currentVideo) {
      getVideoMetadata(currentVideo.url).then(({ durationInSeconds }) => {
        setVideoDuration(Math.round(durationInSeconds * 30));
      });
      setVideoList((pVideoList) =>
        pVideoList.filter((video) => video.url !== currentVideo.url)
      );
    }
  }, [currentVideo]);

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
  }, [playerRef, videoDuration]);

  return (
    <div id="mainPlayerContainer">
      {ispaused && (
        <div className="background">
          <h1 className="tittle">{currentVideo.title.toUpperCase()}</h1>
          <div className="linetittle" />
          <div className="description">
            <h4>{currentVideo.description}</h4>
          </div>
          <div className="controls">
            <FontAwesomeIcon icon={faPlay} />
            <FontAwesomeIcon icon={faVolumeUp} />
            <div className="time"> </div>
            <FontAwesomeIcon icon={faExpand} />
          </div>
        </div>
      )}
      {currentVideo && videoDuration && (
        <Player
          ref={playerRef}
          component={Mainvideo}
          inputProps={{ currentVideo }}
          durationInFrames={videoDuration}
          compositionWidth={window.innerWidth}
          compositionHeight={window.innerHeight}
          fps={30}
          controls
          style={{
            maxWidth: "100vw",
            maxHeight: "100vh",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
          }}
        />
      )}
    </div>
  );
};

export default MainPlayer;
