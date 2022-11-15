import { interpolate, useCurrentFrame } from "remotion";
import CreditsData from "../../data/credits.json";

function CreditsVideo() {
  const frame = useCurrentFrame();
  const bottom = interpolate(frame, [0, 3500], [-2000, 860]); 

  return (
    <div id="creditsContainer">
      <div id="creditsTextContainer" style={{ bottom: `${bottom}px` }}>
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
