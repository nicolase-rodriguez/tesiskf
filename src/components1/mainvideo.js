import React from "react";
import { AbsoluteFill, Video } from "remotion";
function Mainvideo() {
    return (
      <AbsoluteFill>
        <Video  src={"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"} />
      </AbsoluteFill>
    );
  }
export default Mainvideo;
