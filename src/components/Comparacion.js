import React from 'react';
import styled from '@emotion/styled';

const ResultadoDiv = styled.div`
    margin-top: 1rem;
    padding: 1.5rem;
    background-color: #113a61;
    color: #FFF;
    border-radius: 1rem;
    font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
    font-size: 18px;
    span {
        font-weight:bold;
    }
`;
const Precio = styled.p`
    text-align: center;
    font-size: 30px;
    span {
        font-weight:bold;
    }
`

const Comparacion = ({resultado}) => {
    if(Object.keys(resultado).length === 0) return null;
    console.log(resultado);
    return ( 
        <ResultadoDiv>
            <Precio>The price is: <span>{resultado.PRICE}</span></Precio>
            <Info>The highest value of the day: <span>{resultado.HIGHDAY}</span></Info>
            <Info>The lowest value of the day: <span>{resultado.LOWDAY}</span></Info>
            <Info>Variation in the last 24 hours: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
            <Info>Last Update: <span>{resultado.LASTUPDATE}</span></Info>
        </ResultadoDiv>
     );
}
 
export default Comparacion;