import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import './home.css';
function Home() {
  const [texto, setTexto] = useState('');
  const history = useNavigate();

  const InputChange = ({ target }) => {
    setTexto(target.value);
  };

  const Submit = (e) => {
    e.preventDefault();
    var resultado = calcular(texto);
    console.log(resultado);
    history('/mainPlayer');
  };

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
        z: 8
      };

      var nombreNumeros = '';
      var nombreTotalNumeros = 0;
      var nombreTmp = 0;
      var error = '';

      for (var j = 0; j < nombre.length; j++) {
        if (diccionario[nombre[j].toLowerCase()]) {
          nombreNumeros += ' ' + diccionario[nombre[j].toLowerCase()].toString();
          nombreTotalNumeros += diccionario[nombre[j].toLowerCase()];
        } else {
          error = 'El nombre no compatible.';
        }
      }

      while (nombreTotalNumeros > 9) {
        nombreTmp = nombreTotalNumeros;
        nombreTotalNumeros = 0;

        for (j = 0; j < nombreTmp.toString().length; j++) {
          nombreTotalNumeros += parseInt(nombreTmp.toString()[j]);
        }
      }

      var resultado =
        error +
        'Tu nombre ' +
        nombre +
        ' digitalmente es: ' +
        nombreNumeros +
        ' y es equivalente a: ' +
        nombreTotalNumeros;

      return resultado;
    } else {
      alert('Tiene que existir un nombre.');
    }
  }

  return (
    <form onSubmit={Submit}>
      <div id="homecontainer">
        <input
          id="nameinput"
          type="text"
          placeholder="Ingresa tu nombre"
          value={texto}
          onChange={InputChange}
        />
        <button id="enviar" type="submit">
          Enviar
        </button>
      </div>
    </form>
  );
}

export default Home;
