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
import { prefetch } from "remotion";
import Loading from "../../components/loading";

const MainPlayer = () => {
  const [ispaused, setispaused] = useState(false);
  const playerRef = useRef(null);
  const { state, setState } = useContext(Context);
  const [videoList, setVideoList] = useState(VideosData);
  const [currentVideo, setCurrentVideo] = useState(undefined);
  const navigate = useNavigate();
  const [videoDuration, setVideoDuration] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const currentQuestion = QuestionList.find(
    (question) => question.position === currentPosition
  );
  const [isLastVideoFinished, setIsLastVideoFinished] = useState(false);
  const [cromaColor, setCromaColor] = useState();
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    playerRef.current?.play();
  }, [currentVideo, videoDuration]);

  useEffect(() => {
    if (!state.nameNumber && state.nameNumber !== 0) navigate("/");
    if (currentVideo) {
      if (!currentVideo.greenScreen && cromaColor) setCromaColor(undefined);
    } else {
      answered && setAnswered(false);
      if (videoList.length) {
        let videoToLoad = videoList.reduce(
          (rVideo, cVideo) =>
            Math.abs(rVideo.value - state.nameNumber) >
            Math.abs(cVideo.value - state.nameNumber)
              ? cVideo
              : rVideo,
          videoList[0]
        );
        const { waitUntilDone } = prefetch(videoToLoad.url);
        getVideoMetadata(videoToLoad.url).then(({ durationInSeconds }) => {
          const duration = Math.round(durationInSeconds * 30) + 20;
          setVideoDuration(duration);
        });
        setVideoList((pVideoList) =>
          pVideoList.filter((video) => video.url !== videoToLoad.url)
        );
        waitUntilDone().then(() => setCurrentVideo(videoToLoad));
      } else {
        setIsLastVideoFinished(true);
        setVideoDuration(4000);
      }
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
    const frameUpdateListener = (event) => {
      if (
        videoDuration - event.detail.frame <= 250 &&
        videoList.length > 1 &&
        !showQuestion &&
        !answered
      ) {
        setShowQuestion(true);
      }
      if (videoDuration - 1 <= event.detail.frame) {
        if (isLastVideoFinished) {
          navigate("/");
        } else {
          setCurrentVideo(undefined);
        }
      } else if (
        videoDuration - 30 === event.detail.frame &&
        !answered &&
        !isLastVideoFinished &&
        videoList.length > 1
      ) {
        current.pause();
      }
    };
    current.addEventListener("play", playlistener);
    current.addEventListener("pause", pauselistener);
    current.addEventListener("frameupdate", frameUpdateListener);
    return () => {
      current.removeEventListener("play", playlistener);
      current.removeEventListener("pause", pauselistener);
      current.removeEventListener("frameupdate", frameUpdateListener);
    };
  }, [
    playerRef,
    videoDuration,
    videoList,
    showQuestion,
    answered,
    isLastVideoFinished,
    currentVideo,
  ]);

  useEffect(() => {
    (ispaused || showQuestion) && playerRef.current.exitFullscreen();
  }, [ispaused, showQuestion]);

  return (
    <div id="mainPlayerContainer">
      {ispaused && (
        <div className="background">
          <h1 className="tittle">{currentVideo?.title.toUpperCase()}</h1>
          <div className="linetittle" />
          <div className="description">
            <p>{currentVideo?.description}</p>
          </div>
          {!showQuestion && (
            <div className="controls">
              <button
                onClick={() => playerRef.current.play()}
                id="pausePlayButton"
              >
                <FontAwesomeIcon icon={faPlay} />
              </button>
            </div>
          )}
        </div>
      )}
      {showQuestion && currentQuestion && !answered && (
        <div id="questionContainer">
          <p id="questionTitle">Tiempo de elegir</p>
          <div>
            <button
              className="questionChoice"
              onClick={() => {
                setState((pState) => ({
                  nameNumber:
                    pState.nameNumber +
                    currentQuestion.choices.left.value +
                    currentVideo.value * 0.3,
                }));
                setCurrentPosition((pPosition) => pPosition + 1);
                setShowQuestion(false);
                setAnswered(true);
                playerRef.current?.play();
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
                    pState.nameNumber +
                    currentQuestion.choices.right.value +
                    currentVideo.value * 0.3,
                }));
                setCurrentPosition((pPosition) => pPosition + 1);
                setShowQuestion(false);
                setAnswered(true);
                playerRef.current?.play();
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
      {(currentVideo && videoDuration) || isLastVideoFinished ? (
        <>
          <Player
            ref={playerRef}
            component={Mainvideo}
            inputProps={{ currentVideo, isLastVideoFinished, cromaColor }}
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
          {currentVideo?.greenScreen && (
            <div className="colorSelectorContainer">
              {currentVideo.colors.map((color) => (
                <div
                  style={{
                    backgroundColor: color,
                    border: cromaColor === color ? "solid 3px #ADADAD" : "none",
                  }}
                  onClick={() => setCromaColor(color)}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default MainPlayer;
