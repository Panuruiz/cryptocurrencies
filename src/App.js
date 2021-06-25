import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import imagen from './cryptomonedas.png';
import Formulario from "./components/Formulario";
import Comparacion from "./components/Comparacion";
import Spinner from "./components/Spinner";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
  @media (max-width: 900px) {
    max-width: 25%;
    margin-top: 2.5rem;
  }
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
  }
`;


function App() {

  const [moneda, guardarMoneda] = useState('');
  const [cryptomoneda, guardarCryptomoneda] = useState('');
  const [ resultado, guardarResultado ] = useState({});
  const [ cargando, guardarCargando ] = useState(false);

  useEffect(() => {

    if (moneda === '' || cryptomoneda === '') {
      return;
    }

    const compararCryptomoneda = async () => {

      // Consultar la API
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptomoneda}&tsyms=${moneda}`;

      // Obtener la información de la API
      const resultado = await axios.get(url);

      // Mostrar el Spinner
      guardarCargando(true);

      // Ocultar el Spinner
      setTimeout(() => {

        // Cambiar el estado de cargando
        guardarCargando(false);

        // Guardar comparación
        guardarResultado(resultado.data.DISPLAY[cryptomoneda][moneda]);
      }, 1500);

    }
    compararCryptomoneda();

  }, [moneda, cryptomoneda]);

  // Mostrar Spinner o resultado
  const componente = (cargando) ? <Spinner /> : <Comparacion resultado={resultado} /> ;

  return (
    <Contenedor>
      <div>
        <Imagen 
          src={imagen}
          alt="crypto image"
        />
      </div>
      <div>
        <Heading>Instant calculation of cryptocurrencies</Heading>
        <Formulario 
          guardarMoneda={guardarMoneda}
          guardarCryptomoneda={guardarCryptomoneda}
          guardarCargando={guardarCargando}
        />
        {componente}
      </div>
    </Contenedor>
    );
}

export default App;
