import React from "react";
import { AbsoluteFill, Video } from "remotion";

function Mainvideo({currentVideo}) {
  return (
    <AbsoluteFill>
      <Video src={currentVideo.url} />
    </AbsoluteFill>
  );
}
export default Mainvideo;
