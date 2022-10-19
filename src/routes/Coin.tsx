import React from 'react';
import { useLocation, useParams } from 'react-router';
import styled from 'styled-components';

import { useQuery } from "react-query";

import { CoinDetailInterface } from "../types/common";

import { handleFetchCoin } from '../api';
import BrowserTitle from '../components/BrowserTitle';


interface RouteParams {
    coinId: string;
} 

export default function Coin() {
    const {coinId} = useParams<RouteParams>();
    const location = useLocation();
    const {state} = location;

    console.log("location state", state);
    console.log("params", coinId);

    const { isLoading: coinLoading, data: coinData } = useQuery<CoinDetailInterface>(["coin", coinId], () => handleFetchCoin(coinId), { refetchInterval: 10000 });


    return (
        <Container>
            <BrowserTitle title={coinData?.name} />

        </Container>
    )
}

const Container = styled.div`
    border-radius: 10px;
    max-width: 640px;
    width: 640px;
    padding: 40px 10px;
    box-sizing: border-box;
    box-shadow: black 5px 5px 20px 0px;
    margin: 100px 0;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
`;