import React from 'react'
import styled from 'styled-components'
import BrowserTitle from '../components/BrowserTitle'


export default function CoinsList() {
    return (
        <Container>
            <BrowserTitle title="Coin Tracker"/>
            <Title>Coin Tracker</Title>
        </Container>
    )
}

const Container = styled.div`
    border-radius: 10px;
    max-width: 480px;
    width: 480px;
    padding: 40px 10px;
    box-sizing: border-box;
    box-shadow: black 5px 5px 20px 0px;
    margin: 100px 0;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
`;

const Title = styled.h1`
    text-transform: uppercase;
    text-align: center;
    font-size: 30px;
    margin-bottom: 30px;
`;