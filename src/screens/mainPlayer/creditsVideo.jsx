import { useCurrentFrame } from "remotion";

function CreditsVideo() {
  const frame = useCurrentFrame();
  return (
    <div id="creditsContainer">
      <p id="creditsTextContainer" style={{ bottom: frame }}>
        Camila diaz <br /> Melissa Mojica <br />
        Julian Silva <br />
        David Rocha
        <br /> Brageanth Palencia
        <br />
        Nicolas Rodriguez
        <br /> Sebastian Miranda
        <br /> Julian Rique
        <br /> Haide Espitia
        <br /> Nohora Mojica
        <br /> Rito diaz
        <br /> Juan Jose
        <br />
        <h1 id="thankYouText">Gracias.</h1>
      </p>
    </div>
  );
}

export default CreditsVideo;
