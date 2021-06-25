import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCryptomoneda from '../hooks/useCryptomoneda';
import axios from 'axios';
import Error from './Error';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`;

const Formulario = ({guardarMoneda, guardarCryptomoneda, guardarCargando}) => {

    // State del listado de cryptomonedas
    const [ listacrypto, guardarCryptomonedas ] = useState([]);
    // State de validación
    const [ error, guardarError ] = useState(false);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'United States Dollar' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'MXN', nombre: 'Mexican Peso' },
        { codigo: 'GBP', nombre: 'Pound Sterling' }
    ]

    // Utilizar useMoneda
    const [ moneda, SelectMonedas ] = useMoneda('Choose a currency', '', MONEDAS);
    

    // Utilizar useCryptomoneda
    const [cryptomoneda, SelectCrypto] = useCryptomoneda('Choose a Cryptocurrency', '', listacrypto)

    // Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarCryptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    // Cuando el usuario hace submit
    const compararMoneda = e => {
        e.preventDefault();

        // Validar si ambos campos están llenos
        if(moneda.trim() === '' || cryptomoneda.trim() === '') {
            guardarError(true);
            return;
        }
        // Pasar los datos al componente principal
        guardarError(false); 
        guardarCargando(true);
        guardarMoneda(moneda);
        guardarCryptomoneda(cryptomoneda);
    }

    return ( 
        <form
            onSubmit={compararMoneda}
        >
            {error ? <Error mensaje="All fields are required" /> : null}

            <SelectMonedas />

            <SelectCrypto />

            <Boton 
                type="submit"
                value="Calculate"
            />
        </form>
     );
}
 
export default Formulario;