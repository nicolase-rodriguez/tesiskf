import { useContext } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Context } from "../../App";
import CreditsData from "../../data/credits.json";

function CreditsVideo() {
  const frame = useCurrentFrame();
  const bottom = interpolate(frame, [0, 4000], [-4400, 860]);
  const { state } = useContext(Context);

  return (
    <div id="creditsContainer">
      <div
        id="creditsTextContainer"
        style={{ bottom: bottom > -4150 ? `${bottom}px` : -4150 }}
      >
        <p id="thankYouText">
          Según tus desicion tienes más interés en conocer tu arquetipo{" "}
          {state.nameNumber > 0 ? "sombra" : "persona"}
        </p>
        {CreditsData.map((credit) => (
          <>
            <h3 style={{ marginTop: "2vw", marginBottom: ".7vw" }}>
              {credit.title}
            </h3>
            {credit.workers.map((worker) => (
              <p>{worker}</p>
            ))}
          </>
        ))}
        <p id="thankYouText">Gracias.</p>
      </div>
    </div>
  );
}

export default CreditsVideo;
