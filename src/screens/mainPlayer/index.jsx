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
import { resolveRedirect } from "@remotion/preload";
import { prefetch } from "remotion";
import Loading from "../../components/loading";

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
    if (!state.nameNumber && state.nameNumber !== 0) navigate("/");
    let videoToLoad = videoList.reduce(
      (rVideo, cVideo) =>
        Math.abs(rVideo.value - state.nameNumber) >
        Math.abs(cVideo.value - state.nameNumber)
          ? cVideo
          : rVideo,
      videoList[0]
    );

    resolveRedirect(videoToLoad.url)
      .then((resolved) => {
        videoToLoad.url = resolved;
      })
      .finally(() => {
        prefetch(videoToLoad.url);
      });
    setNextVideo(videoToLoad);
  }, [state.nameNumber]);

  useEffect(() => {
    if (currentVideo && currentVideo.url === nextVideo.url) {
      playerRef.current?.play();
      playerRef.current?.seekTo(0);
      playerRef.current?.play();
      setNextVideo(undefined);
      setNextVideoDuration(undefined);
    }
  }, [currentVideo]);

  useEffect(() => {
    if (nextVideo) {
      getVideoMetadata(nextVideo.url).then(({ durationInSeconds }) => {
        const duration = Math.round(durationInSeconds * 30) + 20;
        if (!currentVideo) {
          setCurrentVideo(nextVideo);
          setVideoDuration(duration);
        } else {
          setNextVideoDuration(duration);
          playerRef.current.play();
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
      if (
        videoDuration - event.detail.frame <= 250 &&
        !nextVideo &&
        !showQuestion
      ) {
        if (videoList.length === 1) {
          setState({ nameNumber: 1 });
        } else {
          setShowQuestion(true);
        }
      }
      if (videoDuration - 1 <= event.detail.frame) {
        if (nextVideo && nextVideoDuration) {
          setCurrentVideo(nextVideo);
          setVideoDuration(nextVideoDuration);
        } else if (isLastVideoFinished) {
          navigate("/");
        } else if (!videoList.length) {
          setIsLastVideoFinished(true);
          setVideoDuration(3500);
        }
      } else if (
        (videoDuration - 30 === event.detail.frame &&
          !nextVideo &&
          !isLastVideoFinished &&
          videoList.length > 1) ||
        (videoDuration - 5 === event.detail.frame &&
          !nextVideoDuration &&
          nextVideo)
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
    nextVideo,
    nextVideoDuration,
    videoList,
    showQuestion,
  ]);

  useEffect(() => {
    (ispaused || showQuestion) && playerRef.current.exitFullscreen();
  }, [ispaused, showQuestion]);

  return (
    <div id="mainPlayerContainer">
      {ispaused && (
        <div className="background">
          <h1 className="tittle">{currentVideo.title.toUpperCase()}</h1>
          <div className="linetittle" />
          <div className="description">
            <p>{currentVideo.description}</p>
          </div>
          {((nextVideo && nextVideoDuration) ||
            (!nextVideoDuration && !nextVideo && !showQuestion)) && (
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
      {showQuestion && currentQuestion && (
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
                playerRef.current.play();
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
                playerRef.current.play();
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
      {currentVideo && videoDuration ? (
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
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default MainPlayer;
