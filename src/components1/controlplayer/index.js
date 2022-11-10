import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faPause, faPlay, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import "./controlplayer.css"
import { PlayerEmitter } from "@remotion/player/dist/event-emitter";


function Controls(props) {
   
    console.log(props.playerRef)
    return (
        <div class="controls">
         <button onClick={() => props.playerRef.current.play()}>
        <FontAwesomeIcon icon={faPlay} />
        </button> 
         <button onClick={() => props.playerRef.current.pause()}>
        <FontAwesomeIcon icon={faPause} />
        </button> 
        <div class="time"> </div>
        <button onClick={() => props.playerRef.current.requestFullscreen()}>
        <FontAwesomeIcon icon={faExpand} />
        </button>
        </div>
        
    )
}

export default Controls
