import React, { useState } from 'react';
import { AbsoluteFill, Video } from 'remotion';
import videoData from '../data/videos.json';
function Mainvideo() {
  const [currentPosition, setCurrentPosition] = useState(0);
  return (
    <AbsoluteFill>
      <Video
        src={videoData.find(video=>video.position===currentPosition).url}
      />
    </AbsoluteFill>
  );
}
export default Mainvideo;
