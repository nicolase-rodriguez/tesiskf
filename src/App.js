import { Player } from "@remotion/player";
import React from "react";
import Mainvideo from "./components1/mainvideo";

 
 const App = () => {
  return (
    <Player
      component={Mainvideo}
      durationInFrames={120}
      compositionWidth={1920}
      compositionHeight={1080}
      fps={30}
      controls
      style={{maxWidth:"100vw", maxHeight:"100vh"}}
    />
  );
};

export default App