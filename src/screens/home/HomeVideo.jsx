import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { preloadVideo } from "@remotion/preload";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AbsoluteFill, Video } from "remotion";
import VideosData from "../../data/videos.json";
import { Context } from "../../App";

function HomeVideo() {
  const [texto, setTexto] = useState("");
  const history = useNavigate();
  const state = useContext(Context);
  const InputChange = ({ target }) => {
    setTexto(target.value);
  };
  const [backgroundVideo, setBackgroundVideo] = useState(undefined);

  function assingValue(result) {
    switch (result) {
      case 1:
        return -5;
      case 2:
        return 6;
      case 3:
        return -4;
      case 4:
        return -4.5;
      case 5:
        return 5;
      case 6:
        return -3.5;
      case 7:
        return 4.5;
      case 8:
        return -3;
      case 9:
        return 2;
    }
  }

  const Submit = (e) => {
    e.preventDefault();
    var resultado = calcular(texto);
    state.setState((prevState) => ({
      ...prevState,
      nameNumber: assingValue(resultado),
    }));
    history("/mainPlayer");
  };

  useEffect(() => {
    const selectedVideo =
      VideosData[Math.floor(Math.random() * VideosData.length)];
    const unpreload = preloadVideo(selectedVideo.url);
    setBackgroundVideo(selectedVideo);
    return () => {
      unpreload();
    };
  }, []);

  function calcular(nombre) {
    if (nombre) {
      var diccionario = {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5,
        f: 6,
        g: 7,
        h: 8,
        i: 9,
        j: 1,
        k: 2,
        l: 3,
        m: 4,
        n: 5,
        o: 6,
        p: 7,
        q: 8,
        r: 9,
        s: 1,
        t: 2,
        u: 3,
        v: 4,
        w: 5,
        x: 6,
        y: 7,
        z: 8,
      };

      var nombreTotalNumeros = 0;
      var nombreTmp = 0;

      for (var j = 0; j < nombre.length; j++) {
        if (diccionario[nombre[j].toLowerCase()]) {
          nombreTotalNumeros += diccionario[nombre[j].toLowerCase()];
        }
      }

      while (nombreTotalNumeros > 9) {
        nombreTmp = nombreTotalNumeros;
        nombreTotalNumeros = 0;

        for (j = 0; j < nombreTmp.toString().length; j++) {
          nombreTotalNumeros += parseInt(nombreTmp.toString()[j]);
        }
      }

      var resultado = nombreTotalNumeros;

      return resultado;
    } else {
      alert("Tiene que existir un nombre.");
    }
  }
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {backgroundVideo && (
        <>
          <Video src={backgroundVideo.url} />
          <div id="homecontainer">
            <h1 id="homeTitle">Camino de Abraxas</h1>
            <h3 id="homeSubtitle">Camila Diaz</h3>
            <p id="homeDescription">
              Bienvenidos al camino de Abraxas un video musical, interactivo, en
              donde tienes el control de toda la experiencia. Tú decides la
              trayectoria del viaje ¿Estás listo?
            </p>
            <form onSubmit={Submit}>
              <input
                id="nameinput"
                type="text"
                placeholder="Ingresa tu nombre"
                value={texto}
                onChange={InputChange}
              />
              <button id="enviar" type="submit">
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </form>
          </div>
        </>
      )}
    </AbsoluteFill>
  );
}

export default HomeVideo;
