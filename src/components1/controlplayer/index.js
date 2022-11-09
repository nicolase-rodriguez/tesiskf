import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faPlay, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import "./controlplayer.css"


function Controls() {
    return (
        <div class="controls">
        <FontAwesomeIcon icon={faPlay} />
        <FontAwesomeIcon icon={faVolumeUp} />
        <div class="time"> </div>
        <FontAwesomeIcon icon={faExpand} />
        </div>
        
    )
}

export default Controls
