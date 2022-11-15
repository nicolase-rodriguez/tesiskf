import React from "react";
import { AbsoluteFill, Video } from "remotion";
import CreditsVideo from "./creditsVideo";

function Mainvideo({ currentVideo, isLastVideoFinished }) {
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLastVideoFinished ? (
        <CreditsVideo />
      ) : (
        <Video
          src={currentVideo.url}
          style={{ boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)", flex: 1 }}
        />
      )}
    </AbsoluteFill>
  );
}
export default Mainvideo;
