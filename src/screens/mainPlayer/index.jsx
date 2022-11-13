import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Player } from "@remotion/player";
import React, { useContext, useEffect, useRef, useState } from "react";
import Mainvideo from "./mainvideo";
import "./mainPlayer.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import VideosData from "../../data/videos.json";
import { getVideoMetadata } from "@remotion/media-utils";
import QuestionList from "../../data/questions";
import { preloadVideo } from "@remotion/preload";

const MainPlayer = () => {
  const [ispaused, setispaused] = useState(false);
  const playerRef = useRef(null);
  const { state, setState } = useContext(Context);
  const [videoList, setVideoList] = useState(VideosData);
  const [currentVideo, setCurrentVideo] = useState(undefined);
  const [nextVideo, setNextVideo] = useState(undefined);
  const navigate = useNavigate();
  const [videoDuration, setVideoDuration] = useState(0);
  const [nextVideoDuration, setNextVideoDuration] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const currentQuestion = QuestionList.find(
    (question) => question.position === currentPosition
  );
  const [isLastVideoFinished, setIsLastVideoFinished] = useState(false);

  useEffect(() => {
    if (!state.nameNumber) navigate("/");
    setNextVideo(
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
    if (currentVideo && currentVideo.url === nextVideo.url) {
      setNextVideo(undefined);
      setNextVideoDuration(undefined);
    }
  }, [currentVideo]);

  useEffect(() => {
    if (nextVideo) {
      preloadVideo(nextVideo.url);
      getVideoMetadata(nextVideo.url).then(({ durationInSeconds }) => {
        const duration = Math.round(durationInSeconds * 30);
        if (!currentVideo) {
          setCurrentVideo(nextVideo);
          setVideoDuration(duration);
        } else {
          setNextVideoDuration(duration);
        }
      });
      setVideoList((pVideoList) =>
        pVideoList.filter((video) => video.url !== nextVideo.url)
      );
    }
  }, [nextVideo]);

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
    const frameUpdateListener = (event) => {
      if (videoDuration - event.detail.frame <= 220 && !nextVideo)
        setShowQuestion(true);
      if (videoDuration - 1 <= event.detail.frame) {
        if (nextVideo) {
          setCurrentVideo(nextVideo);
          setVideoDuration(nextVideoDuration);
        } else if (isLastVideoFinished) {
          navigate("/");
        } else {
          setIsLastVideoFinished(true);
          setVideoDuration(1000);
        }
      }
    };
    current.addEventListener("play", playlistener);
    current.addEventListener("pause", pauselistener);
    current.addEventListener("frameupdate", frameUpdateListener);
    current.play();
    return () => {
      current.removeEventListener("play", playlistener);
      current.removeEventListener("pause", pauselistener);
      current.removeEventListener("frameupdate", frameUpdateListener);
    };
  }, [playerRef, videoDuration, nextVideo, nextVideoDuration]);

  useEffect(() => {
    ispaused && playerRef.current.exitFullscreen();
  }, [ispaused]);

  return (
    <div id="mainPlayerContainer">
      {ispaused && (
        <div className="background">
          <h1 className="tittle">{currentVideo.title.toUpperCase()}</h1>
          <div className="linetittle" />
          <div className="description">
            <p>{currentVideo.description}</p>
          </div>
          <div className="controls">
            <button
              onClick={() => playerRef.current.play()}
              id="pausePlayButton"
            >
              <FontAwesomeIcon icon={faPlay} />
            </button>
          </div>
        </div>
      )}
      {showQuestion && currentQuestion && (
        <div id="questionContainer">
          <p id="questionTitle">Tiempo de elegir</p>
          <div>
            <button
              className="questionChoice"
              onClick={() => {
                setState((pState) => ({
                  nameNumber:
                    pState.nameNumber + currentQuestion.choices.left.value,
                }));
                setCurrentPosition((pPosition) => pPosition + 1);
                setShowQuestion(false);
              }}
            >
              <FontAwesomeIcon
                icon={currentQuestion.choices.left.icon}
                style={currentQuestion.choices.left.style}
              />
            </button>
            <button
              className="questionChoice"
              onClick={() => {
                setState((pState) => ({
                  nameNumber:
                    pState.nameNumber + currentQuestion.choices.right.value,
                }));
                setCurrentPosition((pPosition) => pPosition + 1);
                setShowQuestion(false);
              }}
            >
              <FontAwesomeIcon
                icon={currentQuestion.choices.right.icon}
                style={currentQuestion.choices.right.style}
              />
            </button>
          </div>
        </div>
      )}
      {currentVideo && videoDuration && (
        <Player
          ref={playerRef}
          component={Mainvideo}
          inputProps={{ currentVideo, isLastVideoFinished }}
          durationInFrames={videoDuration}
          compositionWidth={window.innerWidth}
          compositionHeight={window.innerHeight}
          fps={30}
          controls={!ispaused}
          spaceKeyToPlayOrPause
          style={{
            maxWidth: "100vw",
            maxHeight: "100vh",
          }}
        />
      )}
    </div>
  );
};

export default MainPlayer;
